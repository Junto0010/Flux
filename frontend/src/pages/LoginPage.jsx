import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(data);
      toast.success('Welcome back!');
      navigate(data.isAdmin ? '/admin' : '/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className='card' style={{ width: '100%', maxWidth: 400 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, marginBottom: 8 }}>Welcome Back</h1>
        <p style={{ color: '#888', marginBottom: 32, fontSize: 14 }}>Sign in to your account</p>
        {error && <div className='error-msg'>{error}</div>}
        <div className='form-group'>
          <label>Email</label>
          <input className='input' type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='your@email.com' />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input className='input' type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='••••••••' />
        </div>
        <button className='btn btn-primary' style={{ width: '100%', justifyContent: 'center', padding: 14 }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p style={{ textAlign: 'center', marginTop: 24, color: '#888', fontSize: 14 }}>
          No account? <Link to='/register' style={{ color: '#e8c547' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;