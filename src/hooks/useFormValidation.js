import { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validation";

/**
 * Custom Hook - Handles form validation logic.
 *
 * @param {Object} formData - The current state of the form data.
 * @param {string} formData.name - The user's name.
 * @param {string} formData.email - The user's email address.
 * @param {string} formData.password - The user's password.
 * @returns {Object} - An object containing errors, validation function, and reset function.
 * @property {Object} errors - An object containing error messages for each invalid field.
 * @property {Function} validateForm - Function to validate the form fields.
 * @property {Function} resetErrors - Function to reset all error messages.
 */
const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  /**
   * Validates the form fields.
   *
   * @returns {boolean} - True if the form is valid, false otherwise.
   */
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Resets all error messages.
   */
  const resetErrors = () => setErrors({});

  return { errors, validateForm, resetErrors };
};

export default useFormValidation;
