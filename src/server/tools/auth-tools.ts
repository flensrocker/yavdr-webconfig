import { IncomingHttpHeaders } from 'http';
import { Request, RequestHandler, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Container } from 'typedi';

import { TokenPayload } from '../../api';

import { AuthConfig, AuthConfigToken } from './auth-config';
import { BaseUser, UserManager, UserManagerToken } from './users';

export namespace AuthTools {
    export const createToken =
        async (user: BaseUser): Promise<string> => {
            const authConfig: AuthConfig = Container.get<AuthConfig>(AuthConfigToken);
            return new Promise<string>((resolve, reject) => {
                const payload: TokenPayload = {
                    username: user.username,
                    groups: user.groups,
                };
                jwt.sign(payload, authConfig.secret, { expiresIn: authConfig.maxAgeSec }, (err, token) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token as string);
                    }
                });
            });
        };

    export const getTokenPayload =
        async (token: string): Promise<TokenPayload | null> => {
            const authConfig: AuthConfig = Container.get<AuthConfig>(AuthConfigToken);
            return new Promise<TokenPayload | null>((resolve, reject) => {
                if (token) {
                    jwt.verify(token, authConfig.secret, (err, payload) => {
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

    export const getTokenFromHeaders =
        (headers: IncomingHttpHeaders): string | null => {
            if (headers && headers.authorization && (typeof headers.authorization === 'string')) {
                const parts: string[] = (headers.authorization as string).split(' ');
                if ((parts.length === 2) && (parts[0] === 'Bearer')) {
                    return parts[1];
                }
            }

            return null;
        };

    export const getTokenFromCookie =
        (cookies: any): string | null => {
            const authConfig: AuthConfig = Container.get<AuthConfig>(AuthConfigToken);
            if (cookies[authConfig.cookieName] && (typeof cookies[authConfig.cookieName] === 'string')) {
                const token: string = cookies[authConfig.cookieName];
                if (token) {
                    return token;
                }
            }

            return null;
        };

    export const getUsernameFromRequest =
        async (headers: IncomingHttpHeaders, cookies: any): Promise<string | null> => {
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

    export const authHandler: RequestHandler =
        async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            const userManager: UserManager = Container.get<UserManager>(UserManagerToken);
            const username = await getUsernameFromRequest(request.headers, request.signedCookies);
            const user: BaseUser = userManager.findUser(username);
            if (user) {
                next();
            } else {
                response.status(401)
                    .json({ msg: 'Access denied' });
            }
        };
}
