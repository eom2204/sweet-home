// slice to handle the cart state (cartCount to track the count)
// Functions to add/remove goods to the cart and update the count)

import {createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {getToken} from "../../../services/authService";

const initialState = {
    cartCount: 0,
    cartItems: [], // Array to store IDs or items added to favorites
    initialized: false,  // A flag to track initialization
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemId = action.payload; // In Redux Toolkit, the payload property of an action contains the data passed to the reducer when the action is dispatched.

            if (!state.cartItems.includes(itemId)) {
                state.cartItems.push(itemId);
                state.cartCount += 1;
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((id) => id !== itemId);
            state.cartCount = Math.max(state.cartCount - 1, 0);
        },
        // Replace favorites (used after successful sync with backend)
        setCart: (state, action) => {
            state.cartItems = action.payload;
            state.cartCount = action.payload.length;
        },

        setInitialized: (state) => {
            return { ...state, initialized: true };  // Ensure Redux state change
        },
    },
});

// Export actions
export const {addToCart, removeFromCart, setCart, setInitialized} = cartSlice.actions;


// Thunk to initialize favorites after user login
export const initializeCart = () => async (dispatch, getState) => {

    try {
        const userToken = getToken();
        if (!userToken) {
            throw new Error("No authentication token found. Please log in.");
        }

        // Fetch user info and basket data
        const response = await axios.get('/api/user/info', {
            headers: {Authorization: `Bearer ${userToken}`},
        });

        const cartGoods = response.data?.basket?.selectedGoods || [];
        const currentCart = getState().cart.cartItems;

        // Only update Redux if the backend data differs from current state
        if (JSON.stringify(currentCart) !== JSON.stringify(cartGoods)) {
            dispatch(setCart(cartGoods));
        }
        dispatch(setInitialized()); // Mark initialization as complete
    } catch (error) {
        console.error("Error initializing cart:", error);
    }
};


//Thunk to send favorites to backend
export const syncCartWithBackend = () => async (dispatch, getState) => {
    try {
        // Retrieve the token from cookies
        const userToken = getToken();
        if (!userToken) {
            throw new Error("No authentication token found. Please log in.");
        }

        const state = getState();
        const updatedCart = state.cart.cartItems; // Get latest Redux state

        // Fetch user id
        const basketResponse = await axios.get('/api/user/info', {
            headers: {
                Authorization: `Bearer ${userToken}`, // Include token in headers
            },
        });

        const id = basketResponse?.data?.basketId;
        if (!id) {
            throw new Error('No basketId found in the response. Please ensure the user has a valid basket.');
        }

        // Send updated favorites to BE
        const response = await axios.post('/api/basket/add-selected-goods',
            {id, selectedGoods: updatedCart},
        );

    } catch (error) {
        console.error('Error syncing goodsIds in Cart with backend:', error);
    }
};

// Enhanced removeFromCart to sync instantly
export const removeFromCartAndSync = (itemId) => (dispatch) => {
    dispatch(removeFromCart(itemId)); // Remove from Redux instantly
    dispatch(syncCartWithBackend()); // Sync backend
};

// Export the reducer
export default cartSlice.reducer;
