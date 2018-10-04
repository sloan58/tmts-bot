const connection = require('../db')

module.exports = function(controller) {

    // Check that the user exists in the databse before responding
    controller.middleware.receive.use(function(bot, message, next) {
        
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
                    next();
                }
                
            });

        }

    });

}