var pool = require('../db/index');

exports.scheduleGetAll = (req, res) => {
    const { s_id } = req.body

    pool.query(`SELECT c_code, c_name, class_day, start_time, end_time FROM courses JOIN coursetimings ON courses.c_id = coursetimings.c_id;`, (err, results) => {
        if (err) throw err;
        else {
            if (results.length === 0) {
                res.json({ code: 401 });
            }
            else if (!results[0]) {
                res.json({ code: 401 });
            }
            else {
                res.json({ code: 200, schedule: results });
            }
        }
    });
};