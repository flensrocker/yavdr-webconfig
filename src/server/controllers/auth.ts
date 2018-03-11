import { Config } from '../config';
import {
    IncomingHttpHeaders,
    AuthTools,
    AsyncRouteDelegate,
    SyncRouteDelegate,
    RouteResponse,
    User,
    Users,
} from '../tools';

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
            const username = await AuthTools.getUsernameFromRequest(headers, cookies);
            const user: User = Users.findUser(username);
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
            const user: User = Users.authenticateUser(request.username, request.password);
            if (user) {
                return {
                    cookieName: Config.authCookieName,
                    cookie: await AuthTools.createToken(user),
                    response: {
                        msg: 'Login successfull',
                        groups: user.groups,
                    },
                };
            }

            return {
                status: 401,
                response: {
                    msg: 'invalid username or password',
                }
            };
        };

    export const token: AsyncRouteDelegate<LoginTokenResponse> =
        async (request: LoginRequest): Promise<RouteResponse<LoginTokenResponse>> => {
            const user: User = Users.authenticateUser(request.username, request.password);
            if (user) {
                return {
                    response: {
                        msg: 'Login successfull',
                        token: await AuthTools.createToken(user),
                    }
                };
            }

            return {
                status: 401,
                response: {
                    msg: 'invalid username or password',
                }
            };
        };

    export const logout: SyncRouteDelegate<LogoutResponse> =
        (request: any, headers: IncomingHttpHeaders, cookies: any): RouteResponse<LogoutResponse> => {
            return {
                cookieName: Config.authCookieName,
                response: {
                    msg: 'Logout successfull',
                }
            };
        };
}
