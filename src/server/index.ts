import { Server } from 'http';
import { Application } from 'express';
import * as crypto from 'crypto';
import * as path from 'path';

import { AuthConfig } from './tools';

import { AppConfig } from './app-config';
import { App } from './app';

const authConfig: AuthConfig = new AuthConfig(
    crypto.randomBytes(64).toString('hex'),
    'auth',
    60 * 60, // 60m
);

const config: AppConfig = new AppConfig(
    path.join(__dirname, '../../dist'),
    4200,
    '/api',
    'index.html',
);

const app: Application = App.createApp();
const server: Server = app.listen(AppConfig.port, () => console.log(`Server listening on port ${AppConfig.port}`));

export default server;
