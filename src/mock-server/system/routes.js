var tools = require('../tools');
var logic = require('./logic');

module.exports = tools.setupRoutes([{
    method: 'get',
    path: '/status',
    logic: logic.status,
}]);
