import * as path from 'path';
import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { Container } from 'typedi';

import { AuthConfig, AuthConfigToken } from './tools';

import { AppConfig, AppConfigToken } from './app-config';
import { AppRouters } from './routers';

export namespace App {
    export const createApp = (): Application => {
        const authConfig: AuthConfig = Container.get<AuthConfig>(AuthConfigToken);
        const appConfig: AppConfig = Container.get<AppConfig>(AppConfigToken);
        const app: Application = express();

        app.use(morgan('tiny'));
        app.use(bodyParser.json());
        app.use(cookieParser(authConfig.secret));
        app.use(express.static(appConfig.root));

        // register api routes
        if (AppRouters && (AppRouters.length > 0) && appConfig.apiBaseUrl) {
            AppRouters.forEach((r) => app.use(appConfig.apiBaseUrl, r));

            // don't send fallback for unknown api requests
            app.all(`${appConfig.apiBaseUrl}/*`, (req, res) => {
                res.status(404)
                    .json({ msg: 'api not found' });
            });
        }

        // send fallback for unknown files
        // (support for HTML5 Client-URLs)
        if (appConfig.fallbackUrl) {
            app.get('*', (req, res) => {
                res.sendFile(path.join(appConfig.root, appConfig.fallbackUrl));
            });
        }

        return app;
    };
}
