const connection = require('../db')

module.exports = function(controller) {

    // Check that the user exists in the databse and if they are an admin
    controller.middleware.heard.use(function(bot, message, next) {
        if(!message.tmts_user) {
            connection.query('SELECT * FROM `users` WHERE email = ?', [message.user], function (error, results, fields) {
                if (error) {
                    console.log(error)
                    // connection.end();
                    next();
                }
                if (results.length) {
                    message.tmts_user = results[0]
                    message.tmts_user.firstName = message.tmts_user.name.split(" ")[0]
                    // connection.end();

                    // Check if this user is a TMTS Admin
                    connection.query('SELECT count(*) count FROM users u JOIN role_users ru ON ru.user_id = u.id JOIN roles r ON ru.role_id = r.id WHERE r.name = "admin" AND u.email = ?', [message.user], function (error, results, fields) {
                        if (error) {
                            console.log(error)
                            // connection.end();
                            next();
                        }
                        if (results[0].count) {
                            message.tmts_user.isAdmin = true
                            // connection.end();
                        }
                        next();
                    });
                }
            });
        }
    });
}