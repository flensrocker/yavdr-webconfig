import { IncomingHttpHeaders } from 'http';
import { Request, RequestHandler, Response } from 'express';

import {
    Route,
    RouteMethod,
    RouteHandler,
    RouteResponse,
} from './route';

export type AsyncRouteDelegate<T> = (body: any, headers: IncomingHttpHeaders, cookies: any) => Promise<RouteResponse<T>>;

export class AsyncRouteHandler<T> extends RouteHandler<T> {
    constructor(private _delegate: AsyncRouteDelegate<T>) {
        super();
    }

    getHandler(): RequestHandler {
        return (req: Request, res: Response) => {
            this._delegate(req.body, req.headers, req.signedCookies)
                .then((ret: any) => this.sendResponse(ret, res))
                .catch((err) => this.sendError(err, res));
        };
    }
}

export class AsyncRoute<T> extends Route<T> {
    constructor(
        method: RouteMethod,
        path: string,
        delegate: AsyncRouteDelegate<T>,
        needsAuthentication: boolean,
    ) {
        super(method, path, new AsyncRouteHandler<T>(delegate), needsAuthentication);
    }
}
