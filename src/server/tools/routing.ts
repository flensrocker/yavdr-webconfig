import * as express from 'express';
import { Router } from 'express';

import { Route } from './route';
import { AuthTools } from './auth-tools';

export namespace Routing {
    export const setupRoutes = (routes: Route<any>[]): Router => {
        const router: Router = express.Router();
        routes.forEach((r) => {
            const handlers = (r.needsAuthentication ? [AuthTools.authHandler] : []);
            handlers.push(r.handler.getHandler());
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
