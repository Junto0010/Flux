import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Other'];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category !== 'All') params.category = category;
      const { data } = await axios.get('https://flux-backend-hu18.onrender.com/api/products', { params });
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [category]);

  return (
    <div className='container' style={{ padding: '60px 24px' }}>
      <h1 className='page-title'>Our Products</h1>
      <p style={{ color: '#888', marginBottom: 40 }}>Discover our curated collection</p>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
        <input className='input' style={{ maxWidth: 320 }} placeholder='Search products...'
          value={search} onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchProducts()} />
        <button className='btn btn-primary' onClick={fetchProducts}>Search</button>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className='btn' style={{
                padding: '8px 16px', fontSize: 13,
                background: category === cat ? '#e8c547' : 'transparent',
                color: category === cat ? '#000' : '#f5f5f5',
                border: '1px solid ' + (category === cat ? '#e8c547' : '#2e2e2e'),
              }}>{cat}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className='loading'>Loading products...</div>
      ) : products.length === 0 ? (
        <div className='loading'>No products found.</div>
      ) : (
        <div className='grid-3'>
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;