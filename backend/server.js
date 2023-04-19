const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');
require("date-format-lite");
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const dotenv = require('dotenv')

const PORT = 1337;
const app = express();
const mysql = require('promise-mysql');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

