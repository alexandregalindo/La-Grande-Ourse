// src/models/DailyTotals.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const dailyTotals = sequelize.define('DailyTotals', {
  Date: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
    allowNull: false
  },
  PO: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  TPS: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  TVQ: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  Total_Des_Departements: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  Rabais: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'DailyTotals',
  tableName: 'DailyTotals',
  timestamps: false
});

module.exports = dailyTotals;
