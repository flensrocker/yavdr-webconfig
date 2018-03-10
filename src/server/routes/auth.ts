import { Route, AsyncRouteHandler, SyncRouteHandler } from '../tools/route';
import { Routing } from '../tools/routing';
import { Auth, LoginResponse, LoginTokenResponse, LogoutResponse, ValidateResponse } from '../tools/auth';

export const AuthRoutes = Routing.setupRoutes([
    new Route<ValidateResponse>('get', '/login', new AsyncRouteHandler(Auth.validate), false),
    new Route<LoginResponse>('post', '/login', new AsyncRouteHandler(Auth.login), false),
    new Route<LoginTokenResponse>('post', '/login/token', new AsyncRouteHandler(Auth.token), false),
    new Route<LogoutResponse>('post', '/logout', new SyncRouteHandler(Auth.logout), false),
]);
