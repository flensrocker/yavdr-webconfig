// content of the decoded JWT
export interface TokenPayload {
    username: string;
    groups: string[];
}

// response to GET /api/login
export class ValidateResponse {
    msg: string;
    username?: string;
    groups?: string[];
}

// POST /api/login
// POST /api/login/token
export class LoginRequest {
    constructor(
        public username: string,
        public password: string,
    ) {
    }
}

// reponse to POST /api/login
export class LoginResponse {
    msg: string;
    groups?: string[];
}

// reponse to POST /api/login/token
export class LoginTokenResponse {
    msg: string;
    token?: string;
}

// response to /api/logout
export class LogoutResponse {
    msg: string;
}
