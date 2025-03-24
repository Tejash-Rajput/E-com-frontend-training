/**
 * AuthForm Component
 *
 * This component renders a form for user authentication, handling both login and signup functionality.
 * It validates form inputs, manages errors, and dispatches appropriate Redux actions for login or signup.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.type - The type of authentication form ('login' or 'signup')
 * @param {Function} props.usersSelector - A selector function to get the list of users from the Redux store
 * @param {Object} props.initialFormData - The initial state for form inputs
 * @param {Function} props.useValidationHook - A custom hook for form validation
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Common/Input';
import '../Common/styles/common.scss';
import { Link, useNavigate } from 'react-router-dom';
import { doLogin } from '../../redux/slices/login';
import { doSignup } from '../../redux/slices/signup';

const AuthForm = ({
	type,
	usersSelector,
	initialFormData,
	useValidationHook,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const userList = useSelector((state) => usersSelector(state));

	/**
	 * Stores the updated user list in localStorage whenever it changes.
	 */
	useEffect(() => {
		localStorage.setItem('users', JSON.stringify(userList));
	}, [userList]);

	const [formData, setFormData] = useState(initialFormData);
	const { errors, validateForm, resetErrors } = useValidationHook(formData);

	/**
	 * Handles input change event.
	 *
	 * @param {Object} e - The event object from input
	 */
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		resetErrors();
		setError('');
	};

	/**
	 * Handles form submission for login or signup.
	 *
	 * @param {Object} e - The event object from form submission
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			if (type === 'login') {
				const checkingUser = userList.find((u) => u.email === formData.email);
				if (!!checkingUser) {
					if (checkingUser.password === formData.password) {
						dispatch(doLogin(formData)); // Dispatch login action
						navigate('/');
					} else {
						setError('Incorrect password');
					}
				} else {
					setError("User doesn't exist. Please signup.");
				}
			} else {
				const checkingUser = userList.find((u) => u.email === formData.email);
				if (!!checkingUser) {
					setError('User already exists.');
				} else {
					dispatch(doSignup(formData)); // Dispatch signup action
					navigate('/');
				}
			}
		}
	};

	return (
		<div className="auth-container">
			<form className="auth-container-form form" onSubmit={handleSubmit}>
				{Object.keys(initialFormData).map((key) => (
					<div key={key} className="form-group">
						<label className="form-group-label">
							{key.charAt(0).toUpperCase() + key.slice(1)}
						</label>
						<Input
							type={key === 'password' ? 'password' : 'text'}
							name={key}
							value={formData[key]}
							onChange={handleChange}
							error={errors[key]}
							className="form-group-input"
						/>
						{errors[key] && (
							<span className="form-group-error">{errors[key]}</span>
						)}
					</div>
				))}
				<button className="button" type="submit">
					{type === 'login' ? 'Login' : 'Signup'}
				</button>
				{error && (
					<div className="error-message">
						{error === "User doesn't exist. Please signup." ? (
							<>
								{error}
								<button className="button">
									<Link className="signup" to={'/signup'}>
										Signup
									</Link>
								</button>
							</>
						) : (
							error
						)}
					</div>
				)}
			</form>
		</div>
	);
};

export default AuthForm;
