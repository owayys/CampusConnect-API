var connection = require('../db/index');
const bcrypt = require('bcrypt');

exports.userLogin = (req, res) => {
    const {email, password, soc_flag} = req.body

    var id = email.split("@")[0];

    if (soc_flag) {
        connection.query(`SELECT password FROM societies WHERE soc_id='${id}'`, (err, results) => {
            if (err) throw err;
            else {
                console.log(results)
                if (results.length === 0) {
                    res.json({code: 401});
                }
                else if (!results[0]) {
                    res.json({code: 401});
                }
                else {
                    const hashed_password = eval(`results[0].password`);
                    bcrypt.compare(password, hashed_password, (err, comp_result) => {
                        if (comp_result) {
                            connection.query(`SELECT soc_name FROM societies WHERE soc_id='${id}'`, (err, results) => {
                                if (err) throw err;
                                console.log(results)
                                res.json({code: 200, name: results[0].soc_name});
                            })
                        }
                        else res.json({code: 401});
                    })
                }
            }
        });
    }
    else {
        id = parseInt(id);

        connection.query(`SELECT password FROM students WHERE s_id='${id}'`, (err, results) => {
            if (err) throw err;
            else {
                console.log(results)
                if (results.length === 0) {
                    res.json({code: 401});
                }
                else if (!results[0]) {
                    res.json({code: 401});
                }
                else {
                    const hashed_password = eval(`results[0].password`);
                    bcrypt.compare(password, hashed_password, (err, comp_result) => {
                        if (comp_result) {
                            connection.query(`SELECT s_name FROM students WHERE s_id='${id}'`, (err, results) => {
                                if (err) throw err;
                                console.log(id, results);
                                res.json({code: 200, name: results[0].s_name});
                            })
                        }
                        else res.json({code: 401});
                    })
                }
            }
        });
    }  

    console.log("Logged login")
}

exports.userSignup = (req, res) => {
    const {name, email, password} = req.body
    console.log(req.body)

    const id = parseInt(email.slice(0, 8));

    bcrypt.hash(password, 10, (err, hashed_password) => {
        if (err) throw err;
        connection.query(`INSERT INTO students (s_name,s_id,password) VALUES ('${name}','${id}','${hashed_password}')`, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.json({code: err.code})
                }
                else {
                    throw err;
                }
            }
            else {
                res.json({code: 200});
            }
        });
    })

    console.log("Logged signup")
}