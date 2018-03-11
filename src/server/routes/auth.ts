import { Router } from 'express';

import { AsyncRoute, SyncRoute, Routing } from '../tools';
import { AuthController, LoginResponse, LoginTokenResponse, LogoutResponse, ValidateResponse } from '../controllers/auth';

export const AuthRouter: Router = Routing.setupRoutes([
    new AsyncRoute<ValidateResponse>('get', '/login', AuthController.validate, false),
    new AsyncRoute<LoginResponse>('post', '/login', AuthController.login, false),
    new AsyncRoute<LoginTokenResponse>('post', '/login/token', AuthController.token, false),
    new SyncRoute<LogoutResponse>('post', '/logout', AuthController.logout, false),
]);
