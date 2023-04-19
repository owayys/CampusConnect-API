var pool = require('../db/index');

exports.interestsGet = (req, res) => {
    const { s_id } = req.body

    pool.query(`SELECT interest FROM interests WHERE s_id=${s_id}`, (err, results) => {
        if (err) throw err;
        else {
            if (results.length === 0) {
                res.json({ code: 401 });
            }
            else if (!results[0]) {
                res.json({ code: 401 });
            }
            else {
                res.json({ code: 200, interests: results });
            }
        }
    });
};

exports.addInterest = (req, res) => {

    const { s_id, interest } = req.body

    pool.query(`INSERT INTO interests (s_id, interest) VALUES (${s_id}, ${interest})`, (err, result) => {
        if (err) throw err;
        else {
            res.json({code: 200})
        }
    });

};

exports.removeInterest = (req, res) => {

    const { s_id, interest } = req.body

    pool.query(`DELETE FROM interests WHERE s_id=${s_id} AND interest=${interest}`, (err, result) => {
        if (err) throw err;
        else {
            res.json({code: 200})
        }
    });

};