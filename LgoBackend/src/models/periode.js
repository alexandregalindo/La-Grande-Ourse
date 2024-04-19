const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const periode = sequelize.define('Periode', {
    IdPeriode: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    TypePeriode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DateDebut: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    Mois: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Trimestre: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Année: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'Année'
    }
}, {
    sequelize,
    modelName: 'Periode',
    tableName: 'Periode',
    timestamps: false,
});

module.exports = periode;
