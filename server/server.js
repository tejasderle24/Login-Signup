const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./server/db'); // Import the MySQL connection

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Login API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query to find user by username
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length > 0) {
      // User found, now compare the password
      const isMatch = await bcrypt.compare(password, rows[0].password);

      if (isMatch) {
        // Password matches
        res.status(200).json({
          message: 'Login successful',
          user: { id: rows[0].id, username: rows[0].username },
        });
      } else {
        // Password mismatch
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      // User not found
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Signup API
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const [existingUser] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Insert new user into the database with plain password (not recommended for production)
    const [result] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

    // Send response with user details excluding the password
    res.status(201).json({ message: 'User registered successfully', user: { username, userId: result.insertId } });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
