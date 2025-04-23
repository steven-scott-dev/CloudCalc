'use strict';
// Import Sequelize's Model class so we can extend it
const { Model } = require('sequelize');

// Export a function that initializes the User model
module.exports = (sequelize, DataTypes) => {

  // Create a new class for the User model
  class User extends Model {
    // Define model associations (relationships with other models)
    static associate(models) {
      // One user can have many calculations
      User.hasMany(models.Calculation, {
        foreignKey: 'userId',       // This connects to the 'userId' in the Calculation model
        as: 'calculations',         // Alias for referencing user’s calculations
        onDelete: 'CASCADE'         // If a user is deleted, their calculations are too
      });
    }
  }

  // Initialize the fields/columns for the User model
  User.init({
    // Primary key: unique ID for each user
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,         // Automatically increase with each new user
      primaryKey: true             // This is the primary identifier
    },
    // Username field (must be unique and not null)
    username: {
      type: DataTypes.STRING,
      allowNull: false,            // Required
      unique: true                 // No two users can have the same username
    },
    // Email field (must be unique and not null)
    email: {
      type: DataTypes.STRING,
      allowNull: false,            // Required
      unique: true                 // No duplicate emails allowed
    },
    // Password field (hashed before storing, required)
    password: {
      type: DataTypes.STRING,
      allowNull: false             // Required
    }
  }, {
    sequelize,                     // Pass the Sequelize connection instance
    modelName: 'User'              // Name the model for Sequelize's internal use
  });

  // Return the model to be available in other parts of the app
  return User;
};
