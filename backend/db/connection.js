const mysql = require("mysql");

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password 
    password: '',
    database: 'rangeTest_db'
  });

module.exports = db;