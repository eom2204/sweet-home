import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch products from backend
export const fetchGoods = createAsyncThunk('products/fetchGoods', async () => {
    const response = await fetch('/api/goods');
    const data = await response.json();
    return data;
});

const productsSlice = createSlice({
    name: 'goods',
    initialState: {
        goods: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoods.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGoods.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.goods = action.payload;
            })
            .addCase(fetchGoods.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
