// slice to handle the favorites state (favoriteCount to track the count.
// Functions to add/remove favorites and update the count)

import {createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {getToken} from "../../../services/authService";

const initialState = {
    favoriteCount: 0,
    favoriteItems: [], // Array to store IDs or items added to favorites
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        // Add a favorite item
        addFavorite: (state, action) => {
            const itemId = action.payload; // In Redux Toolkit, the payload property of an action contains the data passed to the reducer when the action is dispatched.

            console.log('Item ID:', itemId); // Debugging

            if (!state.favoriteItems.includes(itemId)) {
                state.favoriteItems.push(itemId);
                state.favoriteCount += 1;
            }
        },
        // Remove a favorite item
        removeFavorite: (state, action) => {
            const itemId = action.payload;
            state.favoriteItems = state.favoriteItems.filter((id) => id !== itemId);
            state.favoriteCount = Math.max(state.favoriteCount - 1, 0);
        },
        // Replace favorites (used after successful sync with backend)
        setFavorites: (state, action) => {
            state.favoriteItems = action.payload;
            state.favoriteCount = action.payload.length;
        },
    },
});

// Export actions
export const {addFavorite, removeFavorite, setFavorites} = favoritesSlice.actions;


// Thunk to initialize favorites after user login
export const initializeFavorites = () => async (dispatch, getState) => {
    try {
        const userToken = getToken();
        if (!userToken) throw new Error("No authentication token found.");

        // Fetch user info and basket data
        const response = await axios.get('https://sweet-home-api-black.vercel.app/api/user/info', {
            headers: { Authorization: `Bearer ${userToken}` },
        });

        const favoriteGoods = response.data?.basket?.goodsIds || [];
        const currentFavorites = getState().favorites.favoriteItems;

        // Only update Redux if the backend data differs from current state
        if (JSON.stringify(currentFavorites) !== JSON.stringify(favoriteGoods)) {
            dispatch(setFavorites(favoriteGoods));
        }
    } catch (error) {
        console.error("Error initializing favorites:", error);
    }
};


// Thunk to send favorites to backend
export const syncFavoritesWithBackend = (favorites) => async (dispatch, getState) => {
    try {
        // Retrieve the token from cookies
        const userToken = getToken();

        if (!userToken) {
            throw new Error('No authentication token found. Please log in.');
        }

        const state = getState();
        const updatedFavorites = state.favorites.favoriteItems; // Get latest Redux state

        console.log('Favorites being sent to backend:', updatedFavorites);

        // Fetch user id
        const basketResponse = await axios.get('https://sweet-home-api-black.vercel.app/api/user/info', {
            headers: {
                Authorization: `Bearer ${userToken}`, // Include token in headers
            },
        });

        const id = basketResponse.data?.id;
        if (!id) {
            throw new Error('No basketId found in the response. Please ensure the user has a valid basket.');
        }

        console.log('Retrieved basketId:', id);

        // Send updated favorites to BE
        const response = await axios.post('https://sweet-home-api-black.vercel.app/api/basket/add-goods',
            {id, goodsIds: updatedFavorites},
        );
        console.log('goodsIds synced successfully:', response.data);

        // Update the Redux store with the backend data
        // const updatedFavorites = response.data?.goodsIds || [];
        // const currentFavorites = getState().favorites.favoriteItems;
        //
        // if (JSON.stringify(currentFavorites) !== JSON.stringify(updatedFavorites)) {
        //     dispatch(setFavorites(updatedFavorites));
        // }
    } catch (error) {
        console.error('Error syncing goodsIds with backend:', error);
    }

    //     // Send favorites to backend with basketId
    //     const response = await axios.post('/api/basket/add-selected-goods', {id: id, selectedGoods: favorites},
    //         );
    //     console.log('Favorites synced successfully:', response.data);
    // } catch (error) {
    //     console.error('Error syncing favorites with backend:', error);
    // }

};

// Enhanced removeFavorite to sync instantly
export const removeFavoriteAndSync = (itemId) => (dispatch) => {
    dispatch(removeFavorite(itemId)); // Remove from Redux instantly
    dispatch(syncFavoritesWithBackend()); // Sync backend
};

// Export the reducer
export default favoritesSlice.reducer;
