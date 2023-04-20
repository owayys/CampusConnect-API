const moment = require('moment');

function formatMessage(user, message, room) {
    return {
        user,
        message,
        room,
        time: moment().format('hh:mm:ss a')
    };
}

module.exports = formatMessage;