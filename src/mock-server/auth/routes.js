var tools = require('../tools');
var logic = require('./logic');

module.exports = tools.setupRoutes([{
    method: 'get',
    path: '/login',
    logic: logic.validate,
}, {
    method: 'post',
    path: '/login',
    logic: logic.login,
}, {
    method: 'post',
    path: '/logout',
    logic: logic.logout,
}]);
