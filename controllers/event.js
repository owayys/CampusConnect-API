var pool = require('../db/index');

exports.eventOngoing = (req, res) => {
    pool.query(`SELECT * FROM event WHERE status='ONGOING'`, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    });
}

exports.eventUpcoming = (req, res) => {
    pool.query(`SELECT * FROM event WHERE status='UPCOMING'`, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    });
}

exports.eventCompleted = (req, res) => {
    pool.query(`SELECT * FROM event WHERE status='COMPLETED'`, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    });
}

exports.eventGet = (req, res) => {
    const {event_id} = req.body;

    pool.query(`SELECT * FROM event WHERE event_id=${event_id}`, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    });
}

exports.eventCreate = (req, res) => {
    const {soc_id, event_name, start_date, end_date, banner, info} = req.body;

    pool.query(`INSERT INTO event (soc_id, event_name, status, start_date, end_date, banner, info) VALUES (${soc_id}, ${event_name},'UPCOMING' , ${start_date}, ${end_date}, ${banner}, ${info})`, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    });
}

exports.eventEdit = (req, res) => {
    pool.query(`SELECT * FROM event WHERE status='COMPLETED'`, (err, result) => {
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