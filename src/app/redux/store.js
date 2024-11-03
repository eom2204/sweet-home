import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../../features/slices/categoriesSlice';
import productsReducer from '../../features/slices/productsSlice';

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        goods: productsReducer,
    },
});
