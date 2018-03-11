import { Server } from 'http';
import { Application } from 'express';
import * as crypto from 'crypto';

import { AuthConfig } from './tools';

import { AppConfig } from './app-config';
import { App } from './app';

const authConfig: AuthConfig = new AuthConfig(
    crypto.randomBytes(64).toString('hex'),
    'auth',
    60 * 60, // 60m
);

const config: AppConfig = new AppConfig(
    '../../dist',
);

const app: Application = App.createApp();
const server: Server = app.listen(4200, () => console.log('Server listening on port 4200'));

export default server;
