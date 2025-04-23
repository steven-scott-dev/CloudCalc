'use strict';

// Load Node.js modules for working with files and paths
const fs = require('fs');
const path = require('path');

// Load Sequelize, the ORM we’re using
const Sequelize = require('sequelize');

// Get the filename of this file, used to ignore itself during the model import loop
const basename = path.basename(__filename);

// Load environment variables from .env (like DB credentials)
require('dotenv').config();

// Create an empty object that will hold all our models
const db = {};

// Create a Sequelize instance using DB credentials from .env
const sequelize = new Sequelize(
  process.env.DB_NAME,  // Database name
  process.env.DB_USER,  // DB username
  process.env.DB_PASS,  // DB password
  {
    host: process.env.DB_HOST, // DB host (usually localhost)
    dialect: 'mysql',          // Database type: mysql
    logging: false             // Turn off SQL logging in the console
  }
);

// Read all .js files in this models folder, except this file (index.js)
fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js'))
  .forEach(file => {
    // Import the model and initialize it with the sequelize instance and data types
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

    // Add the model to the db object so we can access it elsewhere in the app
    db[model.name] = model;
  });

// If any model has an association (like belongsTo or hasMany), call it now
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Pass all models so they can associate with each other
  }
});

// Add sequelize instance and Sequelize constructor to db for external use
db.sequelize = sequelize; // Sequelize connection instance
db.Sequelize = Sequelize; // Sequelize library itself (for DataTypes, etc.)

// Export everything as one object (db) so it can be used in the app
module.exports = db;
