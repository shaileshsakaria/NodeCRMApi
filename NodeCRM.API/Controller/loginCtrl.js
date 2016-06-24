var jwt = require('jsonwebtoken');
var config = require('../config');
var _ = require("underscore");
var sha1 = require('sha1')
var sql = require('mssql');

module.exports.login = function (req, res) {
    // User.findOne({ UserName: req.body.UserName, Password: sha1(req.body.Password), "isDelete": false }, function (err, user) {
    var Email = req.body.Email;
    var Password = sha1(req.body.Password);

    new sql.Request().query("select top 1 * from UserManagement where (Email = '" + Email + "' or UserName = '" + Email + "') and Password = '" + Password + "'").then(function (user) {
        if (user.length > 0 && user[0]) {
            token = createToken(user[0]);

            res.json({ status: config.responseStatus, loggedin: true, user: user[0], token: token });
        }
        else {
            res.json({ status: config.responseStatus, loggedin: false, Message: config.Messages.NotValidCredentials });
        }
    }).catch(function (err) {
        res.json({ status: config.responseStatus, loggedin: false, Message: config.Messages.NotValidCredentials });
    });
};


function createToken(user) {
    var signedUser = {
        UserName: user.UserName,
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName,
        UserID: user.UserID,
    };
    return jwt.sign(signedUser, config.secretKey, { expiresIn: 7200 });
}

module.exports.verify = function (req, res) {
    jwt.verify(req.body.token, config.secretKey, function (err, decoded) {
        if (decoded == undefined)
            res.json({ status: "ok", loggedin: false });
        else
            res.json({ status: "ok", loggedin: true });
    });
};

module.exports.isAuthenticated = function (req, res, next) {
    jwt.verify(req.headers.authorization, config.secretKey, function (err, decoded) {
        if (decoded == undefined)
            res.status(401).send();
        else
            next();
    });

};







