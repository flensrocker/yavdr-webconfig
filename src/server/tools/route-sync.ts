import {
    IncomingHttpHeaders,
    Request,
    RequestHandler,
    Response,
    Route,
    RouteMethod,
    RouteHandler,
    RouteResponse,
} from './route';

export {
    IncomingHttpHeaders,
    Request,
    RequestHandler,
    Response,
    Route,
    RouteMethod,
    RouteHandler,
    RouteResponse,
};

export type SyncRouteDelegate<T> = (body: any, headers: IncomingHttpHeaders, cookies: any) => RouteResponse<T>;

export class SyncRouteHandler<T> extends RouteHandler<T> {
    constructor(private _delegate: SyncRouteDelegate<T>) {
        super();
    }

    getHandler(): RequestHandler {
        return (req: Request, res: Response) => {
            try {
                const ret = this._delegate(req.body, req.headers, req.signedCookies);
                this.sendResponse(ret, res);
            } catch (err) {
                this.sendError(err, res);
            }
        };
    }
}

export class SyncRoute<T> extends Route<T> {
    constructor(
        method: RouteMethod,
        path: string,
        delegate: SyncRouteDelegate<T>,
        needsAuthentication: boolean,
    ) {
        super(method, path, new SyncRouteHandler<T>(delegate), needsAuthentication);
    }
}
