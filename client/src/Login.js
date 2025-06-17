// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Calculator.css';

const Login = ({ onAuth }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, form);
      localStorage.setItem('token', res.data.token);
      onAuth(res.data.user);
    } catch (err) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
