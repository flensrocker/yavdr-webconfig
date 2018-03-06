import * as express from 'express';
import { Request, RequestHandler, Response, Router } from 'express';

import { Config } from '../config';

import { Route, RouteDelegate, RouteResponse } from './route';
import { Auth } from './auth';

const createHandler = (delegate: RouteDelegate): RequestHandler => {
    return (req: Request, res: Response) => {
        try {
            const ret = delegate(req.body, req.headers, req.signedCookies);
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
        } catch (err) {
            res.status(500)
                .json({ msg: 'Error: ' + (err.message ? err.message : '') });
        }
    };
};

export namespace Routing {
    export const setupRoutes = (routes: Route[]): Router => {
        const router: Router = express.Router();
        routes.forEach((r) => {
            const handlers = (r.needsAuthentication ? [Auth.authenticate] : []);
            handlers.push(createHandler(r.delegate));
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
