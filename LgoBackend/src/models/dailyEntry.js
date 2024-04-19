// src/models/DailyEntry.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const dailyEntry = sequelize.define('DailyEntry', {
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    primaryKey: true
  },
  id_dept: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Department',
      key: 'id'
    }
  },
  montant: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'DailyEntry',
  tableName: 'DailyEntry',
  timestamps: false,
  underscored: true,
});

module.exports = dailyEntry;
