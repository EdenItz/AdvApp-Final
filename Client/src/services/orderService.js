import axios from 'axios';
import _ from 'lodash';
import { api } from '../globals';

// Post new order
// Send new order request
export const createOrder = (orderBody, token, userId) => {
    console.log(userId);

    return axios.post(
        `${api}/order`,
        orderBody,
        {
            headers: { Authorization: `${token}`, UserId: `${userId}` },
        },
        { withCredentials: true },
    );
};

export const deleteOrder = async (orderId, token, userId) => {
    try {
        const data = await axios.post(
            `${api}/order/delete/${orderId}`,
            {
                headers: { Authorization: `${token}`, UserId: `${userId}` },
            },
            { withCredentials: true }
        );
        console.log(data)
        return data;
    } catch (error) {
        return error?.response?.data;
    }
};

// Get order history
export const getHistory = async (token, userId) => {
    try {
        const data = await axios.get(
            `${api}/order/`,
            {
                headers: { Authorization: `${token}`, UserId: `${userId}` },
            },
            { withCredentials: true },
        );
        return data;
    } catch (error) {
        return error?.response?.data;
    }
};

export const getHistoryCategoryStatistics = async (token, userId) => {
    try {
        const data = await axios.get(
            `${api}/order/getInfo/historyCategories`,
            {
                headers: { Authorization: `${token}`, UserId: `${userId}` },
            },
            { withCredentials: true },
        );
        return data;
    } catch (error) {
        return error?.response?.data;
    }
};
