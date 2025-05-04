// Load environment variables from a .env file (like DB credentials, JWT secret, etc.)
require('dotenv').config();

// Import core modules
const express = require('express');      // Framework for building APIs
const cors = require('cors');            // Middleware to allow cross-origin requests

// Import Sequelize models (including User and Calculation)
const db = require('./models');

// Import route files
const userRoutes = require('./routes/users');
const historyRoutes = require('./routes/history');

// Create the main Express app
const app = express();

// 🔐 JWT secret is required to securely sign and verify tokens
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('⚠️  Missing JWT_SECRET in environment! Add it to your .env');
  process.exit(1); // Stop the server if no JWT secret is found
}

// 🛡️ Allow cross-origin requests (from the frontend running at localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // This allows cookies and authorization headers
}));

// Allow parsing of JSON data in incoming requests
app.use(express.json());

// Mount routes for user authentication at /users (e.g. /users/login)
app.use('/users', userRoutes);

// Mount routes for calculator history at /api/history
app.use('/api/history', historyRoutes);

app.get('/', (req, res) => {
  res.redirect('https://cloudcalc.netlify.app');
});


// 🔄 Sync the database models with MySQL
// WARNING: { force: true } will DROP and RECREATE tables every time you restart the server
db.sequelize.sync({ force: true }) // Use { alter: true } in production or remove `force`
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('🚨 DB sync error:', err));

// 🌐 Start the server on port defined in .env or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on http://localhost:${PORT}`));
