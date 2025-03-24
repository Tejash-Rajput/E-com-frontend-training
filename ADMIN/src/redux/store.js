import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../services/products';

/**
 * Redux store configuration for managing application state.
 *
 * @property {Object} reducer - Combines all slice reducers and API reducers.
 * @property {Function} middleware - Adds custom middleware to the default middleware stack.
 * @returns {Object} - The configured Redux store.
 */
export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
});
