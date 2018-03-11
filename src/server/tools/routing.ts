import * as express from 'express';
import { NextFunction, Request, RequestHandler, Response, Router } from 'express';

import { Config } from '../config';

import { Route, AsyncRouteHandler, SyncRouteHandler, RouteHandler, RouteResponse } from './route';
import { Auth } from './auth';

const sendResponse = (ret: any, res: Response) => {
    if (ret.status) {
        res.status(ret.status);
    }
    if (ret.cookieName) {
        if (ret.cookie) {
            res.cookie(ret.cookieName, ret.cookie, { httpOnly: true, signed: true, maxAge: Config.authMaxAgeSec * 1000 });
        } else {
            res.clearCookie(ret.cookieName);
        }
    }
    if (ret.response) {
        res.json(ret.response);
    } else {
        throw new Error('No Response');
    }
};

const sendError = (err: any, res: Response) => {
    res.status(500)
        .json({ msg: 'Error: ' + (err.message ? err.message : '(one of the unexpected kind...)') });
};

const wrapHandler = <T>(handler: RouteHandler<T>): RequestHandler => {
    if (handler instanceof AsyncRouteHandler) {
        return (req: Request, res: Response) => {
            handler.handle(req.body, req.headers, req.signedCookies)
                .then((ret: any) => sendResponse(ret, res))
                .catch((err) => sendError(err, res));
        };
    }

    if (handler instanceof SyncRouteHandler) {
        return (req: Request, res: Response) => {
            try {
                const ret = handler.handle(req.body, req.headers, req.signedCookies);
                sendResponse(ret, res);
            } catch (err) {
                sendError(err, res);
            }
        };
    }

    throw new Error('unknown subclass of RouteHandler');
};

export namespace Routing {
    export const setupRoutes = (routes: Route<any>[]): Router => {
        const router: Router = express.Router();
        routes.forEach((r) => {
            const handlers = (r.needsAuthentication ? [Auth.authenticate] : []);
            handlers.push(wrapHandler(r.handler));
            switch (r.method) {
                case 'get': {
                    router.get(r.path, handlers);
                    break;
                }
                case 'post': {
                    router.post(r.path, handlers);
                    break;
                }
                default: {
                    console.error('unknown router method "' + r.method + '" on path "' + r.path + '"');
                    break;
                }
            }
        });
        return router;
    };
}
