var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.db_host,
    database : process.env.db_database,
    user     : proccess.env.db_user,
    password : process.env.db_password,
    port     : "3306"
});
      
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;