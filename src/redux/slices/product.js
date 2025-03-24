import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Async thunk to fetch product data from the API.
 * 
 * @async
 * @function fetchProduct
 * @returns {Promise<Object>} The fetched product data in JSON format.
 */
export const fetchProduct = createAsyncThunk('fetchProduct', async () => {
  const response = await fetch('http://localhost:8000/api/products');
  console.log(response);
  return response.json();
});

/**
 * Redux slice for managing product state.
 * 
 * @property {Object} initialState - The initial state of the product slice.
 * @property {boolean} initialState.isLoading - Loading state for product fetching.
 * @property {Object|null} initialState.data - The fetched product data.
 * @property {boolean} initialState.isError - Error state for product fetching.
 */
const productSlice = createSlice({
  name: 'product',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    /**
     * Handles the pending state of the fetchProduct thunk.
     * 
     * @param {Object} state - The current state of the slice.
     */
    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });

    /**
     * Handles the fulfilled state of the fetchProduct thunk.
     * 
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The Redux action object.
     * @param {Object} action.payload - The fetched product data.
     */
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    /**
     * Handles the rejected state of the fetchProduct thunk.
     * 
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The Redux action object.
     * @param {Object} action.error - The error object from the rejected thunk.
     */
    builder.addCase(fetchProduct.rejected, (state, action) => {
      console.log('Error:', action.error.message);
      state.isError = true;
    });
  },
});

// No actions are exported as only async thunk is used.
export default productSlice.reducer;
