import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { Router } from 'express-serve-static-core';

import config from './config';

import authRoutes from './routes/auth';

const routes: Router[] = [
    authRoutes,
    require('./routes/system'),
];

const app: express.Application = express();
const root = path.join(__dirname, '../../dist');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cookieParser(config.cookieSecret));
app.use(express.static(root));

// register api routes
routes.forEach((r) => app.use('/api', r));

// don't send index.html for unknown api requests
app.all('/api/*', (req, res) => {
    res.status(404)
        .json({ msg: 'api not found' });
});

// send index.html for unknown files
// (support for HTML5 Client-URLs)
app.get('*', (req, res) => {
    console.log('fallback to index.html for', req.url);
    res.sendFile(path.join(root, 'index.html'));
});

const server = app.listen(4200, () => console.log('Server listening on port 4200'));

export default server;
