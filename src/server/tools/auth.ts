import * as crypto from 'crypto';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import config from '../config';
import { IncomingHttpHeaders, Route, RouteDelegate, RouteResponse } from './route';

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

interface TokenPayload {
    username: string;
    groups: string[];
}

const createToken = (user: User): string => {
    const payload: TokenPayload = {
        username: user.username,
        groups: user.groups,
    };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '60m' });
};

const getTokenPayload = (token: string): TokenPayload | null => {
    try {
        if (token) {
            return jwt.verify(token, config.jwtSecret) as TokenPayload;
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

const getUsername = (headers: IncomingHttpHeaders, cookies: any): string | null => {
    const username: string = getUsernameFromHeaders(headers);
    if (username) {
        return username;
    }

    if (cookies.auth) {
        return cookies.auth.username;
    }

    return null;
};

const logoutUser = (username: string): void => {
    const user: User = findUser(username);
    if (user) {
        user.isLoggedIn = false;
    }
};

class Auth {
    authenticate(request: express.Request, response: express.Response, next: express.NextFunction): void {
        const username = getUsername(request.headers, request.cookies);
        const user: User = findUser(username);
        if (user && user.isLoggedIn) {
            next();
        } else {
            response.status(401)
                .json({ msg: 'Access denied' });
        }
    }

    validate(request: any, headers: IncomingHttpHeaders, cookies: any): RouteResponse {
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
    }

    login(request: any): RouteResponse {
        const user: User = authenticateUser(request.username, request.password);
        if (user) {
            return {
                cookieName: 'auth',
                cookie: {
                    username: user.username,
                },
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
    }

    token(request: any): RouteResponse {
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
    }

    logout(request: any, headers: IncomingHttpHeaders, cookies: any): RouteResponse {
        const username = getUsername(headers, cookies);
        logoutUser(username);
        return {
            cookieName: 'auth',
            response: {
                msg: 'Logout successfull',
            }
        };
    }
}

export default new Auth();
