// src/controllers/TotalDansLaPeriodeController.js
const TotalDansLaPeriodeService = require('../services/totalDansLaPeriodeService');

const TotalDansLaPeriodeController = {
    async updateCumulatFromYear(req, res) {
        const { departmentId, dateDebut } = req.body;
        const cumulat = await TotalDansLaPeriodeService.updateCumulatFromYear(departmentId, dateDebut);
        res.status(200).json({"cumulat": cumulat});
    },

    // Recuperar todos os registros
    async getAll(req, res) {
        try {
            const totals = await TotalDansLaPeriodeService.findAll();
            res.json(totals);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    async calculateAndSaveTotal(req, res) {
        try {
            const { typeDeLigne, DateDebut } = req.body;
            let weeklyTotal = await TotalDansLaPeriodeService.Total_Semaine(typeDeLigne, DateDebut);
            let ret = {
                'dateDebut': DateDebut,
                'typeDeLigne': typeDeLigne,
                'weeklyTotal': weeklyTotal
            };

            res.status(200).send(ret);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    // Recuperar registro por tipo e ID da période
    async getByTypeAndPeriod(req, res) {
        try {
            const { type, periodId } = req.params;
            const total = await TotalDansLaPeriodeService.findByTypeAndPeriod(type, periodId);
            if (total) {
                res.json(total);
            } else {
                res.status(404).send('Total not found');
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    // Criar novo registro
    async create(req, res) {
        try {
            const totalData = req.body;
            const newTotal = await TotalDansLaPeriodeService.create(totalData);
            res.status(201).json(newTotal);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    // Atualizar um registro
    async update(req, res) {
        try {
            const { type, periodId } = req.params;
            const totalData = req.body;
            const updatedTotal = await TotalDansLaPeriodeService.update(type, periodId, totalData);
            if (updatedTotal) {
                res.json(updatedTotal);
            } else {
                res.status(404).send('Total not found');
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    // Excluir um registro
    async delete(req, res) {
        try {
            const { type, periodId } = req.params;
            await TotalDansLaPeriodeService.delete(type, periodId);
            res.status(204).send();
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    async TotalDansPeriode(req, res) {
        try {
            const dateDebut = req.query.dateDebut;
            const revenus = await TotalDansLaPeriodeService.TotalDansPeriode(dateDebut);

            res.status(200).send(revenus);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async ChangeValueFromDayOfWeek(req, res) {
        try {
            const { departmentId, queryDate, dayOfWeek, newValue } = req.body;
            await TotalDansLaPeriodeService.ChangeValueFromDayOfWeek(departmentId, queryDate, dayOfWeek, newValue);
            res.status(200).send();
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
};

module.exports = TotalDansLaPeriodeController;
