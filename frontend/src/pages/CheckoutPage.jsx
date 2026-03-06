import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ street: '', city: '', country: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!address.street || !address.city || !address.country) {
      toast.error('Please fill in all address fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post('https://flux-backend-hu18.onrender.com/api/orders', {
        items: cartItems,
        totalPrice: total,
        shippingAddress: address,
      }, { headers: { Authorization: `Bearer ${user.token}` } });
      clearCart();
      navigate('/order-success');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container' style={{ padding: '60px 24px' }}>
      <h1 className='page-title'>Checkout</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 40 }}>
        <div className='card'>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, marginBottom: 24 }}>Shipping Address</h2>
          <div className='form-group'><label>Street</label><input className='input' name='street' value={address.street} onChange={handleChange} /></div>
          <div className='form-group'><label>City</label><input className='input' name='city' value={address.city} onChange={handleChange} /></div>
          <div className='form-group'><label>Country</label><input className='input' name='country' value={address.country} onChange={handleChange} /></div>
        </div>
        <div className='card'>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, marginBottom: 24 }}>Order Summary</h2>
          {cartItems.map(item => (
            <div key={item.product} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: '#aaa' }}>
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #2e2e2e', marginTop: 16, paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 20 }}>
            <span>Total</span><span style={{ color: '#e8c547' }}>${total.toFixed(2)}</span>
          </div>
          <button className='btn btn-primary' style={{ width: '100%', justifyContent: 'center', padding: 16, fontSize: 16, marginTop: 32 }} onClick={handleOrder} disabled={loading}>
            {loading ? 'Placing Order...' : 'Confirm Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;