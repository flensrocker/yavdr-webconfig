import { Router } from 'express';

import { AuthRouter } from '../tools';

import { RemoteControlRouter } from './remote-control';
import { SystemRouter } from './system';

export const AppRouters: Router[] = [
    AuthRouter,
    RemoteControlRouter,
    SystemRouter,
];
