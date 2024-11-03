import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch categories from backend
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await fetch('/api/category');
    const data = await response.json();
    return data;
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
