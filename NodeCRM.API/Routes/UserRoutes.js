var express = require('express');
var loginCtrl = require('../Controller/loginCtrl.js');

var app = module.exports = express.Router();
app.route('/api/User/login').post(loginCtrl.login);//login
app.route('/api/User/verifytoken').post(loginCtrl.verify);//verify token