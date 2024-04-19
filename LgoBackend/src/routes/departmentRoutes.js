const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// A rota para obter todos os departamentos
router.get('/', departmentController.listAllDepartments);

// A rota para obter um departamento por ID
router.get('/:id', departmentController.getDepartmentById);

// A rota para criar um novo departamento
router.post('/', departmentController.createDepartment);

// A rota para atualizar um departamento
router.put('/:id', departmentController.updateDepartment);

// A rota para deletar um departamento
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
