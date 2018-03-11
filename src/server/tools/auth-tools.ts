import { IncomingHttpHeaders } from 'http';
import { Request, RequestHandler, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { TokenPayload } from '../../api';

import { Config } from '../config';
import { User, Users } from './users';

export namespace AuthTools {
    export const createToken =
        async (user: User): Promise<string> => {
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

    export const getTokenPayload =
        async (token: string): Promise<TokenPayload | null> => {
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
            if (cookies[Config.authCookieName] && (typeof cookies[Config.authCookieName] === 'string')) {
                const token: string = cookies[Config.authCookieName];
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
            const username = await getUsernameFromRequest(request.headers, request.signedCookies);
            const user: User = Users.findUser(username);
            if (user) {
                next();
            } else {
                response.status(401)
                    .json({ msg: 'Access denied' });
            }
        };
}
