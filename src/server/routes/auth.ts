import { AsyncRoute } from '../tools/async-route';
import { SyncRoute } from '../tools/sync-route';
import { Routing } from '../tools/routing';
import { Auth, LoginResponse, LoginTokenResponse, LogoutResponse, ValidateResponse } from '../tools/auth';

export const AuthRoutes = Routing.setupRoutes([
        new AsyncRoute<ValidateResponse>('get', '/login', Auth.validate, false),
        new AsyncRoute<LoginResponse>('post', '/login', Auth.login, false),
        new AsyncRoute<LoginTokenResponse>('post', '/login/token', Auth.token, false),
        new SyncRoute<LogoutResponse>('post', '/logout', Auth.logout, false),
    ]);
