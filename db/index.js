const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'IstudyIn8',
    database: 'CampusConnect'
});

module.exports = connection
