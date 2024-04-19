// src/routes/dailyEntryRoutes.js

const express = require('express');
const router = express.Router();
const dailyEntryController = require('../controllers/dailyEntryController');

// Criar uma entrada
router.post('/', dailyEntryController.create);

// Listar todas as entradas
router.get('/', dailyEntryController.listAllEntries);

// Obter uma entrada por data e departamento
router.get('/:date/:id_dept', dailyEntryController.getEntryByDateAndDept);

// Criar uma entrada (parece duplicado com o primeiro POST, você pode querer remover um deles)
router.post('/', dailyEntryController.createEntry);

// Atualizar uma entrada pelo ID
router.put('/:id', dailyEntryController.updateById);

// Deletar uma entrada pelo ID
router.delete('/:id', dailyEntryController.deleteById);

router.get('/getDailyEntryMontantByDate', dailyEntryController.getDailyEntryMontantByDate);

module.exports = router;
