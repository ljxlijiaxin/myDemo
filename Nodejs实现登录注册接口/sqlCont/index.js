var mysql = require("mysql");
var sqlConfig = require("../config/index").sqlConfig;

var client = mysql.createConnection(sqlConfig);

module.exports = client;