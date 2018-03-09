import { IncomingHttpHeaders } from 'http';
export { IncomingHttpHeaders };

export interface RouteResponse<T> {
    status?: number;
    cookieName?: string;
    cookie?: any;
    response: T;
}

export type RouteDelegateAsync<T> = (body: any, headers: IncomingHttpHeaders, cookies: any) => Promise<RouteResponse<T>>;
export type RouteDelegateSync<T> = (body: any, headers: IncomingHttpHeaders, cookies: any) => RouteResponse<T>;

export interface RouteHandler<T> {
    handle: RouteDelegateAsync<T> | RouteDelegateSync<T>;
}

export class AsyncRouteHandler<T> implements RouteHandler<T> {
    constructor(private _delegate: RouteDelegateAsync<T>) {
    }

    handle(body: any, headers: IncomingHttpHeaders, cookies: any): Promise<RouteResponse<T>> {
        return this._delegate(body, headers, cookies);
    }
}

export class SyncRouteHandler<T> implements RouteHandler<T> {
    constructor(private _delegate: RouteDelegateSync<T>) {
    }

    handle(body: any, headers: IncomingHttpHeaders, cookies: any): RouteResponse<T> {
        return this._delegate(body, headers, cookies);
    }
}

export type RouteDelegate<T> = RouteDelegateSync<T> | RouteDelegateAsync<T>;

export type RouteMethod = 'get' | 'post';

export class Route<T> {
    constructor(
        public readonly method: RouteMethod,
        public readonly path: string,
        public readonly handler: RouteHandler<T>,
        public readonly needsAuthentication: boolean,
    ) {
    }
}
