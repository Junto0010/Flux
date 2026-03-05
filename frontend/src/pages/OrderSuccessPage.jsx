import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => (
  <div style={{ textAlign: 'center', padding: '120px 24px' }}>
    <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, marginBottom: 16 }}>Order Placed!</h1>
    <p style={{ color: '#888', fontSize: 18, marginBottom: 40 }}>Thank you for shopping with us. Your order is confirmed.</p>
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
      <Link to='/products' className='btn btn-primary'>Continue Shopping</Link>
      <Link to='/' className='btn btn-outline'>Home</Link>
    </div>
  </div>
);

export default OrderSuccessPage;