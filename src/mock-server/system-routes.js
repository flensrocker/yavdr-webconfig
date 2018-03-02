var express = require('express');
var tools = require('./tools');
var logic = require('./system-logic');

var router = express.Router();

router.get('/status', tools.controller(logic.status));

module.exports = router;
