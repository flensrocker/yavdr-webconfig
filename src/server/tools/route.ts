import { IncomingHttpHeaders } from 'http';
export { IncomingHttpHeaders };

export interface RouteResponse {
    status?: number;
    cookieName?: string;
    cookie?: any;
    response: any;
}

export type RouteDelegate = (body: any, headers: IncomingHttpHeaders, cookies: any) => RouteResponse;

export class Route {
    constructor(
        public method: 'get' | 'post',
        public path: string,
        public logic: RouteDelegate,
        public needsAuthentication: boolean,
    ) {
    }
}
