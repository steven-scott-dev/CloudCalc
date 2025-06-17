require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/users');
const historyRoutes = require('./routes/history');

const app = express();


const allowedOrigins = [
  'https://cloudcalcs.netlify.app',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // <-- Handles preflight correctly


// Middlewares
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/api/history', historyRoutes);

app.get('/', (req, res) => {
  res.redirect('https://cloudcalcs.netlify.app');
});

// Sync DB
db.sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('🚨 DB sync error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
