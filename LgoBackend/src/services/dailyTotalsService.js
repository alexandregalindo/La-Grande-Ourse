// src/services/DailyTotalsService.js
const DailyTotals = require('../models/dailyTotals');

class DailyTotalsService {

  async updateTotalDesDepartements(Date, totalDesDepartements) {
    const updateData = {
      Total_Des_Departements: totalDesDepartements
    };

    await DailyTotals.update(updateData, { where: { Date: Date }});
  }

  async findAll() {
    return await DailyTotals.findAll();
  }

  async findByDate(Date) {
    return await DailyTotals.findByPk(Date);
  }

  async create(data) {
    return await DailyTotals.create(data);  
  }

  async update(Date, data) {
    const totals = await DailyTotals.findByPk(Date);
    if (!totals) {
      throw new Error('Totals for the given date not found');
    }
    await totals.update(data);
    return totals;
  }

  async delete(Date) {
    const totals = await DailyTotals.findByPk(Date);
    if (!totals) {
      throw new Error('Totals for the given date not found');
    }
    await totals.destroy();
  }
}

module.exports = new DailyTotalsService();
