import { Route } from '../tools/route';
import { routing } from '../tools/routing';
import auth from '../tools/auth';

export default routing.setupRoutes([
    new Route('get', '/login', auth.validate, false),
    new Route('post', '/login', auth.login, false),
    new Route('post', '/login/token', auth.token, false),
    new Route('post', '/logout', auth.logout, true),
]);
