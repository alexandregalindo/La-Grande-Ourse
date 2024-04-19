const Sequelize = require('sequelize');
const db = require('../config/db');
const crypto = require('crypto');

const user = db.define('User', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Nom: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    Password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        set(value) {
            const hash = crypto.createHash('sha256');
            this.setDataValue('Password', hash.update(value).digest('hex'));
        }
    },
    Role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[0, 1]]  // 0 for user, 1 for admin
        }
    }
}, {
    tableName: 'User',
    timestamps: false // Disable automatic timestamp fields
});

module.exports = user;
