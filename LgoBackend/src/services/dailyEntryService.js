// services/dailyEntryService.js
const DailyEntry = require('../models/dailyEntry');
const DailyTotal = require('../models/dailyTotals'); // ajuste para o caminho correto do seu modelo

const dailyEntryService = {

  async getDailyEntryMontantByDate(date) {
    let dailyEntryMontant = 0;
    const dailyEntries = await DailyEntry.findAll({ where: { Date: date } });
    const listDailyEntry = dailyEntries.map(entry => entry.toJSON());

    for (let i = 0; i < listDailyEntry.length; i++) {
      dailyEntryMontant += parseFloat(listDailyEntry[i].montant);
    }

    return dailyEntryMontant;
  },

  async findAll() {
    try {
      return await DailyEntry.findAll();
    } catch (error) {
      throw error;
    }
  },

  async findByDateAndDept(date, id_dept) {
    try {
      return await DailyEntry.findOne({ where: { Date, Id_dept } });
    } catch (error) {
      throw error;
    }
  },

  async create(data) {
    try {
      return await DailyEntry.create(data);
    } catch (error) {
      throw new Error("Error creating daily entry");
    }
  },

  async updateByDateAndDept(Date, Id_dept, data) {
    const entry = await DailyEntry.findOne({ where: { Date, Id_dept } });
    if (!entry) {
      return null;
    }
    await entry.update(data);
    return entry;
  },

  async deleteByDateAndDept(Date, Id_dept) {
    const entry = await DailyEntry.findOne({ where: { Date, Id_dept } });
    if (!entry) {
      return null;
    }
    await entry.destroy();
    return true;
  },
  // dentro de dailyEntryService

  async create(data) {
    const transaction = await DailyEntry.sequelize.transaction();

    try {
      // Verificar se a data já existe em DailyTotals
      let dailyTotal = await DailyTotal.findOne({
        where: { Date: data.Date } // assumindo que 'date' está no objeto de entrada
      }, { transaction });

      if (!dailyTotal) {
        // Se não, cria uma entrada em DailyTotals apenas com a data
        // Os outros campos são deixados como nulos ou com valores padrão, se definidos no modelo
        dailyTotal = await DailyTotal.create({
          Date: data.Date // só a data é inserida, outros campos seguem o padrão do modelo
        }, { transaction });
      }

      // Criar a entrada em DailyEntry
      const newEntry = await DailyEntry.create(data, { transaction });

      // Se tudo correu bem, commit na transação
      await transaction.commit();

      return newEntry; // ou talvez { dailyTotal, newEntry } se você precisar retornar ambos

    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao criar a entrada:', error); // Isso logará o erro detalhado no console
      throw new Error(`Erro ao criar entrada: ${error.message}`);
    }
  },

};

module.exports = dailyEntryService;
