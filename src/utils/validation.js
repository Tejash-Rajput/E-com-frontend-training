/**
 * Validates the format of an email address.
 * Uses a regular expression to ensure the email follows a standard format.
 *
 * @param {string} email - The email string to validate.
 * @returns {boolean} - Returns true if the email format is valid, otherwise false.
 *
 * @example
 * validateEmail("test@example.com"); // true
 * validateEmail("invalid-email"); // false
 */
export const validateEmail = (email) => {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(email);
};

/**
 * Validates the strength of a password based on specified criteria:
 * - Length between 8 to 15 characters.
 * - At least one uppercase letter.
 * - At least one lowercase letter.
 * - At least one number.
 * - At least one special character.
 *
 * @param {string} password - The password string to validate.
 * @returns {string|null} - An error message if the password is invalid, otherwise null.
 *
 * @example
 * validatePassword("StrongP@ss1"); // null (valid)
 * validatePassword("weakpass"); // "Password should have at least one uppercase letter"
 */
export const validatePassword = (password) => {
	if (password.length < 8 || password.length > 15) {
		return 'Password length should be between 8-15 characters';
	}
	if (!/[A-Z]/.test(password)) {
		return 'Password should have at least one uppercase letter';
	}
	if (!/[a-z]/.test(password)) {
		return 'Password should have at least one lowercase letter';
	}
	if (!/[0-9]/.test(password)) {
		return 'Password should have at least one number';
	}
	if (!/[^A-Za-z0-9]/.test(password)) {
		return 'Password should have at least one special character';
	}
	return null;
};
