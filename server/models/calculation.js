'use strict';
// Import the base Model class from Sequelize
const { Model } = require('sequelize');

// Export the model definition function (used by Sequelize to initialize the model)
module.exports = (sequelize, DataTypes) => {
  // Define a new class that extends Sequelize's Model
  class Calculation extends Model {
    // Static method for setting up relationships (associations) with other models
    static associate(models) {
      // A Calculation belongs to a single User (foreign key: userId)
      Calculation.belongsTo(models.User, {
        foreignKey: 'userId',  // Connects to the User model's primary key
        as: 'user'             // Alias used when querying with joins (optional but helpful)
      });
    }
  }

  // Initialize the model by defining its fields (columns) and their data types
  Calculation.init({
    // Unique ID for each calculation
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,   // Automatically increment the ID
      primaryKey: true       // Marks this column as the primary key
    },
    // The actual math expression entered by the user (e.g., "5+3")
    expression: {
      type: DataTypes.STRING,
      allowNull: false       // This field is required
    },
    // The result of evaluating the expression (e.g., "8")
    result: {
      type: DataTypes.STRING,
      allowNull: false       // Also required
    },
    // References the ID of the user who performed the calculation
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false       // Every calculation must be tied to a user
    }
  }, {
    // Pass the Sequelize instance and model name
    sequelize,
    modelName: 'Calculation' // This name is used by Sequelize internally
  });

  // Return the model so Sequelize can register it
  return Calculation;
};
