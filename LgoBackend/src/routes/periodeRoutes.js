const express = require('express');
const router = express.Router();
const periodeController = require('../controllers/periodeController');

router.get('/', periodeController.listAllPeriodes);
router.get('/:id', periodeController.getPeriodeById);
router.post('/', periodeController.createPeriode);
router.put('/:id', periodeController.updatePeriode);
router.delete('/:id', periodeController.deletePeriode);

module.exports = router;
