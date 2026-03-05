import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🛒</div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, marginBottom: 16 }}>Your cart is empty</h2>
      <Link to='/products' className='btn btn-primary'>Browse Products</Link>
    </div>
  );

  return (
    <div className='container' style={{ padding: '60px 24px' }}>
      <h1 className='page-title'>Your Cart</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, marginTop: 40 }}>
        <div>
          {cartItems.map(item => (
            <div key={item.product} className='card' style={{ display: 'flex', gap: 20, marginBottom: 16, padding: 20 }}>
              <img src={item.image} alt={item.name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: 4 }}>{item.name}</h3>
                <p style={{ color: '#e8c547', fontWeight: 700, marginBottom: 12 }}>${item.price}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button className='btn btn-outline' style={{ padding: '4px 12px' }} onClick={() => updateQuantity(item.product, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button className='btn btn-outline' style={{ padding: '4px 12px' }} onClick={() => updateQuantity(item.product, item.quantity + 1)}>+</button>
                  <button className='btn btn-danger' style={{ marginLeft: 'auto', padding: '6px 14px', fontSize: 13 }} onClick={() => removeFromCart(item.product)}>Remove</button>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#e8c547', minWidth: 80, textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className='card' style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, marginBottom: 24 }}>Order Summary</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, color: '#888' }}>
            <span>Subtotal</span><span>${total.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, color: '#888' }}>
            <span>Shipping</span><span>{total > 50 ? 'Free' : '$5.99'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32, fontWeight: 700, fontSize: 20 }}>
            <span>Total</span><span style={{ color: '#e8c547' }}>${(total > 50 ? total : total + 5.99).toFixed(2)}</span>
          </div>
          <button className='btn btn-primary' style={{ width: '100%', justifyContent: 'center', padding: 14, fontSize: 16 }} onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
          <Link to='/products' style={{ display: 'block', textAlign: 'center', marginTop: 16, color: '#888', fontSize: 14 }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;