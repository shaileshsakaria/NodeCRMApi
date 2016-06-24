var express = require('express');
var UtilityCtrl = require('../Controller/UtilityCtrl.js');
var loginCtrl = require('../Controller/loginCtrl.js');
var app = module.exports = express.Router();

app.route('/api/Utility/SaveSortPrefrence').post(loginCtrl.isAuthenticated, UtilityCtrl.SaveSortPrefrence);
app.route('/api/Utility/getUserPrefrence').post(loginCtrl.isAuthenticated, UtilityCtrl.getUserPrefrence);
app.route('/api/Utility/ShowHideColumn').post(loginCtrl.isAuthenticated, UtilityCtrl.ShowHideColumn);
app.route('/api/Utility/SaveColumnSequence').post(loginCtrl.isAuthenticated, UtilityCtrl.SaveColumnSequence);
app.route('/api/Utility/SetDefault').post(loginCtrl.isAuthenticated, UtilityCtrl.SetDefault);
app.route('/api/Utility/SaveColumnPinnedPosition').post(loginCtrl.isAuthenticated, UtilityCtrl.SaveColumnPinnedPosition);
