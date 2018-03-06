import { Route } from '../tools/route';
import { Routing } from '../tools/routing';
import { Auth } from '../tools/auth';

export const AuthRoutes = Routing.setupRoutes([
    new Route('get', '/login', Auth.validate, false),
    new Route('post', '/login', Auth.login, false),
    new Route('post', '/login/token', Auth.token, false),
    new Route('post', '/logout', Auth.logout, true),
]);
