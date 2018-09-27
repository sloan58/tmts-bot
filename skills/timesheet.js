var connection = require('../db')

module.exports = function(controller) {

    controller.hears(['^add time'], 'direct_message', function(bot, message) {

        bot.createConversation(message, function(err, convo) {
            
            // Create a yes/no question in the default thread...
            convo.ask(`Okay, I will add time for you ${message.user.firstName}!\n\n` + 
                      `How many hours would you like to add?`, [
                {
                    pattern:  '.*',
                    callback: function(response, convo) {
                        let hours = response.text
                        hours = hours.replace(/\D/g,'')
                        console.log(hours)
                        console.log(isNaN(hours))
                        if (isNaN(hours)) {
                            convo.repeat()
                        }
                        convo.gotoThread('yes_thread')
                    },
                },
            ]);

            convo.activate();

            // capture the results of the conversation and see what happened...
            convo.on('end', function(convo) {

                if (convo.successful()) {
                    // this still works to send individual replies...
                    bot.reply(message, 'Seeya nex time!');

                }

            });
            
        });

    });

};
