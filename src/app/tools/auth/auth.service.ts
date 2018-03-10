import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as jwt_decode from 'jwt-decode';

import {
    LoginResponse,
    LoginRequest,
    LoginTokenResponse,
    LogoutResponse,
    TokenPayload,
    ValidateResponse,
} from '../../../api';

export {
    LoginResponse,
    LoginRequest,
    LoginTokenResponse,
    LogoutResponse,
    TokenPayload,
    ValidateResponse,
};

export enum AuthState {
    NotValidated,
    LoggedIn,
    LoggedOut,
}

@Injectable()
export class AuthService {
    private _authenticated: BehaviorSubject<AuthState> = new BehaviorSubject<AuthState>(AuthState.NotValidated);
    private _username = '';
    private _groups: string[] = [];

    public get authenticated(): Observable<AuthState> {
        return this._authenticated.asObservable();
    }

    public get username(): string {
        return this._username;
    }

    public get groups(): string[] {
        return this._groups;
    }

    constructor(private _http: HttpClient) {
    }

    private setLoggedIn(username: string, groups: string[]): void {
        this._username = username;
        this._groups = groups;
        this._authenticated.next(AuthState.LoggedIn);
    }

    private setLoggedOut(): void {
        this._username = '';
        this._groups = [];
        this._authenticated.next(AuthState.LoggedOut);
    }

    public validate(): void {
        this._http.get<ValidateResponse>('/api/login')
            .subscribe((response: ValidateResponse) => {
                this.setLoggedIn(response.username, response.groups);
            }, (err: any) => {
                this.setLoggedOut();
            });
    }

    public login(request: LoginRequest): Observable<LoginResponse> {
        const loginSubject: Subject<LoginResponse> = new Subject<LoginResponse>();
        this._http.post<LoginResponse>('/api/login', request)
            .subscribe((response: LoginResponse) => {
                this.setLoggedIn(request.username, response.groups);
                loginSubject.next(response);
            }, (err: any) => {
                this.setLoggedOut();
                loginSubject.error(err);
            }, () => {
                loginSubject.complete();
            });
        return loginSubject.asObservable();
    }

    public loginToken(request: LoginRequest): Observable<LoginTokenResponse> {
        const loginSubject: Subject<LoginTokenResponse> = new Subject<LoginTokenResponse>();
        this._http.post<LoginTokenResponse>('/api/login/token', request)
            .subscribe((response: LoginTokenResponse) => {
                const tokenPayload: TokenPayload = jwt_decode(response.token);
                this.setLoggedIn(request.username, tokenPayload.groups);
                loginSubject.next(response);
            }, (err: any) => {
                this.setLoggedOut();
                loginSubject.error(err);
            }, () => {
                loginSubject.complete();
            });
        return loginSubject.asObservable();
    }

    public logout(): Observable<true> {
        const logoutSubject: Subject<true> = new Subject<true>();
        this.setLoggedOut();
        this._http.post<LogoutResponse>('/api/logout', {}).subscribe(() => {
            logoutSubject.next(true);
        }, (err: any) => {
            logoutSubject.error(err);
        }, () => {
            logoutSubject.complete();
        });
        return logoutSubject.asObservable();
    }
}
