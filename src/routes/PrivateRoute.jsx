import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Higher-Order Component (HOC) for protecting private routes.
 * Redirects to the login page if the user is not authenticated.
 *
 * @param {Object} props - Component props.
 * @param {JSX.Element} props.children - The child component to render if authenticated.
 * @returns {JSX.Element} - The child component or a redirection to the login page.
 */
const PrivateRoute = ({ children }) => {
	// Select token from login or signup slice
	const token = useSelector((state) => state.login.token || state.signup.token);
	console.log(token);

	// If token exists, render child components; otherwise, redirect to login
	return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
