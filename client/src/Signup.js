// src/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import './Calculator.css';

const Signup = ({ onAuth }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users/signup', form);
      localStorage.setItem('token', res.data.token);
      onAuth(res.data.user);
    } catch (err) {
      setMessage('Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Signup;


