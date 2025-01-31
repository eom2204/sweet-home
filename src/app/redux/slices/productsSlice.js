import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch products from backend
export const fetchGoods = createAsyncThunk("products/fetchGoods", async () => {
  try {
    const response = await fetch("/api/goods");
    // Check if the response is OK
    if (!response.ok) {
      throw new Error("Failed to fetch goods");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching goods, using local data:", error);
    // If there is an error, return local data as fallback
    const localData = require("../../../data/goods.json");
    return localData; // Return local categories as fallback
  }
});

const productsSlice = createSlice({
  name: "goods",
  initialState: {
    goods: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.goods = action.payload;
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
