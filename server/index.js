const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
const userRoutes = require('./routes/users');
const historyRoutes = require('./routes/history');

dotenv.config();

const app = express(); // ✅ only one app

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/api/history', historyRoutes);

// Sync DB and start server
db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
});
