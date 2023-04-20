var pool = require('../db/index');

exports.studentsGetAll = (req, res) => {
    const { s_id } = req.body

    pool.query(`SELECT s_id, s_name, icon FROM students WHERE s_id NOT IN (SELECT s_id FROM students WHERE s_id IN (SELECT s2_id AS friends_list FROM friends WHERE s1_id=${s_id} AND accepted=1 UNION SELECT s1_id AS friends_list FROM friends WHERE s2_id=${s_id} AND accepted=1)) AND s_id!=${s_id};`, (err, results) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            pool.query(`SELECT interests.s_id, interest FROM interests JOIN students ON interests.s_id=students.s_id WHERE interests.s_id!=${s_id};`, (err, results2) => {
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