import { Router } from 'express';

import { AuthRouter } from './auth';
import { RemoteControlRouter } from './remote-control';
import { SystemRouter } from './system';

export const AppRouters: Router[] = [
    AuthRouter,
    RemoteControlRouter,
    SystemRouter,
];
