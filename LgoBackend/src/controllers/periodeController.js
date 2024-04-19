const PeriodeService = require('../services/periodeService');

const periodeController = {
    async listAllPeriodes(req, res) {
        try {
            const periodes = await PeriodeService.findAll();
            res.json(periodes);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getPeriodeById(req, res) {
        const id = req.params.id;
        try {
            const periode = await PeriodeService.findById(id);
            if (periode) {
                res.json(periode);
            } else {
                res.status(404).send('Periode not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async createPeriode(req, res) {
        try {
            const periode = await PeriodeService.create(req.body);
            res.status(201).json(periode);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async updatePeriode(req, res) {
        const id = req.params.id;
        try {
            const updatedPeriode = await PeriodeService.updateById(id, req.body);
            if (updatedPeriode) {
                res.json(updatedPeriode);
            } else {
                res.status(404).send('Periode not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async deletePeriode(req, res) {
        const id = req.params.id;
        try {
            const deleted = await PeriodeService.deleteById(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).send('Periode not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = periodeController;
