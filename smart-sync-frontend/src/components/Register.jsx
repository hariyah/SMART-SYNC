import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/Register', { username, password, role });
      setMessage(response.data.message);
      setError(null);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError(error.response?.data?.error || error.response?.data?.message);
      setMessage(null);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>Role:</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">Select role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Register</button>
      </form>
    </div>
  );
};

export default Signup;