import axios from 'axios';
import { api } from '../globals';

// Get All Categorys
export const getAllCategories = () => {
    return axios.get(`${api}/category`);
};
