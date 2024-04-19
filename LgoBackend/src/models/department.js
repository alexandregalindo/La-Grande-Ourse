// src/models/Department.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajuste o caminho conforme necessário para o seu arquivo de configuração do Sequelize

const department = sequelize.define('Department', {
  // Model attributes correspond to the columns in the 'tb_department' table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options
  sequelize, // We need to pass the connection instance
  modelName: 'Department', // We need to choose the model name


  tableName: 'Departements',// If the table name is different than the model name


  timestamps: false, // If you don't have the 'createdAt' and 'updatedAt' columns in your table
  underscored: true, // if you have snake_case column names, it will use that as the default naming strategy
});

module.exports = department;
