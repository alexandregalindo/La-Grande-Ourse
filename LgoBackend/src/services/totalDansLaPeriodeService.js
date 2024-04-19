const DailyEntry = require('../models/dailyEntry');
const DailyTotals = require('../models/dailyTotals');
const Periode = require('../models/periode.js');
const { RevenuResponseDto } = require('../models/dto/revenu.dto');
const Department = require('../models/department.js');
const { Op } = require('sequelize');
const TotalDansLaPeriode = require('../models/totalDansLaPeriode.js');

class TotalDansLaPeriodeService {

    async updateCumulatFromYear(departmentId, dateDebut) {
        const searchYear = parseInt(dateDebut.split('-')[0]);
        const periode = await Periode.findOne({
            where: {
                Année: searchYear,
                TypePeriode: 'Anuelle'
            }
        });

        const montantTotal = await DailyEntry.sum('montant', {
            where: {
                id_dept: departmentId,
                Date: {
                    [Op.between]: [new Date(searchYear.toString() + '-01-01T00:00:00'), new Date(searchYear + '-12-31T23:59:59')]
                }
            }
        });

        if (montantTotal != null) {
            const idPeriode = periode.dataValues.IdPeriode;

            await TotalDansLaPeriode.update({ Totalization: montantTotal },
                {
                    where: {
                        IdPeriode: idPeriode,
                        TypedeLigne: departmentId.toString()
                    }
                });
        }

        return montantTotal;
    }

    async TotalDansPeriode(dateDebut) {
        const departments = await Department.findAll();

        const endDate = new Date(dateDebut);
        endDate.setDate(endDate.getDate() + 7); // Adding 7 days to get the end date

        let dailyEntries = await DailyEntry.findAll({
            where: {
                Date: {
                    [Op.between]: [dateDebut, endDate]
                }
            }
        });
        const listDailyEntry = dailyEntries.map(entry => entry.toJSON());
        let ret = [];

        for (let i = 0; i < departments.length; i++) {
            const departmentDailyEntrys = listDailyEntry.filter(value => value.id_dept === departments[i].id);

            let revDto = new RevenuResponseDto({
                departmentId: departments[i].id,
                departmentName: departments[i].name
            });

            const searchYear = parseInt(dateDebut.split('-')[0]);
            const periode = await Periode.findOne({
                where: {
                    Année: searchYear,
                    TypePeriode: 'Anuelle'
                }
            });

            for (let j = 0; j < departmentDailyEntrys.length; j++) {
                const [year, month, day] = departmentDailyEntrys[j].Date.split('-').map(Number);
                const dateObject = new Date(year, month - 1, day); // Month is 0-indexed, so we subtract 1
                const dayIndex = new Date(dateObject).getDay();

                switch (dayIndex) {
                    case 0: // Sunday
                        revDto.dimanche = parseFloat(departmentDailyEntrys[j].montant);
                        break;
                    case 1: // Monday
                        // She doesn't work on Mondays
                        break;
                    case 2: // Tuesday
                        revDto.mardi = parseFloat(departmentDailyEntrys[j].montant);
                        break;
                    case 3: // Wednesday
                        revDto.mercredi = parseFloat(departmentDailyEntrys[j].montant);
                        break;
                    case 4: // Thursday
                        revDto.jeudi = parseFloat(departmentDailyEntrys[j].montant);
                        break;
                    case 5: // Friday
                        revDto.vendredi = parseFloat(departmentDailyEntrys[j].montant);
                        break;
                    case 6: // Saturday
                        revDto.samedi = parseFloat(departmentDailyEntrys[j].montant);
                        break;
                }

                revDto.sousTot = departmentDailyEntrys.reduce((sum, value) => sum + parseFloat(value.montant), 0);

                const cumulat = await TotalDansLaPeriode.findOne({
                    where: {
                        TypedeLigne: departments[i].id,
                        IdPeriode: periode.dataValues.IdPeriode
                    }
                });

                revDto.cumulat = parseFloat(cumulat.dataValues.Totalization);
            }

            ret.push(revDto);
        }

        return ret;
    }


    async ChangeValueFromDayOfWeek(departmentId, queryDate, dayOfWeek, newValue) {
        let dayIndex = null;

        switch (dayOfWeek) {
            case 'dimanche': // Sunday
                dayIndex = 0;
                break;
            case 'lundi': // Monday
                // She doesn't work on Mondays
                break;
            case 'mardi': // Tuesday
                dayIndex = 2;
                break;
            case 'mercredi': // Wednesday
                dayIndex = 3;
                break;
            case 'jeudi': // Thursday
                dayIndex = 4;
                break;
            case 'vendredi': // Friday
                dayIndex = 5;
                break;
            case 'samedi': // Saturday
                dayIndex = 6;
                break;
        }

        const dtCurrentDate = new Date(queryDate);
        const currentDay = dtCurrentDate.getDay();
        const daysUntilNextDay = (dayIndex + 7 - currentDay) % 7;
        dtCurrentDate.setDate(dtCurrentDate.getDate() + daysUntilNextDay);

        const year = dtCurrentDate.getFullYear();
        const month = String(dtCurrentDate.getMonth() + 1).padStart(2, '0');
        const day = String(dtCurrentDate.getDate()).padStart(2, '0');
        const currentDate = `${year}-${month}-${day}`;

        let dailyEntry = await DailyEntry.findOne({
            where: {
                id_dept: departmentId,
                Date: currentDate
            }
        });

        if (dailyEntry != null) {
            await DailyEntry.update({ montant: parseFloat(newValue) },
                {
                    where: {
                        id_dept: departmentId,
                        Date: currentDate
                    }
                });
        } else {

            let dailyTotal = await DailyTotals.findOne({ where: { Date: currentDate } });
            if (dailyTotal == null) {
                dailyTotal = {
                    Date: currentDate,
                    PO: 0,
                    TPS: 0,
                    TVQ: 0,
                    Total_Des_Departements: 0,
                    Rabais: 0
                };
                await DailyTotals.create(dailyTotal);
            }
            dailyEntry = {
                Date: currentDate,
                id_dept: departmentId,
                montant: parseFloat(newValue)
            };
            try {
                await DailyEntry.create(dailyEntry);
            } catch { }

        }
    }
}

module.exports = new TotalDansLaPeriodeService();