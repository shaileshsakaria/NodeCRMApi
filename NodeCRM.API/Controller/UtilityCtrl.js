var sql = require('mssql'),
    config = require('../config'),
     _ = require("underscore");

module.exports.SaveSortPrefrence = function (req, res) {

    //delete sort preference for requested userid, preference type and page name
    var deleteQuery = "Delete from UserPreferences where UserID = '" + req.body.UserID + "' and PreferenceType = '" + req.body.PreferenceType + "' and PageName = '" + req.body.PageName + "'";
    new sql.Request().query(deleteQuery).then(function (customers) {
        if (req.body.sortList && req.body.sortList.length > 0) {
            savePrefrence();
        }
        else {
            res.json({ status: config.responseStatus });
        }
    }).catch(function (err) {
        res.json({ status: config.errorStatus });
    });

    function savePrefrence() {
        var insertValues;
        _.each(req.body.sortList, function (obj) {
            if (insertValues == undefined)
                insertValues = "('" + req.body.UserID + "','" + req.body.PreferenceType + "','" + req.body.PageName + "','" + obj.ColumnName + "','" + obj.SortDirection + "','" + obj.PrferenceOrder + "')";
            else
                insertValues += ",('" + req.body.UserID + "','" + req.body.PreferenceType + "','" + req.body.PageName + "','" + obj.ColumnName + "','" + obj.SortDirection + "','" + obj.PrferenceOrder + "')";
        });

        var query = "INSERT INTO UserPreferences (UserID, PreferenceType, PageName, ColumnName, SortDirection, PrferenceOrder) VALUES " + insertValues;
        new sql.Request().query(query).then(function (customers) {
            res.json({ status: config.responseStatus });
        }).catch(function (err) {
            res.json({ status: config.errorStatus });
        });
    }

};

module.exports.getUserPrefrence = function (req, res) {
    var SearchQuery = "select * from UserPreferences where UserID = '" + req.body.UserID + "' and PageName= '" + req.body.PageName + "'";

    new sql.Request().query(SearchQuery).then(function (result) {
        res.json({ status: config.responseStatus, prefrences: result });
    }).catch(function (err) {
        res.json({ status: config.errorStatus });
    });

};

module.exports.ShowHideColumn = function (req, res) {
    var Query;
    if (req.body.IsHide == true) {
        Query = "Delete from UserPreferences where UserID = '" + req.body.UserID + "' and PreferenceType = '" + req.body.PreferenceType + "' and PageName = '" + req.body.PageName + "' and ColumnName = '" + req.body.ColumnName + "'";
    }
    else {
        Query = "INSERT INTO UserPreferences (UserID, PreferenceType, PageName, ColumnName, IsHide) VALUES ('" + req.body.UserID + "','" + req.body.PreferenceType + "','" + req.body.PageName + "','" + req.body.ColumnName + "', 1 )";
    }

    new sql.Request().query(Query).then(function (customers) {
        res.json({ status: config.responseStatus });
    }).catch(function (err) {
        res.json({ status: config.errorStatus });
    });

};

module.exports.SaveColumnSequence = function (req, res) {

    //delete sort preference for requested userid, preference type and page name
    var deleteQuery = "Delete from UserPreferences where UserID = '" + req.body.UserID + "' and PageName = '" + req.body.PageName + "'";
    new sql.Request().query(deleteQuery).then(function (customers) {
        if (req.body.orderList && req.body.orderList.length > 0) {
            savePrefrence();
        }
        else {
            res.json({ status: config.responseStatus });
        }
    }).catch(function (err) {
        res.json({ status: config.errorStatus });
    });

    function savePrefrence() {
        var insertValues;
        _.each(req.body.orderList, function (obj, index) {
            if (insertValues == undefined)
                insertValues = "('" + req.body.UserID + "','" + req.body.PreferenceType + "','" + req.body.PageName + "','" + obj + "','" + (index + 1) + "')";
            else
                insertValues += ",('" + req.body.UserID + "','" + req.body.PreferenceType + "','" + req.body.PageName + "','" + obj + "','" + (index + 1) + "')";
        });

        var query = "INSERT INTO UserPreferences (UserID, PreferenceType, PageName, ColumnName, PrferenceOrder) VALUES " + insertValues;
        new sql.Request().query(query).then(function (customers) {
            res.json({ status: config.responseStatus });
        }).catch(function (err) {
            res.json({ status: config.errorStatus });
        });
    }

};

module.exports.SaveColumnPinnedPosition = function (req, res) {
    var deleteQuery = "Delete from UserPreferences where UserID = " + req.body.UserID + " and PreferenceType in ('PL','PR') and PageName = '" + req.body.PageName + "' and ColumnName = '" + req.body.ColumnName + "'";
    new sql.Request().query(deleteQuery).then(function (customers) {
        if (req.body.PreferenceType != undefined) {
            savePrefrence();
        }
        else {
            res.json({ status: config.responseStatus });
        }
    }).catch(function (err) {
        res.json({ status: config.errorStatus });
    });
    function savePrefrence() {
        var Query;
        Query = "INSERT INTO UserPreferences (UserID, PreferenceType, PageName, ColumnName) VALUES ('" + req.body.UserID + "','" + req.body.PreferenceType + "','" + req.body.PageName + "','" + req.body.ColumnName + "')";
        new sql.Request().query(Query).then(function (customers) {
            res.json({ status: config.responseStatus });
        }).catch(function (err) {
            res.json({ status: config.errorStatus });
        });
    }
};

module.exports.SetDefault = function (req, res) {

    //delete  preference for requested userid, page name
    var deleteQuery = "Delete from UserPreferences where UserID = '" + req.body.UserID + "' and PageName = '" + req.body.PageName + "'";
    new sql.Request().query(deleteQuery).then(function (customers) {
        res.json({ status: config.responseStatus });
    }).catch(function (err) {
        res.json({ status: config.errorStatus });
    });
};









