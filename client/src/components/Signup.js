// Import React and the useState hook from the React library
import React, { useState } from 'react';
// Import axios to handle HTTP requests to your backend
import axios from 'axios';

// Define the Signup component. It receives a prop `onAuth` from its parent,
// which will be used to update the app state after the user signs up.
const Signup = ({ onAuth }) => {
  // Create a state variable for the signup form fields (username, email, password)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Create a state variable to store any error messages during signup
  const [error, setError] = useState('');

  // Handle form input changes. This function updates the `form` state
  // when the user types in the username, email, or password field.
  const handleChange = (e) => {
    // Use the field name (e.target.name) to update just that part of the form
    setForm(prev => ({
      ...prev, // keep existing values
      [e.target.name]: e.target.value // update the one being typed into
    }));
  };

  // Handle form submission when the user clicks "Sign Up"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing
    setError('');        // Clear any existing errors

    try {
      // Send the form data to the backend server using a POST request
      const { data } = await axios.post('http://localhost:5000/users/signup', form);

      // Save the received token in localStorage to keep the user logged in
      localStorage.setItem('token', data.token);

      // Call the onAuth function to update the logged-in user in the app
      onAuth(data.user);
    } catch (err) {
      // If the server sends an error (like "Email already used"), display it
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  // Render the signup form
  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      {/* Username input */}
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />

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
      <button type="submit">Sign Up</button>

      {/* Show an error message if something goes wrong */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

// Export this component so other files can import and use it
export default Signup;
