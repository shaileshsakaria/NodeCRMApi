var express = require('express');
var customerCtrl = require('../Controller/customerCtrl.js');
var loginCtrl = require('../Controller/loginCtrl.js');
var app = module.exports = express.Router();

app.route('/api/Cutomer/list/:search').get(loginCtrl.isAuthenticated, customerCtrl.list);






