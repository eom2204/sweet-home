import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import productsReducer from './slices/productsSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        goods: productsReducer,
        favorites: favoritesReducer,
    },
});
