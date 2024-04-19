// src/services/UserService.js
const crypto = require('crypto');
const User = require('../models/user');

const UserService = {
    async findAll() {
        return await User.findAll();
    },

    async findById(id) {
        return await User.findOne({ where: { id } });
    },

    async create(data) {
        return await User.create(data);
    },

    async update(id, data) {
        const user = await this.findById(id);
        if (user) {
            await user.update(data);
        }
        return user;
    },

    async delete(id) {
        const user = await this.findById(id);
        if (user) {
            await user.destroy();
        }
    },

    async login(email, password) {
        const hash = crypto.createHash('sha256');
        const hashPassowrd = hash.update(password).digest('hex');

        const user = await User.findOne({
            where: {
                Email: email,
                Password: hashPassowrd
            }
        });

        if (user) {
            return user; // Is authenticated
        }
        else
            return null; // Not authenticated 
    }

};

module.exports = UserService;
