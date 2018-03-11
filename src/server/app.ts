import * as path from 'path';
import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

import { AuthConfig } from './tools';

import { AppConfig } from './app-config';
import { AppRouters } from './routes';

export namespace App {
    export const createApp = (): Application => {
        const app: Application = express();
        const root = (AppConfig.root && path.isAbsolute(AppConfig.root) ? AppConfig.root : path.join(__dirname, AppConfig.root));

        app.use(morgan('tiny'));
        app.use(bodyParser.json());
        app.use(cookieParser(AuthConfig.secret));
        app.use(express.static(root));

        // register api routes
        AppRouters.forEach((r) => app.use('/api', r));

        // don't send index.html for unknown api requests
        app.all('/api/*', (req, res) => {
            res.status(404)
                .json({ msg: 'api not found' });
        });

        // send index.html for unknown files
        // (support for HTML5 Client-URLs)
        app.get('*', (req, res) => {
            res.sendFile(path.join(root, 'index.html'));
        });

        return app;
    };
}
