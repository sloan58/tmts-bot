var connection = require('./db')

connection.query('SELECT * FROM `users` WHERE id = 1 LIMIT 1', function (error, results, fields) {

    if (!error && results.length) {
        console.log(results[0].email)
    }
    //   console.log(results)
    //   console.log(fields)
        // results.forEach( (row) => {
        //     console.log(`${row.name}`);
        // });
      connection.end();

    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
});