// DepartmentSummaryCalculator.js

class DepartmentSummaryCalculator {
    constructor() {
      this.departmentData = {}; // Objeto para armazenar os dados do departamento
    }
  
    // Adicionar um valor de entrada para um departamento em uma data específica
    addEntry(department, date, mainValue, tvq, tps, po) {
      if (!this.departmentData[department]) {
        this.departmentData[department] = [];
      }
  
      this.departmentData[department].push({
        date,
        mainValue,
        tvq,
        tps,
        po,
      });
    }
  
    // Calcular o total semanal de um departamento
    // Calcular o total do dia de um departamento
    calculateDailyTotal(department, date) {
      if (!this.departmentData[department]) {
        return 0; // Não há dados para o departamento
      }
      
      // Filtra as entradas pelo departamento e data fornecidos
      const entriesForTheDay = this.departmentData[department].filter(entry => {
        return entry.date === date;
      });
      
      // Calcula o total do dia somando os valores
      const dailyTotal = entriesForTheDay.reduce((total, entry) => {
        return total + entry.mainValue + entry.tvq + entry.tps + entry.po;
      }, 0);
      
      return dailyTotal;
    }

    calculateDailyTotal(date) {
      let dailyTotal = 0;
      
      // Itera sobre todos os departamentos
      for (let department in this.departmentData) {
        // Filtra as entradas pela data fornecida
        const entriesForTheDay = this.departmentData[department].filter(entry => {
          return entry.date === date;
        });
        
        // Calcula o total do dia para o departamento atual e acumula no total geral
        dailyTotal += entriesForTheDay.reduce((total, entry) => {
          return total + entry.mainValue + entry.tvq + entry.tps + entry.po;
        }, 0);
      }

      return dailyTotal;
    }


    
}

module.exports = DepartmentSummaryCalculator;