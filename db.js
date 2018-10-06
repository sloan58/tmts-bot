// const env = require('node-env-file');
// env(__dirname + '/.env');

if(!process.env.db_host) {
    console.log(process.process.env.db_host);
    process.exit(1)
}

const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : process.env.db_host,
    database : process.env.db_database,
    user     : process.env.db_user,
    password : process.env.db_password,
    port     : "3306"
});
      
connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;