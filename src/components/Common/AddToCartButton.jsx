/**
 * AddToCartButton Component
 *
 * This component renders a button that allows users to add a product to the cart.
 * It checks for user authentication via a token stored in localStorage before dispatching
 * the action to add the product to the cart.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.product - The product object to be added to the cart
 */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cart'; // Adjust path as needed

const AddToCartButton = ({ product }) => {
	const dispatch = useDispatch();

	/**
	 * Logs the product details on component mount or when the product changes.
	 */
	useEffect(() => {
		console.log(product);
	}, [product]);

	/**
	 * Handles the click event to add the product to the cart.
	 *
	 * Checks for a valid token in localStorage. If the token exists,
	 * dispatches the addToCart action with the product object. Otherwise,
	 * prompts the user to log in.
	 */
	const handleClick = () => {
		const token = JSON.parse(localStorage.getItem('token'));

		if (token) {
			console.log('Logged in as:', token.email);
			dispatch(addToCart(product)); // Add product to cart
		} else {
			console.log('Not logged in');
			alert('Please log in to add items to your cart.');
		}
	};

	return (
		<div className="add-to-cart">
			<button
				className="addtocart-btn"
				onClick={() => {
					handleClick();
				}}
			>
				Add to Cart
			</button>
		</div>
	);
};

export default AddToCartButton;
