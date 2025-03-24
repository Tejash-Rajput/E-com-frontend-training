import { createSlice } from '@reduxjs/toolkit';
import { loadFromLocalStorage } from '../../utils/cartStore';

/**
 * Redux slice for managing cart state.
 * 
 * @property {Object} initialState - The initial state of the cart.
 * @property {Array} initialState.cartItems - List of items in the cart.
 * @property {number} initialState.totalQuantity - Total quantity of all items.
 * @property {number} initialState.totalPrice - Total price of all items.
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState: loadFromLocalStorage() || {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
  },

  reducers: {
    /**
     * Adds a product to the cart. Increases quantity if the item already exists.
     * 
     * @param {Object} state - Current state of the cart.
     * @param {Object} action - Redux action object.
     * @param {Object} action.payload - The product item to add.
     */
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += item.price;
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
          totalPrice: item.price,
        });
      }
      state.totalQuantity += 1;
      state.totalPrice += item.price;
    },

    /**
     * Removes a product from the cart by its ID.
     * 
     * @param {Object} state - Current state of the cart.
     * @param {Object} action - Redux action object.
     * @param {string} action.payload - The ID of the product to remove.
     */
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((i) => i.id === itemId);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.totalPrice;
        state.cartItems = state.cartItems.filter((i) => i.id !== itemId);
      }
    },

    /**
     * Updates the quantity of a specific product in the cart.
     * 
     * @param {Object} state - Current state of the cart.
     * @param {Object} action - Redux action object.
     * @param {Object} action.payload - Contains the product ID and the new quantity.
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);

      if (item && quantity > 0) {
        state.totalQuantity += quantity - item.quantity;
        state.totalPrice += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
      }
    },

    /**
     * Replaces the current cart state with a loaded cart from localStorage or other source.
     * 
     * @param {Object} state - Current state of the cart.
     * @param {Object} action - Redux action object.
     * @param {Object} action.payload - The loaded cart data.
     */
    updateCart: (state, action) => {
      const loadedCart = action.payload;
      if (loadedCart) {
        state.cartItems = loadedCart.cartItems || [];
        state.totalQuantity = loadedCart.totalQuantity || 0;
        state.totalPrice = loadedCart.totalPrice || 0;
      }
    },
  },
});

// Exporting actions and reducer
export const { addToCart, removeFromCart, updateQuantity, updateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
