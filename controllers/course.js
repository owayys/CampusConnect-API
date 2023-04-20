var pool = require('../db/index');

exports.courseGetAll = (req, res) => {

    pool.query(`SELECT c_id, c_code, c_section, c_name FROM courses;`, (err, results) => {
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

exports.scheduleGetAll = (req, res) => {

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

exports.postEnrolled = (req, res) => {

    const { s_id, courses } = req.body

    courses.map((course) => {
        pool.query(`INSERT INTO enrolled (s_id, c_id) VALUES (${s_id}, ${course.c_id})`, (err, results) => {
            if (err) throw err;
            else {
                res.json({code: 200})
            }
        })
    }
    )
};

exports.getEnrolled = (req, res) => {

    const {s_id} = req.body

    pool.query(`SELECT c_code, c_section, c_name FROM enrolled JOIN courses ON enrolled.c_id=courses.c_id WHERE s_id=${s_id}`, (err, results) => {
        if (err) throw err;
        else {
            if (results.length === 0) {
                res.json({ code: 401 });
            }
            else if (!results[0]) {
                res.json({ code: 401 });
            }
            else {
                res.json({ code: 200, courses: results });
            }
        }
    });
};