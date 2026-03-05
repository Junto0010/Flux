import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at 60% 50%, #1a1a2e 0%, #0d0d0d 70%)',
        padding: '0 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <p style={{ color: '#e8c547', fontSize: 14, letterSpacing: 3, marginBottom: 16, textTransform: 'uppercase' }}>Premium E-Commerce</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 1.1, marginBottom: 24, maxWidth: 700 }}>
            Shop the Future,<br />
            <span style={{ color: '#e8c547' }}>Today.</span>
          </h1>
          <p style={{ color: '#888', fontSize: 18, maxWidth: 500, lineHeight: 1.7, marginBottom: 40 }}>
            Discover premium products curated just for you. Free shipping on orders over $50.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link to='/products' className='btn btn-primary' style={{ fontSize: 16, padding: '14px 32px' }}>Shop Now →</Link>
            <Link to='/register' className='btn btn-outline' style={{ fontSize: 16, padding: '14px 32px' }}>Create Account</Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: '#111', padding: '80px 24px', borderTop: '1px solid #2e2e2e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40 }}>
          {[
            { icon: '🚚', title: 'Free Shipping', text: 'On all orders over $50' },
            { icon: '🔒', title: 'Secure Payments', text: '100% protected transactions' },
            { icon: '↩️', title: 'Easy Returns', text: '30-day return policy' },
            { icon: '🎧', title: '24/7 Support', text: 'Always here to help' },
          ].map(f => (
            <div key={f.title} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: '#888', fontSize: 14 }}>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;