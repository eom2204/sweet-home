//logic related to managing the JWT token in cookies

import Cookies from 'js-cookie';

export const accessKey = 'accessKey'; // The key under which JWT is stored

export const AccessKey = {
    get: () => Cookies.get(accessKey), // Retrieve the token (JWT)
    set: (key) => Cookies.set(accessKey, key, {expires: 365}), // Store the token with a 1-year expiration
    remove: () => Cookies.remove(accessKey) // Remove the token (for logout)
};