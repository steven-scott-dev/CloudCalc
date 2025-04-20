import React, { useState } from 'react';
import axios from 'axios';

// SignupForm component for user registration
const SignupForm = ({ onAuth }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/users/signup', form);
      
      console.log('✅ Signup response:', res.data);
      console.log('✅ user received:', res.data.user);

      
      localStorage.setItem('token', res.data.token);
      
      console.log('Signup response:', res.data);

      onAuth(res.data.user);
    } catch (err) {
      setMessage('Signup failed');
    }
  };

  
  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          className="auth-input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="auth-input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignupForm;

