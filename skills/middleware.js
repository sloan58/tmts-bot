const connection = require('../db')

module.exports = function(controller) {

    // Check that the user exists in the databse before responding
    controller.middleware.heard.use(function(bot, message, next) {
        
        connection.query('SELECT * FROM `users` WHERE email = ?', [message.data.personEmail], function (error, results, fields) {
            
            if (error) {
                console.log(error)
                return
            }

            if (results.length) {
                message.user = results[0]
                message.user.firstName = message.user.name.split(" ")[0]
                next();
            }

            connection.end();
        });
        
    
    });

}
