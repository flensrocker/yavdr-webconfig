import { Router } from 'express';

import { SyncRoute, Routing } from '../tools';
import { RemoteControlController, HitkeyResponse, HitkeysResponse } from '../controllers/remote-control';

export const RemoteControlRouter: Router = Routing.setupRoutes([
    new SyncRoute<HitkeyResponse>('post', '/hitkey', RemoteControlController.hitkey, true),
    new SyncRoute<HitkeysResponse>('post', '/hitkeys', RemoteControlController.hitkeys, true),
]);
