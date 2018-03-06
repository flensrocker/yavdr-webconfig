import { Server } from 'http';
import { Application } from 'express';

import { Config } from './config';
import { App } from './app';

const config: Config = new Config(
    '../../dist',
    '5uper5ecretP4ssw0rd!',
    'auth',
    60 * 60 // 60m
);

const app: Application = App.createApp();
const server: Server = app.listen(4200, () => console.log('Server listening on port 4200'));

export default server;
