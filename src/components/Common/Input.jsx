import React from "react";

/**
 * Input Component - A reusable input field.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.type - The input type (e.g., "text", "email", "password").
 * @param {string} props.name - The name of the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.onChange - The function to handle input changes.
 * @param {string} [props.error] - The error message (if any).
 * @returns {JSX.Element} The Input component.
 */

const Input = ({ label, type, name, value, onChange, error }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        className={`input-field ${error ? "input-error" : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      
    </div>
  );
};


export default Input;
