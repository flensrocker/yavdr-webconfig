import { RequestHandler, Response } from 'express';
import { Container } from 'typedi';

import { AuthConfig, AuthConfigToken } from './auth-config';

export type RouteMethod = 'get' | 'post';

export interface RouteResponse<T> {
    status?: number;
    cookieName?: string;
    cookie?: any;
    response: T;
}

export abstract class RouteHandler<T> {
    abstract getHandler(): RequestHandler;

    protected sendResponse(ret: RouteResponse<T>, res: Response): void {
        const authConfig: AuthConfig = Container.get<AuthConfig>(AuthConfigToken);
        if (ret.status) {
            res.status(ret.status);
        }
        if (ret.cookieName) {
            if (ret.cookie) {
                res.cookie(ret.cookieName, ret.cookie, { httpOnly: true, signed: true, maxAge: authConfig.maxAgeSec * 1000 });
            } else {
                res.clearCookie(ret.cookieName);
            }
        }
        if (ret.response) {
            res.json(ret.response);
        } else {
            throw new Error('No Response');
        }
    }

    protected sendError(err: any, res: Response): void {
        res.status(500)
            .json({ msg: 'Error: ' + (err.message ? err.message : '(one of the unexpected kind...)') });
    }
}

export class Route<T> {
    constructor(
        public readonly method: RouteMethod,
        public readonly path: string,
        public readonly handler: RouteHandler<T>,
        public readonly needsAuthentication: boolean,
    ) {
    }
}
