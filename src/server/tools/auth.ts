import * as crypto from 'crypto';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { LoginResponse, LoginTokenResponse, LogoutResponse, TokenPayload, ValidateResponse } from '../../api';

import { Config } from '../config';
import { IncomingHttpHeaders, Route, RouteDelegate, RouteResponse } from './route';

export { LoginResponse, LoginTokenResponse, LogoutResponse, ValidateResponse };

const hashPassword = (password: string): string => {
    return crypto.createHash('sha256')
        .update(password)
        .digest('hex');
};

class User {
    private _hashedPassword: string;

    public isLoggedIn = false;

    constructor(
        public username: string,
        password: string,
        public groups: string[]
    ) {
        this._hashedPassword = hashPassword(password);
    }

    checkPassword(password: string): boolean {
        return (this._hashedPassword === hashPassword(password));
    }
}

const users: User[] = [
    new User('a', 'a', ['users', 'adm', 'sudo']),
];

const findUser = (username: string): User => {
    return users.find((u) => u.username === username);
};

const authenticateUser = (username: string, password: string): User | null => {
    const user: User = findUser(username);
    if (user) {
        if (user.checkPassword(password)) {
            user.isLoggedIn = true;
            return user;
        }
        user.isLoggedIn = false;
    }

    return null;
};

const createToken = (user: User): string => {
    const payload: TokenPayload = {
        username: user.username,
        groups: user.groups,
    };
    return jwt.sign(payload, Config.authSecret, { expiresIn: Config.authMaxAgeSec });
};

const getTokenPayload = (token: string): TokenPayload | null => {
    try {
        if (token) {
            return jwt.verify(token, Config.authSecret) as TokenPayload;
        }
    } catch (err) {
    }

    return null;
};

const getTokenFromHeaders = (headers: IncomingHttpHeaders): string | null => {
    if (headers && headers.authorization && (typeof headers.authorization === 'string')) {
        const parts: string[] = (headers.authorization as string).split(' ');
        if ((parts.length === 2) && (parts[0] === 'Bearer')) {
            return parts[1];
        }
    }

    return null;
};

const getUsernameFromHeaders = (headers: IncomingHttpHeaders): string | null => {
    const payload: TokenPayload = getTokenPayload(getTokenFromHeaders(headers));
    if (payload) {
        return payload.username;
    }

    return null;
};

const getUsernameFromCookie = (cookies: any): string | null => {
    if (cookies[Config.authCookieName] && (typeof cookies[Config.authCookieName] === 'string')) {
        const token = cookies[Config.authCookieName] as string;
        if (token) {
            const payload = getTokenPayload(token);
            if (payload) {
                return payload.username;
            }
        }
    }

    return null;
};

const getUsername = (headers: IncomingHttpHeaders, cookies: any): string | null => {
    let username: string = getUsernameFromHeaders(headers);
    if (username) {
        return username;
    }

    username = getUsernameFromCookie(cookies);
    if (username) {
        return username;
    }

    return null;
};

const logoutUser = (username: string): void => {
    const user: User = findUser(username);
    if (user) {
        user.isLoggedIn = false;
    }
};

export namespace Auth {
    export const authenticate = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
        const username = getUsername(request.headers, request.signedCookies);
        const user: User = findUser(username);
        if (user && user.isLoggedIn) {
            next();
        } else {
            response.status(401)
                .json({ msg: 'Access denied' });
        }
    };

    export const validate = (request: any, headers: IncomingHttpHeaders, cookies: any): RouteResponse<ValidateResponse> => {
        const username = getUsername(headers, cookies);
        const user: User = findUser(username);
        if (user && user.isLoggedIn) {
            return {
                response: {
                    msg: 'Validation successfull',
                    username: user.username,
                    groups: user.groups,
                }
            };
        }

        return {
            status: 401,
            response: {
                msg: 'invalid authorization, please log in and try again',
            }
        };
    };

    export const login = (request: any): RouteResponse<LoginResponse> => {
        const user: User = authenticateUser(request.username, request.password);
        if (user) {
            return {
                cookieName: Config.authCookieName,
                cookie: createToken(user),
                response: {
                    msg: 'Login successfull',
                    groups: user.groups,
                },
            };
        }

        return {
            status: 401,
            response: {
                msg: 'invalid username or password',
            }
        };
    };

    export const token = (request: any): RouteResponse<LoginTokenResponse> => {
        const user: User = authenticateUser(request.username, request.password);
        if (user) {
            return {
                response: {
                    msg: 'Login successfull',
                    token: createToken(user),
                }
            };
        }

        return {
            status: 401,
            response: {
                msg: 'invalid username or password',
            }
        };
    };

    export const logout = (request: any, headers: IncomingHttpHeaders, cookies: any): RouteResponse<LogoutResponse> => {
        const username = getUsername(headers, cookies);
        logoutUser(username);
        return {
            cookieName: Config.authCookieName,
            response: {
                msg: 'Logout successfull',
            }
        };
    };
}
