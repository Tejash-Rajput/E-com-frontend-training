import React from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import AuthForm from '../Common/Authform';

/**
 * SignupForm Component
 * Renders the signup form using the reusable AuthForm component.
 *
 * @component
 * @returns {JSX.Element} The rendered SignupForm component.
 */
const SignupForm = () => {
	return (
		<AuthForm
			/** Specifies the form type as signup */
			type="signup"
			/** Selects the users data from the signup state */
			usersSelector={(state) => state.signup.users}
			/** Initial form data for the signup form */
			initialFormData={{ name: '', email: '', password: '' }}
			/** Custom validation hook for form validation */
			useValidationHook={useFormValidation}
		/>
	);
};

export default SignupForm;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Input from '../Common/Input';
// import useFormValidation from '../../hooks/useFormValidation';
// import { doSignup } from '../../redux/slices/signup';

// const SignupForm = () => {
// 	const dispatch = useDispatch();
// 	const [error, setError] = useState('');

// 	const userList = useSelector((state) => state.signup.users);
// 	const err = useSelector((state) => state.signup.error);
// 	useEffect(() => {
// 		setError(err);
// 	}, [err]);

// 	useEffect(() => {
// 		localStorage.setItem('users', JSON.stringify(userList));
// 	}, [userList]);

// 	const [formData, setFormData] = useState({
// 		name: '',
// 		email: '',
// 		password: '',
// 	});

// 	const { errors, validateForm, resetErrors } = useFormValidation(formData);

// 	const handleChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 		resetErrors();
// 		setError('');
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		if (validateForm()) {
// 			dispatch(doSignup(formData));
// 		} else {
// 			alert('form validation error ');
// 		}
// 	};

// 	return (
// 		<>
// 			<form className="form" onSubmit={handleSubmit}>
// 				<Input
// 					label="Name"
// 					type="text"
// 					name="name"
// 					value={formData.name}
// 					onChange={handleChange}
// 					error={errors.name}
// 				/>
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
// 					Signup
// 				</button>
// 			</form>
// 			{error && <div>{error}</div>}
// 		</>
// 	);
// };

// export default SignupForm;
