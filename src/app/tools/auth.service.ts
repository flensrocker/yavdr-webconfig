import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoginResponse, LoginRequest, ValidateResponse } from '../../api';

export { LoginResponse, LoginRequest, ValidateResponse };
export enum AuthState {
    NotValidated,
    LoggedIn,
    LoggedOut,
}

export abstract class AuthService {
    private _authenticated: BehaviorSubject<AuthState> = new BehaviorSubject<AuthState>(AuthState.NotValidated);
    private _username = '';
    private _groups: string[] = [];

    abstract validate(): void;
    abstract login(request: LoginRequest): Observable<LoginResponse>;
    abstract logout(): Observable<true>;

    public get authenticated(): Observable<AuthState> {
        return this._authenticated.asObservable();
    }

    public get username(): string {
        return this._username;
    }

    public get groups(): string[] {
        return this._groups;
    }

    protected setLoggedIn(username: string, groups: string[]): void {
        this._username = username;
        this._groups = groups;
        this._authenticated.next(AuthState.LoggedIn);
    }

    protected setLoggedOut(): void {
        this._username = '';
        this._groups = [];
        this._authenticated.next(AuthState.LoggedOut);
    }
}
