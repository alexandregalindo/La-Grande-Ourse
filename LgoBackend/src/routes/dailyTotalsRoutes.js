// src/routes/dailyTotalsRoutes.js
const express = require('express');
const router = express.Router();
const DailyTotalsController = require('../controllers/dailyTotalsController');

router.get('/', DailyTotalsController.getAll);
router.get('/:date', DailyTotalsController.getByDate);
router.post('/', DailyTotalsController.create);
router.put('/:date', DailyTotalsController.update);
router.delete('/:date', DailyTotalsController.delete);
router.post('/updateTotalDesDepartements', DailyTotalsController.updateTotalDesDepartements);

module.exports = router;
