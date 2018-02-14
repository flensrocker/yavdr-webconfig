export enum AuthState {
    NotValidated,
    LoggedIn,
    LoggedOut,
}

export class LoginRequest {
    constructor(
        public username: string,
        public password: string,
    ) {
    }
}

export class LoginResponse {
    msg: string;
    groups?: string[];
}

export class ValidateResponse {
    msg: string;
    username?: string;
    groups?: string[];
}
