// Load Express so we can create routes
const express = require('express');
// Create a new router instance
const router = express.Router();

// Import the Calculation model (represents the "calculations" table)
const { Calculation } = require('../models');

// Import middleware that checks if a user is authenticated
const authenticateToken = require('../middleware/auth');

// --------------------------------------
// POST /api/history
// Save a new calculation to the database
// --------------------------------------
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Get expression and result from the request body (sent by frontend)
    const { expression, result } = req.body;

    // Save the new calculation to the database, tied to the current user
    const newCalc = await Calculation.create({
      expression,             // what the user typed
      result,                 // the answer
      userId: req.user.id     // comes from the decoded JWT token
    });

    // Respond with the new calculation (created successfully)
    res.status(201).json(newCalc);
  } catch (err) {
    // If something goes wrong, show it in the console and send an error
    console.error('Error saving calculation:', err);
    res.status(500).json({ error: 'Failed to save calculation' });
  }
});

// --------------------------------------
// GET /api/history
// Get all calculations for the current user
// --------------------------------------
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Look up all calculations that belong to the user
    const history = await Calculation.findAll({
      where: { userId: req.user.id },            // Only this user's history
      order: [['createdAt', 'DESC']]             // Most recent first
    });

    // Return the history as JSON
    res.json(history);
  } catch (err) {
    // If something goes wrong, log it and send error
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
});

// Export this router so it can be used in the main server file
module.exports = router;
