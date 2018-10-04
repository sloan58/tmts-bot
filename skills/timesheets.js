var connection = require('../db')

module.exports = function(controller) {

    controller.hears(['^add time'], 'direct_message', function(bot, message) {

        bot.createConversation(message, function(err, convo) {
            
            let insertObject = {
                hours: '',
                project: '',
                created_at: '',
                updated_at: '',
                user_id: message.tmts_user.id,
            }

            convo.setVar('user', message.tmts_user.name)

            const moment = require('moment')
            const chrono = require('chrono-node')

            // convo.say(`Okay, I will add time for you ${message.tmts_user.firstName}!\n\n`)

            convo.addMessage({
                text: `Sorry, but that's not a number!`,
                action: 'default',
            },'nan');

            convo.addMessage({
                text: `Sorry, that date format is not valid.  Please try again.`,
                action: 'get_date',
            },'bad_date');


            convo.addMessage({
                text: `Excellent, your time has been entered!\n\n` + 
                      `Team Member: {{ vars.user }}\n\n` +
                      `Hours: {{ vars.hours }}\n\n` +
                      `Project: {{ vars.project }}\n\n` +
                      `Performed On: {{ vars.created_at }}`,
            },'db_success');

            convo.addMessage({
                text: `Sorry, there was an error inserting this entry.\n\n` +
                      `Please let your supervisor know and we'll fix this ASAP!`,
                action: 'stop',
            },'db_error');
            

            // Create a yes/no question in the default thread...
            convo.addQuestion({
                text: `How many hours would you like to add?`,
            }, [
                {
                    pattern: '.*',
                    callback: function(response, convo) {
                        insertObject.hours = response.text.replace(/\D/g,'')
                        if (!insertObject.hours) {
                            convo.gotoThread('nan')
                        } 
                        convo.setVar('hours', insertObject.hours)
                        convo.gotoThread('get_project')
                    },
                },
            ],{},'default');

            convo.addQuestion({
                text: `What project is this for?`,
            }, [
                {
                    pattern: '.*',
                    callback: function(response, convo) {
                        insertObject.project = response.text
                        convo.setVar('project', insertObject.project)
                        convo.gotoThread('get_date')
                    },
                },
            ],{},'get_project');

            convo.addQuestion({
                text: `When was the work done?\n\n` +
                      `You can say things like 'today' or 'last Tuesday' if you'd like, or enter in date format.`,
            }, [
                {
                    pattern: '.*',
                    callback: function(response, convo) {
                        insertObject.created_at = chrono.parseDate(response.text)
                        insertObject.created_at = moment(insertObject.created_at).startOf('day').format("YYYY-MM-DD HH:mm:ss")
                        if (!moment(insertObject.created_at).isValid()) {
                            convo.gotoThread('bad_date')
                        }
                        insertObject.updated_at = insertObject.created_at
                        convo.setVar('created_at', moment(insertObject.created_at).format("YYYY-MM-DD"))

                        // insert to DB
                        connection.query('INSERT INTO time_entries SET ?', insertObject, (error, results) => {
                            if (error) {
                                console.log(error)
                                convo.gotoThread('db_error')
                            }
                            convo.gotoThread('db_success')
                        });
                    },
                },
            ],{},'get_date');


            convo.activate();
            
        });

    });

};
