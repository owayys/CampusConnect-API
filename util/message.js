const moment = require('moment');

function formatMessage(user, message) {
    return {
        user,
        message,
        time: moment().format('hh:mm:ss a')
    };
}

module.exports = formatMessage;