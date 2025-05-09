import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_API_URL;

// Thunk to fetch data dynamically based on the page
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (page) => {
    try {
      const response = await fetch(`${API_URL}/api/category`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${page}`);
      }
      const data = await response.json(); // Parse JSON response
      return data;
    } catch (error) {
      console.error(
        `Error fetching data for ${page}, using local data:`,
        error
      );
      const localData = require("../../../data/categories.json");
      return localData; // Return local data as fallback
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
