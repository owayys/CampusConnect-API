var connection = require('../db/index');
const bcrypt = require('bcrypt');

exports.userLogin = (req, res) => {
    const {email, password} = req.body

    const id = parseInt(email.slice(0, 8));

    connection.query(`SELECT password FROM students WHERE s_id='${id}'`, (err, results) => {
        if (err) throw err;
        else {
            console.log(results)
            if (results.length === 0) {
                res.sendStatus(401)
            }
            else if (!results[0]) {
                res.sendStatus(401)
            }
            else {
                const hashed_password = eval(`results[0].password`);
                bcrypt.compare(password, hashed_password, (err, comp_result) => {
                    if (comp_result) {
                        res.sendStatus(200)
                    }
                    else res.sendStatus(401)
                })
            }
        }
    });

    console.log("Logged login")
}

exports.userSignup = (req, res) => {
    const {username, email, password} = req.body

    const id = parseInt(email.slice(0, 8));

    bcrypt.hash(password, 10, (err, hashed_password) => {
        if (err) throw err;
        connection.query(`INSERT INTO students (s_name,s_id,password) VALUES ('${username}','${id}','${hashed_password}')`, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.sendStatus(401)
                }
                else {
                    throw err;
                }
            }
            else {
                res.sendStatus(200);
            }
        });
    })

    console.log("Logged signup")
}