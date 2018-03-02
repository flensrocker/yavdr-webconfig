var express = require('express');
var tools = require('./tools');
var logic = require('./auth-logic');

var router = express.Router();

router.get('/login', tools.controller(logic.validate));
router.post('/login', tools.controller(logic.login));
router.post('/logout', tools.controller(logic.logout));

module.exports = router;
