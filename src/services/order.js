import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * RTK Query API for order management.
 * Handles order creation, fetching all orders, and fetching a single order by ID.
 */
export const orderApi = createApi({
  reducerPath: 'orderApi', // Unique identifier for the order API
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }), // Base URL for API requests

  /**
   * Define the API endpoints
   */
  endpoints: (builder) => ({
    /**
     * Mutation to create a new order.
     * @param {Object} order - The order details to be sent in the POST request.
     * @returns {Object} Response data from the server.
     */
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
    }),

    /**
     * Query to fetch all orders.
     * @returns {Array} List of all orders.
     */
    fetchOrders: builder.query({
      query: () => '/orders',
    }),

    /**
     * Query to fetch a specific order by ID.
     * @param {string} id - The ID of the order to fetch.
     * @returns {Object} Order details for the specified ID.
     */
    fetchOrderByID: builder.query({
      query: (id) => `/orders/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreateOrderMutation,
  useFetchOrdersQuery,
  useFetchOrderByIDQuery,
} = orderApi;
