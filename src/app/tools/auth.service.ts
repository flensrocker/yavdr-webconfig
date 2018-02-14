import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { LoginResponse, LoginRequest, ValidateResponse, AuthState } from "./auth.servicedata";

export abstract class AuthService {
    abstract validate(): void;
    abstract login(request: LoginRequest): Observable<LoginResponse>;
    abstract logout(): Observable<true>;

    private _authenticated: BehaviorSubject<AuthState> = new BehaviorSubject<AuthState>(AuthState.NotValidated);
    private _username: string = '';
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
