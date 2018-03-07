import { Route } from '../tools/route';
import { Routing } from '../tools/routing';
import { Auth, LoginResponse, LoginTokenResponse, LogoutResponse, ValidateResponse } from '../tools/auth';

export const AuthRoutes = Routing.setupRoutes([
    new Route<ValidateResponse>('get', '/login', Auth.validate, false),
    new Route<LoginResponse>('post', '/login', Auth.login, false),
    new Route<LoginTokenResponse>('post', '/login/token', Auth.token, false),
    new Route<LogoutResponse>('post', '/logout', Auth.logout, true),
]);
