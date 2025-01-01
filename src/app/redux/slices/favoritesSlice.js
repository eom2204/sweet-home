// slice to handle the favorites state (favoriteCount to track the count.
// Functions to add/remove favorites and update the count)

import { createSlice } from '@reduxjs/toolkit';

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
    },
});

// Export actions
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// Export the reducer
export default favoritesSlice.reducer;
