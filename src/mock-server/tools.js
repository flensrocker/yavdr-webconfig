var express = require('express');

function Route(method, path, logic) {
    this.method = method;
    this.path = path;
    this.logic = logic;
};

const createController = (logicFunc) => {
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
                console.log('add route ' + r.method + ' ' + r.path);
                switch (r.method) {
                    case 'get': {
                        router.get(r.path, createController(r.logic));
                        break;
                    }
                    case 'post': {
                        router.post(r.path, createController(r.logic));
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
    createController: createController,
    setupRoutes: setupRoutes,
};
