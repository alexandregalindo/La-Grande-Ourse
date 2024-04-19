// src/controllers/UserController.js
const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

const UserController = {
    async getAll(req, res) {
        const users = await UserService.findAll();
        res.json(users);
    },

    async getById(req, res) {
        const { id } = req.params;
        const user = await UserService.findById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    },

    async create(req, res) {
        const data = req.body;
        const user = await UserService.create(data);
        res.status(201).json(user);
    },

    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        const user = await UserService.update(id, data);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    },

    async delete(req, res) {
        const { id } = req.params;
        await UserService.delete(id);
        res.status(204).send();
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.login(email, password);
            if (!user) {
                return res.status(400).send({ message: 'Invalid credentials' });
            }
            req.session.user = user;
            const token = jwt.sign({ _id: user.Id }, 'secretkey');
            res.send({ token, name: user.Nom, role: user.Role });
        } catch (error) {
            res.status(500).send(error);
        }
    }

};

module.exports = UserController;
