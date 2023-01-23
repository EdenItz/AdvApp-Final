import axios from 'axios';
import _ from 'lodash';
import { api } from '../globals';

// ADD PRODUCT TO CART
export const addToUserCart = (product, token) => {
    let body = _.omit(product, [
        '_id',
        '__v',
        'inStock',
        'hot',
        'rate',
        'productSize',
    ]);
    return axios.post(`${api}/carts`, body, {
        headers: { Authorization: `${token}` },
    }, {withCredentials: true});
};

// GET ALL
export const getProductsInCart = (token) => {
    return axios.get(`${api}/carts`, {
        headers: {
            Authorization: `${token}`,
        },
    }, {withCredentials: true});
};

// DELETE PRODUCT FROM CART
export const deleteProductFromCart = (product, token) => {
    return axios.delete(`${api}/carts/delete-product/${product.productId}`, {
        headers: { Authorization: `${token}` },
    }, {withCredentials: true});
};

// DELETE ALL PRODUCTS FROM CART
export const deleteProducts = (cart, token) => {
    return axios.put(`${api}/carts`, cart, {
        headers: {
            Authorization: `${token}`,
        },
    }, {withCredentials: true});
};
