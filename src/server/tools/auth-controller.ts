import { IncomingHttpHeaders } from 'http';
import { Container } from 'typedi';

import { AuthConfig, AuthConfigToken } from './auth-config';
import { AuthTools } from './auth-tools';
import { AsyncRouteDelegate } from './async-route';
import { SyncRouteDelegate } from './sync-route';
import { RouteResponse } from './route';
import { BaseUser, UserManager, UserManagerToken } from './users';

import {
    LoginRequest,
    LoginResponse,
    LoginTokenResponse,
    LogoutResponse,
    TokenPayload,
    ValidateResponse,
} from '../../api';

export { LoginResponse, LoginTokenResponse, LogoutResponse, ValidateResponse };

export namespace AuthController {
    export const validate: AsyncRouteDelegate<ValidateResponse> =
        async (request: any, headers: IncomingHttpHeaders, cookies: any): Promise<RouteResponse<ValidateResponse>> => {
            const userManager: UserManager = Container.get<UserManager>(UserManagerToken);
            const username = await AuthTools.getUsernameFromRequest(headers, cookies);
            const user: BaseUser = userManager.findUser(username);
            if (user) {
                return {
                    response: {
                        msg: 'Validation successfull',
                        username: user.username,
                        groups: user.groups,
                    }
                };
            }

            return {
                status: 401,
                response: {
                    msg: 'invalid authorization, please log in and try again',
                }
            };
        };

    export const login: AsyncRouteDelegate<LoginResponse> =
        async (request: LoginRequest): Promise<RouteResponse<LoginResponse>> => {
            const authConfig: AuthConfig = Container.get<AuthConfig>(AuthConfigToken);
            const userManager: UserManager = Container.get<UserManager>(UserManagerToken);
            const user: BaseUser = userManager.authenticateUser(request.username, request.password);
            if (user) {
                return {
                    cookieName: authConfig.cookieName,
                    cookie: await AuthTools.createToken(user),
                    response: {
                        msg: 'Login successfull',
                        groups: user.groups,
                    },
                };
            }

            return {
                status: 400,
                response: {
                    msg: 'invalid username or password',
                }
            };
        };

    export const token: AsyncRouteDelegate<LoginTokenResponse> =
        async (request: LoginRequest): Promise<RouteResponse<LoginTokenResponse>> => {
            const userManager: UserManager = Container.get<UserManager>(UserManagerToken);
            const user: BaseUser = userManager.authenticateUser(request.username, request.password);
            if (user) {
                return {
                    response: {
                        msg: 'Login successfull',
                        token: await AuthTools.createToken(user),
                    }
                };
            }

            return {
                status: 400,
                response: {
                    msg: 'invalid username or password',
                }
            };
        };

    export const logout: SyncRouteDelegate<LogoutResponse> =
        (request: any, headers: IncomingHttpHeaders, cookies: any): RouteResponse<LogoutResponse> => {
            const authConfig: AuthConfig = Container.get<AuthConfig>(AuthConfigToken);
            return {
                cookieName: authConfig.cookieName,
                response: {
                    msg: 'Logout successfull',
                }
            };
        };
}
