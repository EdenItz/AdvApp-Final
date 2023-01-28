import axios from 'axios';
import _ from 'lodash';
import { api } from '../globals';

// ADD PRODUCT TO CART
export const addToUserCart = (product, token, userId) => {
    let body = _.omit(product, [
        '_id',
        '__v',
        'inStock',
        'hot',
        'rate',
        'productSize',
    ]);

    return axios.post(
        `${api}/carts`,
        body,
        {
            headers: {
                Authorization: `${token}`,
                UserId: `${userId}`,
            },
        },
        { withCredentials: true },
    );
};

// GET ALL
export const getProductsInCart = (token, userId) => {
    return axios.get(
        `${api}/carts`,
        {
            headers: {
                Authorization: `${token}`,
                UserId: `${userId}`,
            },
        },
        { withCredentials: true },
    );
};

// DELETE PRODUCT FROM CART
export const deleteProductFromCart = (product, token, userId) => {
    return axios.delete(
        `${api}/carts/delete-product/${product.productId}`,
        {
            headers: { Authorization: `${token}`, UserId: `${userId}` },
        },
        { withCredentials: true },
    );
};

// DELETE ALL PRODUCTS FROM CART
export const deleteProducts = (cart, token, userId) => {
    return axios.put(
        `${api}/carts`,
        cart,
        {
            headers: {
                Authorization: `${token}`,
                UserId: `${userId}`,
            },
        },
        { withCredentials: true },
    );
};
