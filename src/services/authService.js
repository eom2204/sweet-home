// handling API calls for user authentication (login and registration)

import axios from 'axios';
import { AccessKey } from '../utils/AccessKey';

// Handle login
export const login = async (email, password) => {
    try {
        const response = await axios.post('/api/user/login', { email, password });
        const { token } = response.data;

        // Store the JWT token in the cookies
        AccessKey.set(token);
        return response.data;
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

// Handle registration
//(email, username, password, role)?
export const register = async (email, username, password) => {
    try {
        const response = await axios.post('/api/user/registration', {email, username, password});
        const { token } = response.data;

        // Store the JWT token in the cookies
        AccessKey.set(token);
        return response.data;
    } catch (error) {
        console.error('Registration Error:', error);
        throw error;
    }
};

// Handle logout by removing the token
export const logout = () => {
    AccessKey.remove();
};