import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function Register() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const payload = {
      username: formData.get('username'),
      password: formData.get('password'),
      email: formData.get('email'),
      phone_number: formData.get('phoneNumber'),
    };

    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {

        const result = await response.json();
        alert(result.message);
        navigate('/', { state: { user: payload.username } });
      } else {
        const { error } = await response.json();
        setError(error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          placeholder="Enter your username"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Enter your password"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email"
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          required
          placeholder="Enter your phone number"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}