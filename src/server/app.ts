import * as path from 'path';
import * as express from 'express';
import { Application, Router } from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

import { Config } from './config';

import { AuthRoutes } from './routes/auth';
import { SystemRoutes } from './routes/system';

export namespace App {
    export const createApp = (rootDir: string): Application => {
        const app: Application = express();
        const root = (rootDir && path.isAbsolute(rootDir) ? rootDir : path.join(__dirname, rootDir));

        app.use(morgan('tiny'));
        app.use(bodyParser.json());
        app.use(cookieParser(Config.cookieSecret));
        app.use(express.static(root));

        // register api routes
        [
            AuthRoutes,
            SystemRoutes,
        ].forEach((r) => app.use('/api', r));

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
