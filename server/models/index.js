'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

// Load environment variables if needed
require('dotenv').config();

const db = {};

// ✅ Use SQLite instead of MySQL
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './cloudcalc.sqlite',
  logging: false // Optional: turns off SQL query logging
});

// Automatically import all models in the current folder (except this file)
fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Run associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
