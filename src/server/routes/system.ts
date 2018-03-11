import { SyncRoute } from '../tools/sync-route';
import { Routing } from '../tools/routing';
import { Status, SystemStatusData } from '../system/status';

export const SystemRoutes = Routing.setupRoutes([
        new SyncRoute<SystemStatusData>('get', '/system/status', Status.status, true),
    ]);
