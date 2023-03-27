const mysql = require('mysql');

var connection = mysql.createConnection({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    database: process.env.database
});

try {
    connection.connect(() => {
        console.log("Connected to MySQL!")
    })
} catch(err) {
    console.log(`MySQL connection failed: ${err}`)
}
