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

export class LoginTokenResponse {
    msg: string;
    token?: string;
}

export class LogoutResponse {
    msg: string;
}

export interface TokenPayload {
    username: string;
    groups: string[];
}

export class ValidateResponse {
    msg: string;
    username?: string;
    groups?: string[];
}
