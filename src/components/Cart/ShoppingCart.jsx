/**
 * ShoppingCart Component
 *
 * This component displays the shopping cart with a list of cart items, total price,
 * and total quantity. It allows users to update item quantity, remove items,
 * and proceed to checkout by creating an order.
 *
 * @component
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/slices/cart';
import { useCreateOrderMutation } from '../../services/order';
import './cart.scss';

const ShoppingCart = () => {
	// Extract cart details from Redux store
	const { cartItems, totalPrice, totalQuantity } = useSelector(
		(state) => state.cart,
	);
	const dispatch = useDispatch();
	const [createOrder, { isLoading, isSuccess, isError }] =
		useCreateOrderMutation();

	/**
	 * Handles the change in quantity of a cart item.
	 *
	 * @param {string} id - The unique ID of the cart item.
	 * @param {number} quantity - The updated quantity of the item.
	 */
	const handleQuantityChange = (id, quantity) => {
		if (quantity > 0) {
			dispatch(updateQuantity({ id, quantity }));
		}
	};

	/**
	 * Handles the removal of a cart item.
	 *
	 * @param {string} id - The unique ID of the cart item to remove.
	 */
	const handleRemove = (id) => {
		dispatch(removeFromCart(id));
	};

	/**
	 * Handles the checkout process by creating a new order.
	 *
	 * @async
	 */
	const handleCheckout = async () => {
		if (cartItems.length === 0) return alert('Cart is empty!');
		try {
			await createOrder({ cartItems, totalPrice, totalQuantity }).unwrap();
			alert('Order placed successfully!');
		} catch (error) {
			console.error('Failed to create order:', error);
		}
	};

	return (
		<div className="cart-container">
			<h2 className="cart-title">Shopping Cart</h2>
			{cartItems.length === 0 ? (
				<p className="empty-cart">Your cart is empty.</p>
			) : (
				<div className="cart-items">
					{cartItems.map((item) => (
						<div key={item.id} className="cart-item">
							<img
								src={item.thumbnail}
								alt={item.title}
								className="cart-item-img"
							/>
							<div className="cart-item-details">
								<h4 className="cart-item-title">{item.title}</h4>
								<p className="cart-item-price">
									Price: ${item.price.toFixed(2)}
								</p>
								<p className="cart-item-total">
									Total: ${item.totalPrice.toFixed(2)}
								</p>
								<div className="quantity-control">
									<button
										className="quantity-btn"
										onClick={() =>
											handleQuantityChange(item.id, item.quantity - 1)
										}
									>
										-
									</button>
									<span className="quantity-value">{item.quantity}</span>
									<button
										className="quantity-btn"
										onClick={() =>
											handleQuantityChange(item.id, item.quantity + 1)
										}
									>
										+
									</button>
								</div>
							</div>
							<div className="remove">
								<button
									className="remove-btn"
									onClick={() => handleRemove(item.id)}
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
			)}
			<div className="cart-summary">
				<h3 className="summary-title">Summary</h3>
				<p className="summary-details">Total Items: {totalQuantity}</p>
				<p className="summary-details">Total Price: ${totalPrice.toFixed(2)}</p>
				<button
					className="checkout-btn"
					onClick={handleCheckout}
					disabled={isLoading}
				>
					{isLoading ? 'Processing...' : 'Proceed to Checkout'}
				</button>
				{isSuccess && <p className="success-msg">Order placed successfully!</p>}
				{isError && <p className="error-msg">Failed to place order.</p>}
			</div>
		</div>
	);
};

export default ShoppingCart;
