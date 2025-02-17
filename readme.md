To connect a React front-end with a Node.js back-end (using GitHub for collaboration between two developers), here's a step-by-step guide that involves creating a simple login page as an example.

### Overview:
1. **Front-End (React):** A login page with user inputs (username and password).
2. **Back-End (Node.js):** An API endpoint that receives login details, validates the credentials, and returns a response.
3. **GitHub Collaboration:** Both developers will work on different parts of the application (React and Node.js) using GitHub for version control.

### Steps:

### 1. **Create the GitHub Repository:**

- Create a repository on GitHub for the project.
- Clone the repository to your local machines.
- Share the repository between both developers, giving each one access.

### 2. **Set Up Back-End (Node.js with Express):**

#### **Step 1: Initialize the Node.js project**
1. In your project folder, create a folder named `server` for the back-end.
2. Navigate into the `server` folder and run:
   ```bash
   npm init -y
   ```
   This will create a `package.json` file.

3. Install necessary dependencies:
   ```bash
   npm install express body-parser cors
   ```

#### **Step 2: Create the Login API**

Create a file `server.js` in the `server` folder.

```js
// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse JSON data

// Fake credentials (For example purpose)
const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' }
];

// Login API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

This creates a simple login route `/login`, which accepts POST requests with a `username` and `password` in the request body.

#### **Step 3: Run the Server**

In your terminal, run:
```bash
node server.js
```
Your Node.js server should now be running on `http://localhost:5000`.

### 3. **Set Up Front-End (React):**

#### **Step 1: Initialize the React App**
1. In your project folder, create a folder called `client` for the front-end.
2. Inside the `client` folder, create a new React app using `create-react-app`:
   ```bash
   npx create-react-app .
   ```

#### **Step 2: Create the Login Form**

Inside the `src` folder, create a new component `Login.js`:

```jsx
// client/src/Login.js
import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage('Login successful');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
```

#### **Step 3: Use the Login Component**

In `App.js`, import and use the `Login` component.

```jsx
// client/src/App.js
import React from 'react';
import './App.css';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
```

#### **Step 4: Run the React App**

In the terminal, inside the `client` folder, run:
```bash
npm start
```
This will start the React app, typically running on `http://localhost:3000`.

### 4. **Collaborating on GitHub**

#### **Step 1: Create Branches**
To enable collaboration, each developer should work on their own branch:
- Developer 1 can work on the back-end (`server` folder).
- Developer 2 can work on the front-end (`client` folder).

Create a branch using:
```bash
git checkout -b dev-backend  # Developer 1 for server side
git checkout -b dev-frontend  # Developer 2 for React side
```

#### **Step 2: Commit and Push Changes**

Make sure to regularly commit and push changes to GitHub:

1. After each developer makes changes, commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Implemented login API"
   git push origin dev-backend  # Developer 1
   ```

2. Once work is done in one branch, it can be merged into the main branch using pull requests.

#### **Step 3: Merge and Resolve Conflicts**

If there are any conflicts (e.g., both developers change the same file), GitHub will highlight them. Developers will need to resolve conflicts before merging.

---

### Conclusion:
- **Back-End (Node.js):** Created a simple API that handles login requests.
- **Front-End (React):** Created a login form that sends POST requests to the Node.js API.
- **GitHub Collaboration:** Two developers can work on the back-end and front-end simultaneously using branches and commits.

This basic structure can be enhanced by adding database support, authentication (JWT), and advanced error handling!