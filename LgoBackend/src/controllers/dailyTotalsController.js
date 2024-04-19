// src/controllers/DailyTotalsController.js
const DailyTotalsService = require('../services/dailyTotalsService');

const DailyTotalsController = {

  async updateTotalDesDepartements(req, res) {
    const { date, totalDesDepartements } = req.body;
    await DailyTotalsService.updateTotalDesDepartements(date, totalDesDepartements);

    res.status(200).send();
  },

  async getAll(req, res) {
    const totals = await DailyTotalsService.findAll();
    res.json(totals);
  },

  async getByDate(req, res) {
    const date = req.params.date;
    const totals = await DailyTotalsService.findByDate(date);
    if (totals) {
      res.json(totals);
    } else {
      res.status(200).send([]);
    }
  },

  async create(req, res) {
    const data = req.body;
    const totals = await DailyTotalsService.create(data);
    res.status(201).json(totals);
  },

  async update(req, res) {
    const date = req.params.date;
    const data = req.body;
    try {
      const updatedTotals = await DailyTotalsService.update(date, data);
      res.json(updatedTotals);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
  async delete(req, res) {
    try {
      const date = req.params.date;
      await DailyTotalsService.delete(date);
      res.status(200).send('Totals for the given date deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

};

module.exports = DailyTotalsController;
