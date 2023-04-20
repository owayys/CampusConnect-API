var pool = require('../db/index');

exports.eventGetAll = (req, res) => {
    pool.query(`SELECT event.event_id, soc_id, event_name, status, event_date, TIME_FORMAT(event_time, '%h:%i %p') AS event_time, location, banner, info, COUNT(events_going.s_id) AS attendees FROM event LEFT OUTER JOIN events_going ON event.event_id = events_going.event_id GROUP BY event.event_id;`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json(result);
        }
    });
}

exports.eventGet = (req, res) => {
    const { event_id } = req.body;

    pool.query(`SELECT * FROM event WHERE event_id=${event_id} UNION SELECT COUNT(s_id) FROM events_going WHERE event_id=${event_id}`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json(result);
        }
    });
}

exports.eventCreate = (req, res) => {
    const { soc_id, event_name, event_date, event_time, location, banner, info } = req.body;

    pool.query(`INSERT INTO event (soc_id, event_name, status, event_date, event_time, location, banner, info) VALUES ('${soc_id}', '${event_name}','UPCOMING' , '${event_date}', '${event_time}', '${location}', '${banner}', '${info}')`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json(result);
        }
    });
}

exports.eventEdit = (req, res) => {

    const { event_id, soc_id, event_name, event_date, event_time, location, banner, info } = req.body;

    pool.query(`UPDATE event SET soc_id=${soc_id}, event_name=${event_name}, event_date=${event_date}, event_time=${event_time}, location=${location} banner=${banner}, info=${info} WHERE event_id=${event_id}`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json(result);
        }
    });
}

exports.eventDelete = (req, res) => {
    const { event_id } = req.body;

    pool.query(`DELETE FROM event WHERE event_id=${event_id}`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json(result);
        }
    });
}