import React from 'react';
import useLoginFormValidation from '../../hooks/useLoginFormValidation';
import AuthForm from '../Common/Authform';

/**
 * LoginForm Component
 * Renders the `AuthForm` component configured for login functionality.
 * It utilizes a custom hook for form validation and manages initial form data.
 *
 * @returns {JSX.Element} The rendered LoginForm component.
 */
const LoginForm = () => {
	return (
		<AuthForm
			/**
			 * @property {string} type - Specifies the form type as "login".
			 */
			type="login"
			/**
			 * @property {function} usersSelector - A function to select users from the Redux store.
			 */
			usersSelector={(state) => state.login.users}
			/**
			 * @property {Object} initialFormData - Defines the initial state for the login form.
			 * @property {string} initialFormData.email - Initial value for the email field.
			 * @property {string} initialFormData.password - Initial value for the password field.
			 */
			initialFormData={{ email: '', password: '' }}
			/**
			 * @property {function} useValidationHook - Custom hook for login form validation.
			 */
			useValidationHook={useLoginFormValidation}
		/>
	);
};

export default LoginForm;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Input from '../Common/Input';
// import useLoginFormValidation from '../../hooks/useLoginFormValidation';
// import { doLogin } from '../../redux/slices/login';

// const LoginForm = () => {
// 	const dispatch = useDispatch();
// 	const [error, setError] = useState('');
// 	const userList = useSelector((state) => state.login.users);
// 	const err = useSelector((state) => state.login.error);
// 	useEffect(() => {
// 		setError(err);
// 	}, [err]);
// 	useEffect(() => {
// 		localStorage.setItem('users', JSON.stringify(userList));
// 	}, [userList]);

// 	const [formData, setFormData] = useState({
// 		email: '',
// 		password: '',
// 	});

// 	const { errors, validateForm, resetErrors } =
// 		useLoginFormValidation(formData);

// 	const handleChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 		resetErrors();
// 		setError('');
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		if (validateForm()) {
// 			dispatch(doLogin(formData));
// 		} else {
// 			alert('form validation error ');
// 		}
// 	};

// 	return (
// 		<>
// 			<form className="form" onSubmit={handleSubmit}>
// 				<Input
// 					label="Email"
// 					type="email"
// 					name="email"
// 					value={formData.email}
// 					onChange={handleChange}
// 					error={errors.email}
// 				/>
// 				<Input
// 					label="Password"
// 					type="password"
// 					name="password"
// 					value={formData.password}
// 					onChange={handleChange}
// 					error={errors.password}
// 				/>
// 				<button className="submit-button" type="submit">
// 					Login
// 				</button>
// 			</form>
// 			{error && <div>{error}</div>}
// 		</>
// 	);
// };

// export default LoginForm;
