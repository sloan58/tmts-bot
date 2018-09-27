var connection = require('../db')

module.exports = function(controller) {

    controller.hears(['^add time'], 'direct_message', function(bot, message) {

        bot.createConversation(message, function(err, convo) {
            if (!err) {
                convo.say(`Okay, I will add time for you ${message.user.firstName}`);
                convo.activate();
            }
        });

    });

};
