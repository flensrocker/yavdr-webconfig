import { Router } from 'express';

import { SyncRoute, Routing } from '../tools';
import { SystemController, SystemStatusData } from '../controllers/system';

export const SystemRouter: Router = Routing.setupRoutes([
    new SyncRoute<SystemStatusData>('get', '/system/status', SystemController.status, true),
]);
