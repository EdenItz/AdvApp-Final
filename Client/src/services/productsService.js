import axios from 'axios';
import _ from 'lodash';
import { api } from '../globals';

// Add New Product
export const addProduct = newProduct => {
    return axios.post(`${api}/products`, newProduct, {
        headers: {
            Authorization: `${sessionStorage.getItem('token')}`,
        },
    });
};

// Get All Products
export const getAllProducts = () => {
    return axios.get(`${api}/product`);
};

// Get product by ID
export const getProductById = id => {
    return axios.get(`${api}/product/${id}`);
};

// Edit Products
export const editProduct = product => {
    let body = _.omit(product, ['_id']);
    return axios.put(`${api}/product/${product._id}`, body, {
        headers: { Authorization: `${sessionStorage.getItem('token')}` },
    });
};

// Delete Product
export const deleteProduct = product => {
    return axios.delete(`${api}/product/${product._id}`, {
        headers: { Authorization: `${sessionStorage.getItem('token')}` },
    });
};
