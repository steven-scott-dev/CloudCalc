// Load environment variables from a .env file
require('dotenv').config();

// Core modules
const express = require('express');
const cors = require('cors');

// Sequelize models (DB)
const db = require('./models');

// Routes
const userRoutes = require('./routes/users');
const historyRoutes = require('./routes/history');

// Create the app
const app = express();

// ✅ CORS setup
const allowedOrigins = [
  'http://localhost:3000',
  'https://cloudcalcs.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Optional: Allow preflight OPTIONS requests
app.options('*', cors());
// Ensure JWT secret exist
