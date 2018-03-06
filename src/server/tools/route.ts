import { IncomingHttpHeaders } from 'http';
export { IncomingHttpHeaders };

export interface RouteResponse {
    status?: number;
    cookieName?: string;
    cookie?: any;
    response: any;
}

export type RouteDelegate = (body: any, headers: IncomingHttpHeaders, cookies: any) => RouteResponse;

export type RouteMethod = 'get' | 'post';

export class Route {
    constructor(
        public readonly method: RouteMethod,
        public readonly path: string,
        public readonly delegate: RouteDelegate,
        public readonly needsAuthentication: boolean,
    ) {
    }
}
