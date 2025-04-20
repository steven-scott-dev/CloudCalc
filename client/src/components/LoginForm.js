import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/users/login', form);
      localStorage.setItem('token', res.data.token);
      console.log('✅ Logged in user:', res.data.user);
      onLogin(res.data.user);
    } catch (err) {
      console.error('❌ Login failed:', err.response?.data || err.message);
      setMessage('Invalid login');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
