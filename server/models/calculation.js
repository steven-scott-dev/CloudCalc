'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Calculation extends Model {
    static associate(models) {
      // Each Calculation belongs to one User
      Calculation.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Calculation.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    expression: {
      type: DataTypes.STRING,
      allowNull: false
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Calculation'
  });

  return Calculation;
};
