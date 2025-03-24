import React from 'react';
import LoginForm from './LoginForm';

/**
 * Login Component
 * Serves as the parent component for the login page.
 * Displays a title and includes the `LoginForm` component.
 *
 * @returns {JSX.Element} The rendered Login component.
 */
const Login = () => {
  return (
    <div className="auth-container">
      <h1 className="auth-container-title">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
