// src/services/DepartmentService.js
const Department = require('../models/department'); // ajuste o caminho se necessário

class DepartmentService {
  
  // buscar todos os departamentos
  async findAll() {
    try {
      return await Department.findAll();
    } catch (error) {
      throw error;
    }
  }

  // buscar um departamento pelo ID
  async findById(id) {
    try {
      return await Department.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  // criar um novo departamento
  async create(departmentData) {
    try {
      return await Department.create(departmentData);
    } catch (error) {
      throw error;
    }
  }

  // atualizar um departamento
  async updateDepartment(id, departmentData) {
    try {
      const department = await Department.findByPk(id);
      if (!department) {
        throw new Error('Department not found');
      }
      await department.update(departmentData);
      return department;
    } catch (error) {
      throw error;
    }
  }

  // excluir um departamento
  async deleteDepartment(id) {
    try {
      const department = await Department.findByPk(id);
      if (!department) {
        throw new Error('Department not found');
      }
      await department.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new DepartmentService();
