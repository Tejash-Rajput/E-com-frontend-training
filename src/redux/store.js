import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './slices/signup';
import loginSlice from './slices/login';
// import productSlice from './slices/product';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '../services/products';
import { orderApi } from '../services/order';
import cartSlice from './slices/cart';
import { saveToLocalStorage } from '../utils/cartStore';

/**
 * Redux store configuration for managing application state.
 *
 * @property {Object} reducer - Combines all slice reducers and API reducers.
 * @property {Function} middleware - Adds custom middleware to the default middleware stack.
 * @returns {Object} - The configured Redux store.
 */
export const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    // product: productSlice, // Uncomment when product slice is needed
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(orderApi.middleware),
});

/**
 * Persists the cart state to localStorage on every state change.
 */
store.subscribe(() => saveToLocalStorage(store.getState()));
