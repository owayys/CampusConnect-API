var pool = require('../db/index');

exports.studentsGetAll = (req, res) => {
    const { s_id } = req.body

    pool.query(`SELECT s_id, s_name FROM students;`, (err, results) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            pool.query(`SELECT interests.s_id, interest FROM interests JOIN students ON interests.s_id=students.s_id;`, (err, results2) => {
                if (err) {
                    res.json({ error: err })
                }
                else {
                    res.json({ code: 200, students: results, interests: results2 })
                }
            });
        }
    });
};