import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import * as jwt_decode from 'jwt-decode';

import {
  AuthService,
  LoginRequest,
  LoginResponse,
  LoginTokenResponse,
  LogoutResponse,
  TokenPayload,
  ValidateResponse,
} from './auth.service';

@Injectable()
export class AuthServiceHttp extends AuthService {
  constructor(private _http: HttpClient) {
    super();
  }

  validate(): void {
    this._http.get<ValidateResponse>('/api/login')
      .subscribe((response: ValidateResponse) => {
        this.setLoggedIn(response.username, response.groups);
      }, (err: any) => {
        this.setLoggedOut();
      });
  }

  login(request: LoginRequest): Observable<LoginResponse> {
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

  loginToken(request: LoginRequest): Observable<LoginTokenResponse> {
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

  logout(): Observable<true> {
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
