var pool = require('../db/index');

exports.groupGetAll = (req, res) => {
    const {id} = req.body

    pool.query(`SELECT chat_id, icon FROM chatrooms WHERE s_id='${id}'`, (err, results) => {
        if (err) throw err;
        else {
            if (results.length === 0) {
                res.json({code: 401});
            }
            else if (!results[0]) {
                res.json({code: 401});
            }
            else {
                res.json({code: 200, groups: results});
            }
        }
    });
};

exports.groupCreate = (req, res) => {
    const {s_id, icon} = req.body

    pool.query(`INSERT INTO chatrooms (s_id, icon) VALUES (${s_id}, ${icon})`, (err, results) => {
        if (err) throw err;
        else {
            if (results.length === 0) {
                res.json({code: 401});
            }
            else if (!results[0]) {
                res.json({code: 401});
            }
            else {
                res.json({code: 200, groups: results});
            }
        }
    });
};