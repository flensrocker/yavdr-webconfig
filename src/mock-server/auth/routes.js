var tools = require('../tools');
var logic = require('./logic');

module.exports = tools.setupRoutes([
    new tools.Route('get', '/login', logic.validate),
    new tools.Route('post', '/login', logic.login),
    new tools.Route('post', '/logout', logic.logout, true),
], 'auth');
