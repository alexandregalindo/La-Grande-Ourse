import axios from 'axios';

const TaxService = {
    // Récupérer tous les enregistrements de taxe pour une date donnée
    findAllByDate: async (date) => {
        const backendUrl = 'http://lagrandeourse.institutgrassetinfo.com:4081';
        const formattedDate = formatDateToYYYYMMDD(date);
        const response = await axios.get(`${backendUrl}/api/dailyTotals/${formattedDate}`);
        return response.data;
    },

    // Poster de nouvelles données de taxe
    post: async (data) => {
        const backendUrl = 'http://lagrandeourse.institutgrassetinfo.com:4081';
        const response = await axios.post(`${backendUrl}/api/dailyTotals`, data);
        return response.data;
    },

    // Autres méthodes nécessaires pour gérer les taxes...
};

function formatDateToYYYYMMDD(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
}

export default TaxService;
