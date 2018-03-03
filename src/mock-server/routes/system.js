var routing = require('../tools/routing');
var status = require('../system/status');

module.exports = routing.setupRoutes([
    new routing.Route('get', '/system/status', status.status, true),
]);
