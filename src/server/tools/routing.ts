import * as express from 'express';
import { NextFunction, Request, RequestHandler, Response, Router } from 'express';

import { Config } from '../config';

import { Route, AsyncRouteHandler, SyncRouteHandler, RouteHandler, RouteResponse } from './route';
import { Auth } from './auth';

const handleResponse = (ret: any, res: Response) => {
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

const wrapHandler = <T>(handler: RouteHandler<T>): RequestHandler => {
    if (handler instanceof AsyncRouteHandler) {
        return (req: Request, res: Response) => {
            handler.handle(req.body, req.headers, req.signedCookies)
                .then((ret: any) => handleResponse(ret, res))
                .catch((err) =>
                    res.status(500)
                        .json({ msg: 'Error: ' + (err.message ? err.message : '') })
                );
        };
    }

    if (handler instanceof SyncRouteHandler) {
        return (req: Request, res: Response) => {
            try {
                const ret = handler.handle(req.body, req.headers, req.signedCookies);
                handleResponse(ret, res);
            } catch (err) {
                res.status(500)
                    .json({ msg: 'Error: ' + (err.message ? err.message : '') });
            }
        };
    }

    return (req: Request, res: Response, next: NextFunction) => {
        console.error('unknown subclass of RouteHandler');
        next();
    };
};

export namespace Routing {
    export const setupRoutes = <T>(routes: Route<T>[]): Router => {
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
