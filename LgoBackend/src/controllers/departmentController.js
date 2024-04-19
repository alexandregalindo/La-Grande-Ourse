// departmentController.js

const DepartmentService = require('../services/departmentService'); // Caminho para o seu serviço
//const Department = require('../models/department'); // Caminho para o seu modelo

const departmentController = {
    async listAllDepartments(req, res) {
    	try {
            const departments = await DepartmentService.findAll();
           res.json(departments);
        } catch (error) {
           console.error(error); // Adicione isto para ver o erro específico no console do servidor.
            res.status(500).send(error.message);
        }
        
    },


    async getDepartmentById(req, res) {
        const id = req.params.id;
        try {
            const department = await DepartmentService.getDepartmentById(id);
            if (department) {
                res.json(department);
            } else {
                res.status(404).send('Department not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    },

    async createDepartment(req, res) {
        try {
            const department = await DepartmentService.create(req.body); // Use DepartmentService.create em vez de createDepartment
            res.status(201).json(department);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async updateDepartment(req, res) {
        const id = req.params.id;
        try {
            const updatedDepartment = await DepartmentService.updateDepartment(id, req.body);
            if (updatedDepartment) {
                res.json(updatedDepartment);
            } else {
                res.status(404).send('Department not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    },

    async deleteDepartment(req, res) {
        const id = req.params.id;
        try {
            // Converte o ID para número, se necessário
            const departmentId = parseInt(id);

            // Chama o método deleteDepartment do seu serviço
            const deleted = await DepartmentService.deleteDepartment(departmentId);

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).send('Department not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    }



};

module.exports = departmentController;
