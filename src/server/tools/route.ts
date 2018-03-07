import { IncomingHttpHeaders } from 'http';
export { IncomingHttpHeaders };

export interface RouteResponse<T> {
    status?: number;
    cookieName?: string;
    cookie?: any;
    response: T;
}

export type RouteDelegate<T> = (body: any, headers: IncomingHttpHeaders, cookies: any) => RouteResponse<T>;

export type RouteMethod = 'get' | 'post';

export class Route<T> {
    constructor(
        public readonly method: RouteMethod,
        public readonly path: string,
        public readonly delegate: RouteDelegate<T>,
        public readonly needsAuthentication: boolean,
    ) {
    }
}
