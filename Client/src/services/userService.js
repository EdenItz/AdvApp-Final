import axios from 'axios';
import jwt_decode from 'jwt-decode';

const api = 'http://localhost:3000/api/';

// REGISTER - to do

// LOGIN - to do

// GET USER DETAILS - to do

// GET USER DETAILS
export const getUser = () => {
    return axios.get(`${api}profile`, {
        headers: {
            Authorization: `${sessionStorage.getItem('token')}`,
        },
    });
};

// Get "isAdmin" payload from token
export const getIsAdmin = () => {
    return jwt_decode(sessionStorage.getItem('token')).isAdmin;
};
