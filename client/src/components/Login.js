// Import React and the useState hook for managing form and error state
import React, { useState } from 'react';
// Axios is used for sending HTTP requests to the backend
import axios from 'axios';

// This is the Login component
// It accepts a prop called onAuth, which will be used to update the app after a successful login
const Login = ({ onAuth }) => {
  // Set up state to track form fields: email and password
  const [form, setForm] = useState({ email: '', password: '' });

  // State to show any error messages during login
  const [error, setError] = useState('');

  // This function updates the form state whenever the user types into the input fields
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // Update the field that was changed (email or password)
    }));
  };

  // This function runs when the user submits the login form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    setError('');       // Clear any existing errors

    try {
      // Send the form data (email + password) to the server
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, form);

      // Save the token in localStorage so we stay logged in across pages
      localStorage.setItem('token', data.token);

      // Call the onAuth function passed in by the parent, passing the logged-in user
      onAuth(data.user);
    } catch (err) {
      // If login fails, show an error message
      // (using optional chaining to avoid errors if data or error is undefined)
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  // This is the actual form that shows on the screen
  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>

      {/* Email input */}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      {/* Password input */}
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      {/* Submit button */}
      <button type="submit">Log In</button>

      {/* Display error message if one exists */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

// Export the Login component so it can be used in App.js or elsewhere
export default Login;
