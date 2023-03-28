var connection = require('../db/index');

exports.eventsOngoing = (req, res) => {
    connection.query(`SELECT * FROM events WHERE status='ONGOING'`, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    });
}