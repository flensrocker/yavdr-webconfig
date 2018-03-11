import { Router } from 'express';

import { AsyncRoute } from './async-route';
import { SyncRoute } from './sync-route';
import { Routing } from './routing';
import { AuthController, LoginResponse, LoginTokenResponse, LogoutResponse, ValidateResponse } from './auth-controller';

export const AuthRouter: Router = Routing.setupRoutes([
    new AsyncRoute<ValidateResponse>('get', '/login', AuthController.validate, false),
    new AsyncRoute<LoginResponse>('post', '/login', AuthController.login, false),
    new AsyncRoute<LoginTokenResponse>('post', '/login/token', AuthController.token, false),
    new SyncRoute<LogoutResponse>('post', '/logout', AuthController.logout, false),
]);
