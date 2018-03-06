import { Route } from '../tools/route';
import { routing } from '../tools/routing';
import status from '../system/status';

export default routing.setupRoutes([
    new Route('get', '/system/status', status.status, true),
]);
