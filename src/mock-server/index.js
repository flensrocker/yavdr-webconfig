const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const auth = require('./auth/routes');
const system = require('./system/routes');

const app = express();
const root = path.join(__dirname, '../../dist');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static(root));

app.use('/api', auth);
app.use('/api', system);

// don't send index.html for unknown api requests
app.all('/api/*', (req, res) => {
    res.status(404)
        .json({ msg: 'api not found' });
});

// send index.html for unknown files
// (support for HTML5 Client-URLs)
app.get('*', (req, res) => {
    console.log('fallback to index.html for', req.url);
    res.sendFile(path.join(root, 'index.html'))
});

app.listen(4200, () => console.log('Mock-Server listening on port 4200'));
