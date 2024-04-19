// controllers/dailyEntryController.js
const dailyEntryService = require('../services/dailyEntryService');

const dailyEntryController = {

  async getDailyEntryMontantByDate(req, res) {
    const date = req.query.date;
    const dailyEntryMontant = await dailyEntryService.getDailyEntryMontantByDate(date);
    res.status(200).json({ "dailyEntryMontant": dailyEntryMontant });
  },

  async create(req, res) {
    try {
      const newEntry = await dailyEntryService.create(req.body);
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async listAllEntries(req, res) {
    try {
        const entries = await dailyEntryService.findAll();
        res.json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
  },
  async getEntryByDateAndDept(req, res) {
    const { date, id_dept } = req.params;
    try {
        const entry = await dailyEntryService.findByDateAndDept(date, id_dept);
        if (entry) {
            res.json(entry);
        } else {
            res.status(404).send('Entry not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
  },
  async createEntry(req, res) {
    try {
        const entry = await dailyEntryService.create(req.body);
        res.status(201).json(entry);
    } catch (error) {
        res.status(500).send(error.message);
    }
  },

  async updateById(req, res) {
    const id = req.params.id;
    const updatedData = req.body;
    try {
      const updatedEntry = await dailyEntryService.updateById(id, updatedData);
      if (!updatedEntry) {
        res.status(404).json({ message: 'Registro não encontrado' });
        return;
      }
      res.json(updatedEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteById(req, res) {
    const id = req.params.id;
    try {
      const result = await dailyEntryService.deleteById(id);
      if (!result) {
        res.status(404).json({ message: 'Registro não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = dailyEntryController;
