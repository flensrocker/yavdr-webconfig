import { Route } from '../tools/route';
import { routing } from '../tools/routing';
import auth from '../tools/auth';

export default routing.setupRoutes([
    new Route('get', '/login', auth.validate),
    new Route('post', '/login', auth.login),
    new Route('post', '/login/token', auth.token),
    new Route('post', '/logout', auth.logout, true),
]);
