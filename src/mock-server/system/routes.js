var tools = require('../tools');
var logic = require('./logic');

module.exports = tools.setupRoutes([
    new tools.Route('get', '/system/status', logic.status),
], 'system');
