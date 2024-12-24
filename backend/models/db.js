// Import the mysql2 package
const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',       
  user: 'root',   
  password: 'Dakshata@2023', 
  database: 'quickservice' 
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;
