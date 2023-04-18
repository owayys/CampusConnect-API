var pool = require('../db/index');

exports.courseGetAll = (req, res) => {

    pool.query(`SELECT c_code, c_section, c_name FROM courses;`, (err, results) => {
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