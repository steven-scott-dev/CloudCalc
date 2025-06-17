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

// Ensure JWT secret exist
