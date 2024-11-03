//function for making API requests that require authentication.
// The token will be sent in the Authorization header.

import axios from 'axios';
import { AccessKey } from '../utils/AccessKey';

// Function to retrieve protected data
export const getProtectedData = async () => {
    const token = AccessKey.get();  // Get the token from the cookies
    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.get('/auth', {
            headers: {
                Authorization: `Bearer ${token}`, // Add token in Authorization header
            },
        });
        return response.data;
    } catch (error) {
        console.error('Protected Route Error:', error);
        throw error;
    }
};
