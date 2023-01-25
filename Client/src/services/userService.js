import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { api } from '../globals';

// REGISTER
export const register = async (email, password) => {
    try {
        const data = await axios.post(`${api}/auth/register`, { email: email, password: password }, {withCredentials: true});
        console.log(data)
        return data;
    } catch (error) {
        return error?.response?.data;
    }
};

// LOGIN
export const logIn = async (email, password) => {
    try {
        const data = await axios.post(`${api}/auth/logIn`, { email: email, password: password }, {withCredentials: true});
        console.log(data)
        return data;
    } catch (error) {
        return error?.response?.data;
    }
};

// LOGIN
export const resetPasswordWithEmail = async (email) => {
    try {
        const data = await axios.post(`${api}/auth/resetPassword`, { email: email }, {withCredentials: true});
        console.log(data)
        return data;
    } catch (error) {
        return error?.response?.data;
    }
};

// GET USER DETAILS - to do

// GET USER DETAILS
export const getUser = (token) => {
    return axios.get(`${api}/profile`, {
        headers: {
            Authorization: `${token}`,
        }, 
    }, {withCredentials: true});
};

// Get "isAdmin" payload from token
export const getIsAdmin = () => {
    return jwt_decode(sessionStorage.getItem('token')).isAdmin;
};
