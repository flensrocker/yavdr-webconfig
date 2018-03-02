var express = require('express');

const controller = (logicFunc) => {
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

module.exports = {
    controller: controller,
    setupRoutes: (routes) => {
        var router = express.Router();
        routes.forEach((route) => {
            switch (route.method) {
                case 'get': {
                    router.get(route.path, controller(route.logic));
                    break;
                }
                case 'post': {
                    router.post(route.path, controller(route.logic));
                    break;
                }
            }
        });
        return router;
    },
};
