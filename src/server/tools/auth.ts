import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { LoginResponse, LoginTokenResponse, LogoutResponse, TokenPayload, ValidateResponse } from '../../api';

import { Config } from '../config';
import { IncomingHttpHeaders, Route, RouteDelegate, RouteResponse } from './route';
import { User, Users } from './users';

export { LoginResponse, LoginTokenResponse, LogoutResponse, ValidateResponse };

const createToken = async (user: User): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const payload: TokenPayload = {
            username: user.username,
            groups: user.groups,
        };
        jwt.sign(payload, Config.authSecret, { expiresIn: Config.authMaxAgeSec }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token as string);
            }
        });
    });
};

const getTokenPayload = async (token: string): Promise<TokenPayload | null> => {
    return new Promise<TokenPayload | null>((resolve, reject) => {
        if (token) {
            jwt.verify(token, Config.authSecret, (err, payload) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(payload as TokenPayload);
                }
            });
        } else {
            resolve(null);
        }
    });
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

const getTokenFromCookie = (cookies: any): string | null => {
    if (cookies[Config.authCookieName] && (typeof cookies[Config.authCookieName] === 'string')) {
        const token: string = cookies[Config.authCookieName];
        if (token) {
            return token;
        }
    }

    return null;
};

const getUsername = async (headers: IncomingHttpHeaders, cookies: any): Promise<string | null> => {
    let token: string = getTokenFromHeaders(headers);
    if (!token) {
        token = getTokenFromCookie(cookies);
    }

    if (token) {
        const payload: TokenPayload = await getTokenPayload(token);
        if (payload) {
            return payload.username;
        }
    }

    return null;
};

export namespace Auth {
    export const authenticate = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const username = await getUsername(request.headers, request.signedCookies);
        const user: User = Users.findUser(username);
        if (user) {
            next();
        } else {
            response.status(401)
                .json({ msg: 'Access denied' });
        }
    };

    export const validate = async (request: any, headers: IncomingHttpHeaders, cookies: any): Promise<RouteResponse<ValidateResponse>> => {
        const username = await getUsername(headers, cookies);
        const user: User = Users.findUser(username);
        if (user) {
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

    export const login = async (request: any): Promise<RouteResponse<LoginResponse>> => {
        const user: User = Users.authenticateUser(request.username, request.password);
        if (user) {
            return {
                cookieName: Config.authCookieName,
                cookie: await createToken(user),
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

    export const token = async (request: any): Promise<RouteResponse<LoginTokenResponse>> => {
        const user: User = Users.authenticateUser(request.username, request.password);
        if (user) {
            return {
                response: {
                    msg: 'Login successfull',
                    token: await createToken(user),
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
        return {
            cookieName: Config.authCookieName,
            response: {
                msg: 'Logout successfull',
            }
        };
    };
}
