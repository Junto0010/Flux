import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        name: form.name, email: form.email, password: form.password
      });
      login(data);
      toast.success('Account created!');
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className='card' style={{ width: '100%', maxWidth: 400 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, marginBottom: 8 }}>Create Account</h1>
        <p style={{ color: '#888', marginBottom: 32, fontSize: 14 }}>Join Flux today</p>
        {error && <div className='error-msg'>{error}</div>}
        {['name', 'email', 'password', 'confirm'].map(field => (
          <div className='form-group' key={field}>
            <label>{field === 'confirm' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input className='input' name={field} type={field.includes('password') || field === 'confirm' ? 'password' : field === 'email' ? 'email' : 'text'}
              value={form[field]} onChange={handleChange} />
          </div>
        ))}
        <button className='btn btn-primary' style={{ width: '100%', justifyContent: 'center', padding: 14 }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
        <p style={{ textAlign: 'center', marginTop: 24, color: '#888', fontSize: 14 }}>
          Have an account? <Link to='/login' style={{ color: '#e8c547' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;