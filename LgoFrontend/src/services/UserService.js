// src/services/UserService.js
import axios from 'axios';

const UserService = {
    findAll: async () => {
        const backendUrl = 'http://lagrandeourse.institutgrassetinfo.com:4081';
        const response = await axios.get(`${backendUrl}/api/user`);
        return response.data;
    }
};

export default UserService;
