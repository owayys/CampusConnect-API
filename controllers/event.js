var pool = require('../db/index');

exports.eventGetAll = (req, res) => {
    pool.query(`SELECT * FROM event`, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    });
}

exports.eventGet = (req, res) => {
    const {event_id} = req.body;

    pool.query(`SELECT * FROM event WHERE event_id=${event_id} UNION SELECT COUNT(s_id) FROM events_going WHERE event_id=${event_id}`, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    });
}

exports.eventCreate = (req, res) => {
    const {soc_id, event_name, event_date, start_time, end_time, banner, info} = req.body;

    pool.query(`INSERT INTO event (soc_id, event_name, status, event_date, start_time, end_time, banner, info) VALUES (${soc_id}, ${event_name},'UPCOMING' , ${event_date}, ${start_time}, ${end_time}, ${banner}, ${info})`, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    });
}

exports.eventEdit = (req, res) => {

    const { event_id, soc_id, event_name, start_date, end_date, banner, info} = req.body;

    pool.query(`UPDATE event SET soc_id=${soc_id}, event_name=${event_name}, start_date=${start_date}, end_date=${end_date}, banner=${banner}, info=${info} WHERE event_id=${event_id}`, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    });
}

exports.eventDelete = (req, res) => {
    const {event_id} = req.body;

    pool.query(`DELETE FROM event WHERE event_id=${event_id}`, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    });
}