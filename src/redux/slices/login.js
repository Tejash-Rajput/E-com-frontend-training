import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../slices/cart';
import { loadFromLocalStorage } from '../../utils/cartStore';

/**
 * Redux slice for managing login state.
 * 
 * @property {Object} initialState - The initial state of the login slice.
 * @property {Array} initialState.users - List of registered users.
 * @property {Object|null} initialState.token - Authentication token stored in localStorage.
 */
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    users: JSON.parse(localStorage.getItem('users')) || [],
    token: localStorage.getItem('token') || null,
  },

  reducers: {
    /**
     * Performs the login action by generating a token and updating the cart state.
     * 
     * @param {Object} state - The current state of the login slice.
     * @param {Object} action - Redux action object.
     * @param {Object} action.payload - The payload containing email, password, and dispatch.
     * @param {string} action.payload.email - The user's email.
     * @param {string} action.payload.password - The user's password.
     * @param {function} action.payload.dispatch - The Redux dispatch function.
     */
    doLogin: (state, action) => {
      const { email, password } = action.payload;

      // Generate a 4-digit random token
      const token = Math.floor(1000 + Math.random() * 9000);

      // Store token with email in localStorage
      localStorage.setItem('token', JSON.stringify({ email, token }));

      // Update token in Redux state
      state.token = token;

      console.log(email, password);

      // Dispatch the cart update action with loaded cart data
      action.payload.dispatch(updateCart(loadFromLocalStorage()));
    },
  },
});

// Exporting actions and reducer
export const { doLogin } = loginSlice.actions;
export default loginSlice.reducer;
