var sql = require('mssql'),
    config = require('../config'),
     _ = require("underscore");

module.exports.list = function (req, res) {
    var SearchQuery = "select * from Customer";

    if (req.params.search == "DocsRequired") {
        SearchQuery = "select * from Customer where IsIDUploaded = 'no'";
    }
    else if (req.params.search != "All" && req.params.search != "DocsRequired") {
        var state = req.params.search;
        SearchQuery = "select * from Customer where State = '" + state + "'";
    }

    new sql.Request().query(SearchQuery).then(function (customers) {
        GetCustomerStateCount(customers);
    }).catch(function (err) {
        res.json({ status: config.errorStatus });
    });

    function GetCustomerStateCount(customers) {
        var CountQuery = "select [State],Count(1) Count from Customer GROUP BY [State] UNION ALL SELECT 'Docs Required',COUNT(1) Cnt FROM	Customer WHERE	IsIDUploaded = 'No' GROUP BY IsIdUploaded";
        new sql.Request().query(CountQuery).then(function (count) {
            var StateCount = {};
            _.each(count, function (obj) {
                StateCount[obj.State] = obj.Count;
            });

            var Total = _.filter(count, function (obj) { return obj.State != "Docs Required" });
            var TotalCount = eval((_.chain(Total).pluck('Count').compact().value()).join('+') || 0);
            res.json({ status: config.responseStatus, customers: customers, StateCount: StateCount, TotalCount: TotalCount });
        }).catch(function (err) {
            res.json({ status: config.responseStatus, customers: customers, StateCount: null, TotalCount: 0 });
        });
    }
};












