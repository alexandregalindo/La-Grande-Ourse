
import axios from 'axios';

const RevenuService = {
    findAll: async (dateDebut) => {
        const backendUrl = 'http://lagrandeourse.institutgrassetinfo.com:4081';
        const dateDebutParam = formatDateToYYYYMMDD(dateDebut);
        const response = await axios.get(`${backendUrl}/api/totaldanslaperiode/TotalDansPeriode?dateDebut=${dateDebutParam}`);
        return response.data;
    },
    upsertRevenu: async (departmentId, queryDate, dayOfWeek, newValue) => {
        const backendUrl = 'http://lagrandeourse.institutgrassetinfo.com:4081';
        const updateData = {
            'departmentId': departmentId,
            'queryDate': queryDate,
            'dayOfWeek': dayOfWeek,
            'newValue': newValue
        };

        await axios.post(`${backendUrl}/api/totaldanslaperiode/ChangeValueFromDayOfWeek`, updateData);
        return null;
    },
    updateTotalDesDepartements: async (date, totalDesDepartements) => {
        const backendUrl = 'http://lagrandeourse.institutgrassetinfo.com:4081';
        const updateData = {
            'date': date,
            'totalDesDepartements': totalDesDepartements
        };

        await axios.post(`${backendUrl}/api/dailyTotals/updateTotalDesDepartements`, updateData);
        return null;
    },
    getDailyEntryMontantByDate: async (date) => {
        const backendUrl = 'http://lagrandeourse.institutgrassetinfo.com:4081';
        const dateParam = formatDateToYYYYMMDD(date);
        const response = await axios.get(`${backendUrl}/api/dailyEntry/getDailyEntryMontantByDate?date=${dateParam}`);
        return response.data.dailyEntryMontant;
    },
    updateCumulatFromYear: async (departmentId, dateDebut) => {
        const backendUrl = 'http://lagrandeourse.institutgrassetinfo.com:4081';
        const dateDebutParam = formatDateToYYYYMMDD(dateDebut);
        const updateData = {
            'departmentId': departmentId,
            'dateDebut': dateDebutParam
        };

        const response = await axios.post(`${backendUrl}/api/totalDansLaPeriode/updateCumulatFromYear`, updateData);
        return response.data.cumulat;
    }
};

function formatDateToYYYYMMDD(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so +1 and pad with a '0' if needed
    const dd = String(date.getDate()).padStart(2, '0');      // Pad with a '0' if needed

    return `${yyyy}-${mm}-${dd}`;
}




export default RevenuService;
