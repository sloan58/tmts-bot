module.exports = function(controller) {

    controller.hears(['^help'], 'direct_message,direct_mention', function(bot, message) {

        bot.createConversation(message, function(err, convo) {
            if (!err) {
                convo.say('Say "add time" to add a time entry to your timesheet');
                convo.activate();
            }
        });

    });

};
