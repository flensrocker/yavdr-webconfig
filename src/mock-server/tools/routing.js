var express = require('express');
var auth = require('./auth');

function Route(method, path, logic, needsAuthentication) {
    this.method = method;
    this.path = path;
    this.logic = logic;
    this.needsAuthentication = Boolean(needsAuthentication);
};

const createHandler = (logicFunc) => {
    return (req, res) => {
        try {
            var ret = logicFunc(req.body);
            if (ret.status) {
                res.status(ret.status);
            }
            if (ret.response) {
                res.json(ret.response);
            } else {
                throw new Error('No Response');
            }
        } catch (err) {
            res.status(500)
                .json({ msg: 'Error: ' + (err.message ? err.message : '') });
        }
    };
};

const setupRoutes = (routes) => {
    var router = express.Router();
    if (Array.isArray(routes)) {
        routes.filter((r) => (r instanceof Route))
            .forEach((r) => {
                console.log('add route ' + r.method + ' ' + r.path + (r.needsAuthentication ? ' with authentication' : ''));
                var handlers = (r.needsAuthentication ? [auth.authenticate] : []);
                handlers.push(createHandler(r.logic));
                switch (r.method) {
                    case 'get': {
                        router.get(r.path, handlers);
                        break;
                    }
                    case 'post': {
                        router.post(r.path, handlers);
                        break;
                    }
                    default: {
                        console.error('unknown router method "' + r.method + '" on path "' + r.path + '"');
                        break;
                    }
                }
            });
    }
    return router;
};

module.exports = {
    Route: Route,
    setupRoutes: setupRoutes,
};
