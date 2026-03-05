import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <div className='container' style={{ padding: '60px 24px' }}>
      <h1 className='page-title'>Admin Dashboard</h1>
      <p style={{ color: '#888', marginBottom: 48 }}>Welcome back, {user?.name}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
        {[
          { to: '/admin/products', icon: '📦', title: 'Manage Products', desc: 'Add, edit, or remove products from the store' },
          { to: '/admin/orders', icon: '📋', title: 'Manage Orders', desc: 'View and update customer order statuses' },
          { to: '/products', icon: '🛍', title: 'View Store', desc: 'See the store as a customer would see it' },
        ].map(card => (
          <Link key={card.to} to={card.to} style={{ display: 'block' }}>
            <div className='card' style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{card.icon}</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, marginBottom: 8 }}>{card.title}</h2>
              <p style={{ color: '#888', fontSize: 14 }}>{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;