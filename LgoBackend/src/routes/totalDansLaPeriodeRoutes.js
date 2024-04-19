// src/routes/totalDansLaPeriodeRoutes.js
const express = require('express');
const router = express.Router();
const TotalDansLaPeriodeController = require('../controllers/totalDansLaPeriodeController');

router.get('/', TotalDansLaPeriodeController.getAll);
router.get('/:type/:periodId', TotalDansLaPeriodeController.getByTypeAndPeriod);
router.post('/', TotalDansLaPeriodeController.create);
router.put('/:type/:periodId', TotalDansLaPeriodeController.update);
router.post('/calcTotal', TotalDansLaPeriodeController.calculateAndSaveTotal);
router.get('/TotalDansPeriode', TotalDansLaPeriodeController.TotalDansPeriode);
router.post('/ChangeValueFromDayOfWeek', TotalDansLaPeriodeController.ChangeValueFromDayOfWeek);
router.post('/updateCumulatFromYear', TotalDansLaPeriodeController.updateCumulatFromYear);
router.delete('/:type/:periodId', TotalDansLaPeriodeController.delete);

module.exports = router;
