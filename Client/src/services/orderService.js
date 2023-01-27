import axios from 'axios';
import _ from 'lodash';
import { api } from '../globals';

// Post new order
// Send new order request
export const createOrder = (orderBody, token) => {
    return axios.post(
        `${api}/order`,
        orderBody,
        {
            headers: { Authorization: `${token}` },
        },
        { withCredentials: true },
    );
};
// Get order history
export const getHistory = async token => {
    try {
        const data = await axios.get(
            `${api}/order`,
            {
                headers: { Authorization: `${token}` },
            },
            { withCredentials: true },
        );
        return data;
    } catch (error) {
        return error?.response?.data;
    }
};
