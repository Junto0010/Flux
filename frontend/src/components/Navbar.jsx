import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      background: '#111',
      borderBottom: '1px solid #2e2e2e',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to='/' style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#e8c547' }}>
          🛒 Flux
        </Link>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link to='/products' className='btn btn-outline' style={{ padding: '8px 16px', fontSize: 14 }}>Products</Link>
          {user ? (
            <>
              <Link to='/cart' className='btn btn-outline' style={{ padding: '8px 16px', fontSize: 14 }}>
                🛍 Cart {itemCount > 0 && <span style={{ background: '#e8c547', color: '#000', borderRadius: 99, padding: '2px 7px', fontSize: 12, marginLeft: 4 }}>{itemCount}</span>}
              </Link>
              {user.isAdmin && <Link to='/admin' className='btn btn-outline' style={{ padding: '8px 16px', fontSize: 14 }}>Admin</Link>}
              <span style={{ color: '#888', fontSize: 14 }}>Hi, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className='btn btn-outline' style={{ padding: '8px 16px', fontSize: 14 }}>Logout</button>
            </>
          ) : (
            <>
              <Link to='/login' className='btn btn-outline' style={{ padding: '8px 16px', fontSize: 14 }}>Login</Link>
              <Link to='/register' className='btn btn-primary' style={{ padding: '8px 16px', fontSize: 14 }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;