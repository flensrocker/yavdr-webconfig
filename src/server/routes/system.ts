import { Route } from '../tools/route';
import { Routing } from '../tools/routing';
import { Status } from '../system/status';

export const SystemRoutes = Routing.setupRoutes([
    new Route('get', '/system/status', Status.status, true),
]);
