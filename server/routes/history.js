const express = require('express');
const router = express.Router();
const { Calculation } = require('../models');
const authenticateToken = require('../middleware/auth');

// POST /api/history
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { expression, result } = req.body;
    const newCalc = await Calculation.create({ expression, result, userId: req.user.UserId });
    res.status(201).json(newCalc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save calculation' });
  }
});

// GET /api/history
router.get('/', authenticateToken, async (req, res) => {
  try {
    const history = await Calculation.findAll({
      where: { userId: req.user.UserId },
      order: [['createdAt', 'DESC']]
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
});

module.exports = router;