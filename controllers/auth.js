var pool = require('../db/index');
const bcrypt = require('bcrypt');

exports.userLogin = (req, res) => {
    const { email, password, soc_flag } = req.body

    var id = email.split("@")[0];

    if (soc_flag) {
        pool.query(`SELECT password FROM societies WHERE soc_id='${id}'`, (err, results) => {
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
                    const hashed_password = eval(`results[0].password`);
                    bcrypt.compare(password, hashed_password, (err, comp_result) => {
                        if (comp_result) {
                            pool.query(`SELECT soc_name FROM societies WHERE soc_id='${id}'`, (err, results) => {
                                if (err) {
                                    res.json({ error: err })
                                } else {
                                    console.log(results)
                                    res.json({ code: 200, name: results[0].soc_name });
                                }
                            })
                        }
                        else res.json({ code: 401 });
                    })
                }
            }
        });
    }
    else {
        id = parseInt(id);

        pool.query(`SELECT password FROM students WHERE s_id='${id}'`, (err, results) => {
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
                    const hashed_password = eval(`results[0].password`);
                    bcrypt.compare(password, hashed_password, (err, comp_result) => {
                        if (comp_result) {
                            pool.query(`SELECT s_id, s_name FROM students WHERE s_id='${id}'`, (err, results) => {
                                if (err) {
                                    res.json({ error: err })
                                } else {
                                    console.log(id, results);
                                    res.json({ code: 200, name: results[0].s_name, id: results[0].s_id });
                                }
                            })
                        }
                        else res.json({ code: 401 });
                    })
                }
            }
        });
    }

    console.log("Logged login")
}

exports.userSignup = (req, res) => {
    const { name, email, password } = req.body
    console.log(req.body)

    const id = parseInt(email.slice(0, 8));

    bcrypt.hash(password, 10, (err, hashed_password) => {
        if (err) {
            res.json({ error: err })
        }
        pool.query(`INSERT INTO students (s_name,s_id,password) VALUES ('${name}','${id}','${hashed_password}')`, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.json({ code: err.code })
                }
                else {
                    throw err;
                }
            }
            else {
                res.json({ code: 200 });
            }
        });
    })

    console.log("Logged signup")
}