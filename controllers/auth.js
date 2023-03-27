exports.userLogin = (req, res) => {
    const {email, password} = req.body

    con.query(`SELECT password FROM students WHERE email='${email}'`, (err, results) => {
        if (err) throw err;
        else {
            console.log(results)
            if (results.length === 0) {
                res.send(401)
            }
            else if (!results[0]) {
                res.send(401)
            }
            else {
                const hashed_password = eval(`results[0].${temp_string}pass`);
                bcrypt.compare(password, hashed_password, (err, comp_result) => {
                    if (comp_result) {
                        res.send(200)
                    }
                    else res.send(401)
                })
            }
        }
    });

    console.log("Logged login")
}

exports.userSignup = (req, res) => {
    const {username, email, password} = req.body
    
    bcrypt.hash(password, 10, (err, hashed_password) => {
        if (err) throw err;
        con.query(`INSERT INTO students (username,email,password) VALUES ('${username}','${email}','${hashed_password}')`, (err, result) => {
            if (err) console.log(err);
            res.send(200);
        });
    })

    console.log("Logged signup")
}