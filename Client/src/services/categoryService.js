import axios from 'axios';
const api = 'http://localhost:3000/api/';

// Get All Categorys
export const getAllCategories = () => {
    return axios.get(`${api}category`);
};
