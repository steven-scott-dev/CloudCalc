// Import required libraries
const express = require('express');
const bcrypt = require('bcrypt');                // For hashing passwords
const jwt = require('jsonwebtoken');             // For creating tokens
const router = express.Router();                 // Create a new router instance
const db = require('../models');                 // Import all Sequelize models

// --------------------------------------
// POST /users/signup
// Create a new user account
// --------------------------------------
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation: check that all fields are filled
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if there's already a user with the same email
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const user = await db.User.create({
      username,
      email,
      password: hashedPassword
    });

    // Create a JWT token with the user ID as payload
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d' // Token valid for 1 day
    });

    // Send the token and user info back to the client
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// --------------------------------------
// POST /users/login
// Log a user in and return a token
// --------------------------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Make sure both fields are filled
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password entered with the hashed one in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // If all checks pass, create a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d' // Token valid for 1 day
    });

    // Send the token and user info back
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Export this router so it can be used in the server
module.exports = router;
