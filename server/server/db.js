// server/db.js
const mysql = require('mysql2');

// Create a connection to the database
const pool = mysql.createPool({
  host: 'localhost',      // MySQL host (localhost if running locally)
  user: 'root',           // Your MySQL username
  password: 'Tejas@123', // Your MySQL password
  database: 'login_signup',      // The database to use
});

// Export the pool to be used in other files
module.exports = pool.promise();
