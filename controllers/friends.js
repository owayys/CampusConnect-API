var pool = require('../db/index');

exports.friendsGetAll = (req, res) => {
    const { s_id } = req.body

    pool.query(`SELECT s_id, s_name, school, graduation_year, icon, bio FROM students WHERE s_id IN (SELECT s2_id AS friends_list FROM friends WHERE s1_id=${s_id} AND accepted=1 UNION SELECT s1_id AS friends_list FROM friends WHERE s2_id=${s_id} AND accepted=1)`, (err, results) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            if (results.length === 0) {
                res.json({ code: 401 });
            }
            else if (!results[0]) {
                res.json({ code: 401 });
            }
            else {
                res.json({ code: 200, friends: results });
            }
        }
    });
};

exports.getRequests = (req, res) => {

    const { s_id } = req.body

    pool.query(`SELECT s_id, s_name, school, graduation_year, icon, bio FROM students WHERE s_id IN (SELECT s1_id FROM friends WHERE s2_id=${s_id} AND accepted=0)`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ code: 200, requests: result })
        }
    });

};

exports.sendRequest = (req, res) => {

    const { s1_id, s2_id } = req.body

    pool.query(`INSERT INTO friends (s1_id, s2_id, accepted) VALUES (${s1_id}, ${s2_id}, 0);`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ code: 200 })
        }
    });

};

exports.acceptRequest = (req, res) => {

    const { s1_id, s2_id } = req.body

    pool.query(`UPDATE friends SET accepted=1 WHERE s1_id=${s1_id} AND s2_id=${s2_id};`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            pool.query(`INSERT INTO chatrooms (isStudyGroup) VALUES (0); SELECT LAST_INSERT_ID();`, (err, result2) => {
                let chat_id = result2[1][0]['LAST_INSERT_ID()']
                if (err) {
                    res.json({ error: err })
                }
                else {
                    pool.query(`INSERT INTO members (chat_id, s_id) VALUES (${chat_id}, ${s1_id}); INSERT INTO members (chat_id, s_id) VALUES (${chat_id}, ${s2_id});`, (err, result2) => {
                        let chat_id = result2[1][0]['LAST_INSERT_ID()']
                        if (err) {
                            res.json({ error: err })
                        }
                        else {
                            res.json({ code: 200 })
                        }
                    });
                }
            });
        }
    });

};

exports.rejectRequest = (req, res) => {

    const { s1_id, s2_id } = req.body

    pool.query(`DELETE FROM friends WHERE s1_id=${s1_id} AND s2_id=${s2_id}`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ code: 200 })
        }
    });

};