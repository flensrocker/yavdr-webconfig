import { Server } from 'http';
import { Application } from 'express';

import { App } from './app';

const app: Application = App.createApp('../../dist');
const server: Server = app.listen(4200, () => console.log('Server listening on port 4200'));

export default server;
