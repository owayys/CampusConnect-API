const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'IstudyIn8',
    database: 'CampusConnect'
});

// try {
//     connection.connect(() => {
//         console.log("Connected to MySQL!")
//     })
// } catch(err) {
//     console.log(`MySQL connection failed: ${err}`)
// }

module.exports = connection
