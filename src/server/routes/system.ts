import { Route } from '../tools/route';
import { Routing } from '../tools/routing';
import { Status, SystemStatusData } from '../system/status';

export const SystemRoutes = Routing.setupRoutes([
    new Route<SystemStatusData>('get', '/system/status', Status.status, true),
]);
