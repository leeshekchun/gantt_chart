const mysql = require("mysql");

// // Connect to database
// const db = mysql.createConnection({
//     host: process.env.HOST || "localhost",
//     // Input your MySQL username,
//     user: process.env.USER,
//     // Input your MySQL password 
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
//   });

  const db = mysql.createConnection({
    host: 'localhost',
    // Input your MySQL username,
    user: 'root',
    // Input your MySQL password 
    password: '1996111Nov',
    database: 'rangeTest_db'
  });

module.exports = db;