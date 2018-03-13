import * as path from 'path';
import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

import { AuthConfig } from './tools';

import { AppConfig } from './app-config';
import { AppRouters } from './routers';

export namespace App {
    export const createApp = (): Application => {
        const app: Application = express();

        app.use(morgan('tiny'));
        app.use(bodyParser.json());
        app.use(cookieParser(AuthConfig.secret));
        app.use(express.static(AppConfig.root));

        // register api routes
        if (AppRouters && (AppRouters.length > 0) && AppConfig.apiBaseUrl) {
            AppRouters.forEach((r) => app.use(AppConfig.apiBaseUrl, r));

            // don't send fallback for unknown api requests
            app.all(`${AppConfig.apiBaseUrl}/*`, (req, res) => {
                res.status(404)
                    .json({ msg: 'api not found' });
            });
        }

        // send fallback for unknown files
        // (support for HTML5 Client-URLs)
        if (AppConfig.fallbackUrl) {
            app.get('*', (req, res) => {
                res.sendFile(path.join(AppConfig.root, AppConfig.fallbackUrl));
            });
        }

        return app;
    };
}
