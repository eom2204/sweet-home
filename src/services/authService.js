// handling API calls for user authentication (login and registration)

import axios from 'axios';
import { AccessKey } from '../utils/AccessKey';

const API_URL = process.env.REACT_APP_API_URL;

// Handle login
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/login`, { email, password });
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
        const response = await axios.post(`${API_URL}/api/user/registration`, {email, username, password});
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
    window.location.href = "/login"; // Redirect + Full page reload
};

// Function to get the token from cookies:
export const getToken = () => {
    return AccessKey.get();
}

// Function to check if the provided token is valid
export const validateToken = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/auth`, {}, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
        });

        if (response.status === 200 && response.data.valid) {
            return true;  // Token is valid
        } else {
            return false;  // Token is invalid
        }
    } catch (error) {
        console.error('Token validation failed:', error);
        return false;  // Token validation failed
    }
};

// Function to check if the user is authenticated (token exists and is valid), if the token exists and then validates it using the validateToken function
export const isAuthenticated = async () => {
    const token = getToken();
    if (!token) {
        return false;  // No token, user is not authenticated
    }

    // Validate token with backend
    return await validateToken(token);
};
