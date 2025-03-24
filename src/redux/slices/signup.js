import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux slice for managing user signup state.
 *
 * @property {Object} initialState - The initial state of the signup slice.
 * @property {Array<Object>} initialState.users - List of registered users.
 * @property {string|null} initialState.token - The generated authentication token.
 */
const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    users: JSON.parse(localStorage.getItem('users')) || [],
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    /**
     * Handles the signup action.
     * Adds a new user to the state and generates a random token.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The Redux action object.
     * @param {Object} action.payload - The signup data (name, email, password).
     */
    doSignup: (state, action) => {
      const email = action.payload.email;
      console.log(action.payload);

      // Add the new user to the list of users
      state.users.push({ ...action.payload });

      // Generate a 4-digit random token
      const token = Math.floor(1000 + Math.random() * 9000);

      // Store the token in localStorage
      localStorage.setItem('token', JSON.stringify({ email, token }));

      // Update the state with the new token
      state.token = token;
    },
  },
});

// Exporting the action creator
export const { doSignup } = signupSlice.actions;

// Exporting the reducer
export default signupSlice.reducer;
