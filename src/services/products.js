import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/helper';

/**
 * RTK Query API for product management.
 * Handles fetching all products and fetching a single product by ID.
 */
export const productsApi = createApi({
  reducerPath: 'productsApi', // Unique identifier for the products API

  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), // Base URL from the helper file

  /**
   * Define the API endpoints
   */
  endpoints: (builder) => ({
    /**
     * Query to fetch all products.
     * @returns {Array} List of all products.
     */
    getProducts: builder.query({
      query: () => '/api/products', // Consistent URL structure
    }),

    /**
     * Query to fetch a single product by ID.
     * @param {string} id - The ID of the product to fetch.
     * @returns {Object} Product details for the specified ID.
     */
    getProductById: builder.query({
      query: (id) => `/api/products/${id}`, // Consistent URL structure
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
