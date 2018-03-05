import * as express from 'express';
import { Router } from 'express-serve-static-core';

import { IncomingHttpHeaders, Route, RouteDelegate, RouteResponse } from './route';
import auth from './auth';

const createHandler = (logicFunc: RouteDelegate): express.RequestHandler => {
    return (req: express.Request, res: express.Response) => {
        try {
            const ret = logicFunc(req.body, req.headers, req.signedCookies);
            if (ret.status) {
                res.status(ret.status);
            }
            if (ret.cookieName) {
                if (ret.cookie) {
                    res.cookie(ret.cookieName, ret.cookie);
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

class Routing {
    setupRoutes(routes: Route[]): Router {
        const router: Router = express.Router();
        routes.forEach((r) => {
            console.log('add route ' + r.method + ' ' + r.path + (r.needsAuthentication ? ' with authentication' : ''));
            const handlers = (r.needsAuthentication ? [auth.authenticate] : []);
            handlers.push(createHandler(r.logic));
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
    }
}

export const routing = new Routing();
