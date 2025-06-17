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

app.use(express.json());
app.use('/users', userRoutes);
app.use('/api/history', historyRoutes);

app.get('/', (req, res) => {
  res.redirect('https://cloudcalcs.netlify.app');
});

// Sync database
db.sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('🚨 DB sync error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

