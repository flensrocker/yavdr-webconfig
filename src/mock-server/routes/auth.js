var routing = require('../tools/routing');
var auth = require('../tools/auth');

module.exports = routing.setupRoutes([
    new routing.Route('get', '/login', auth.validate),
    new routing.Route('post', '/login', auth.login),
    new routing.Route('post', '/login/token', auth.token),
    new routing.Route('post', '/logout', auth.logout, true),
]);
