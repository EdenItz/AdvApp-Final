import axios from 'axios';
import _ from 'lodash';
import { api } from '../globals';

// Post new order
// Send new order request
export const createOrder = (orderBody, token) => {
    return axios.post(`${api}/order`, orderBody, {
        headers: { Authorization: `${token}` },
    }, {withCredentials: true});
};