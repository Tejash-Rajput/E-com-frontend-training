/**
 * Generates a unique key for the current user's cart based on their email.
 * @returns {string|null} - Unique key for each user or null if not logged in.
 */
export const getUserKey = () => {
	const token = localStorage.getItem('token');
	if (token) {
		try {
			const jsontoken = JSON.parse(token);
			const email = jsontoken?.email;
			if (email) {
				return `cart_${email}`; // Unique key for each user
			}
		} catch (error) {
			console.warn('Failed to parse token:', error);
		}
	}
	return null; // No key if not logged in
};

/**
 * Saves the current cart state to localStorage for the logged-in user.
 * @param {Object} state - The Redux state object containing the cart.
 * @param {Array} state.cartItems - The list of items in the cart.
 * @param {number} state.totalQuantity - The total number of items in the cart.
 * @param {number} state.totalPrice - The total price of the cart items.
 */
export const saveToLocalStorage = (state) => {
	try {
		const userKey = getUserKey();
		if (userKey) {
			// Save only if user is logged in
			localStorage.setItem(userKey, JSON.stringify(state.cart));
		}
	} catch (error) {
		console.warn('Failed to save state:', error);
	}
};

/**
 * Loads the cart state from localStorage for the logged-in user.
 * @returns {Object} - The loaded cart state or a default empty cart state.
 * @property {Array} cartItems - List of items in the cart.
 * @property {number} totalQuantity - Total quantity of items.
 * @property {number} totalPrice - Total price of items.
 */
export const loadFromLocalStorage = () => {
	try {
		const userKey = getUserKey();
		if (userKey) {
			// Load only the logged-in user's cart
			const savedState = localStorage.getItem(userKey);
			return savedState
				? JSON.parse(savedState)
				: {
						cartItems: [],
						totalQuantity: 0,
						totalPrice: 0,
					};
		}
		return {
			cartItems: [],
			totalQuantity: 0,
			totalPrice: 0,
		};
	} catch (error) {
		console.warn('Failed to load state:', error);
		return {
			cartItems: [],
			totalQuantity: 0,
			totalPrice: 0,
		};
	}
};
