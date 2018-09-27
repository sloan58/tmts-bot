var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : "***REMOVED***",
    database : "***REMOVED***",
    user     : "***REMOVED***",
    password : "***REMOVED***",
    port     : "3306"
});
      
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;