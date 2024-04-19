// src/models/TotalDansLaPeriode.js
const Sequelize = require('sequelize');
const db = require('../config/db');
const Periode = require('../models/periode');

const totalDansLaPeriode = db.define('TotalDansLaPeriode', {
    TypedeLigne: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    IdPeriode: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: Periode,
            key: 'IdPeriode'
        }
    },
    Totalization: {
        type: Sequelize.DECIMAL(10, 2)
    }
}, {
    tableName: 'TotalDansLaPeriode', // Adicione essa linha
    timestamps: false // Adicione essa linha se você não tiver os campos createdAt e updatedAt na tabela.
});

module.exports = totalDansLaPeriode;
