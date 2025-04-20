'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // A User has many Calculations
      User.hasMany(models.Calculation, {
        foreignKey: 'userId',
        as: 'calculations',
        onDelete: 'CASCADE'
      });
    }
  }

  User.init({
    UserId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  return User;
};
