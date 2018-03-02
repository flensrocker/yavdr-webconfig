var tools = require('../tools');
var logic = require('./logic');

module.exports = tools.setupRoutes([
    tools.newRoute('get', '/login', logic.validate),
    tools.newRoute('post', '/login', logic.login),
    tools.newRoute('post', '/logout', logic.logout),
]);
