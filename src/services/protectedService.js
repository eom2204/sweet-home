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
        const response = await axios.get('https://sweet-home-api-black.vercel.app/api/user/auth', {
            headers: {
                Authorization: `Bearer ${token}`, // Add token in Authorization header
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            console.error('Token expired or unauthorized. Redirecting to login.');
            AccessKey.remove(); // Clear the token
            window.location.href = '/login'; // Redirect to login
        } else {
            console.error('Protected Route Error:', error);
            throw error;
        }
    }
};
