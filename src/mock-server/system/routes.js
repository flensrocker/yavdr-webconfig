var tools = require('../tools');
var logic = require('./logic');

module.exports = tools.setupRoutes([
    tools.newRoute('get', '/status', logic.status),
]);
