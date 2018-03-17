import 'reflect-metadata';
import { Container } from 'typedi';
import { Server } from 'http';
import { Application } from 'express';
import * as crypto from 'crypto';
import * as path from 'path';

import { AuthConfig, AuthConfigToken, UserManager, UserManagerToken } from './tools';

import { AppConfig, AppConfigToken } from './app-config';
import { AppUserManager, AppUser } from './app-users';
import { App } from './app';

const authConfig: AuthConfig = {
    secret: crypto.randomBytes(64).toString('hex'),
    cookieName: 'auth',
    maxAgeSec: 60 * 60, // 60m
};
Container.set(AuthConfigToken, authConfig);

const appConfig: AppConfig = {
    root: path.join(__dirname, '../../dist'),
    port: 4200,
    apiBaseUrl: '/api',
    fallbackUrl: 'index.html',
};
Container.set(AppConfigToken, appConfig);

Container.set(UserManagerToken, new AppUserManager());

const app: Application = App.createApp();
const server: Server = app.listen(appConfig.port, () => console.log(`Server listening on port ${appConfig.port}`));

export default server;
