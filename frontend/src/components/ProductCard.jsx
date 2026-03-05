import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to add to cart'); return; }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/products/${product._id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div className='card' style={{ padding: 0, overflow: 'hidden', transition: 'transform 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
        onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{product.category}</div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, marginBottom: 8 }}>{product.name}</h3>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 16, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{product.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#e8c547' }}>${product.price}</span>
            <button className='btn btn-primary' style={{ padding: '8px 16px', fontSize: 13 }} onClick={handleAdd}>Add to Cart</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;