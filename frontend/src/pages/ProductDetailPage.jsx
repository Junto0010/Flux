import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://flux-backend-hu18.onrender.com/api/products/${id}`)
      .then(r => { setProduct(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    if (!user) { toast.error('Please login first'); navigate('/login'); return; }
    addToCart(product, qty);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <div className='loading'>Loading...</div>;
  if (!product) return <div className='loading'>Product not found.</div>;

  return (
    <div className='container' style={{ padding: '60px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 16, objectFit: 'cover', maxHeight: 500 }} />
        <div>
          <div style={{ color: '#888', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>{product.category}</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, marginBottom: 16 }}>{product.name}</h1>
          <p style={{ fontSize: 36, fontWeight: 700, color: '#e8c547', marginBottom: 24 }}>${product.price}</p>
          <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: 32 }}>{product.description}</p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
            <label style={{ color: '#888' }}>Quantity:</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button className='btn btn-outline' style={{ padding: '6px 14px' }} onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span style={{ minWidth: 32, textAlign: 'center', fontSize: 18 }}>{qty}</span>
              <button className='btn btn-outline' style={{ padding: '6px 14px' }} onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>
          <button className='btn btn-primary' style={{ width: '100%', justifyContent: 'center', padding: 16, fontSize: 16 }} onClick={handleAdd}>
            Add to Cart — ${(product.price * qty).toFixed(2)}
          </button>
          <div style={{ marginTop: 32, padding: 20, background: '#1a1a1a', borderRadius: 12, border: '1px solid #2e2e2e' }}>
            <p style={{ fontSize: 13, color: '#888' }}>Stock: <span style={{ color: product.stock > 0 ? '#4caf50' : '#f44336' }}>{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;