import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.REACT_APP_API_URL;

// Thunk to fetch categories from backend
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    try {
        const response = await fetch(`${API_URL}/api/category`);
        // Check if the response is OK
        if (!response.data) {
            throw new Error('Failed to fetch goods');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching categories, using local data:', error);
        // If there is an error, return local data as fallback
        const localData = require('../../../data/categories.json');
        return localData;  // Return local categories as fallback
    }

});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default categoriesSlice.reducer;
