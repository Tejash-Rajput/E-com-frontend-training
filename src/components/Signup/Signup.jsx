import React from 'react';
import SignupForm from './SignupForm';

/**
 * Signup Component
 * Renders the signup page with a form for user registration.
 *
 * @component
 * @returns {JSX.Element} The rendered Signup component.
 */
const Signup = () => {
  return (
    <div className="auth-container">
      {/** Page title */}
      <h1 className="auth-container-title">Signup</h1>

      {/** Signup form component */}
      <SignupForm />
    </div>
  );
};

export default Signup;
