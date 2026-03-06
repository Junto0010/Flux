import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const EMPTY = { name: '', description: '', price: '', category: '', image: '', stock: '' };

const AdminProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const config = { headers: { Authorization: `Bearer ${user?.token}` } };

  const fetchProducts = async () => {
    const { data } = await axios.get('https://flux-backend-hu18.onrender.com/api/products');
    setProducts(data);
    setLoading(false);
  };
  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`https://flux-backend-hu18.onrender.com/api/products/${editing}`, form, config);
        toast.success('Product updated!');
      } else {
        await axios.post('https://flux-backend-hu18.onrender.com/api/products', form, config);
        toast.success('Product created!');
      }
      setForm(EMPTY);
      setEditing(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const handleEdit = (product) => {
    setEditing(product._id);
    setForm({ name: product.name, description: product.description, price: product.price, category: product.category, image: product.image, stock: product.stock });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await axios.delete(`https://flux-backend-hu18.onrender.com/api/products/${id}`, config);
    toast.success('Deleted!');
    fetchProducts();
  };

  return (
    <div className='container' style={{ padding: '60px 24px' }}>
      <h1 className='page-title'>Manage Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40, marginTop: 40 }}>
        <div className='card' style={{ alignSelf: 'start', position: 'sticky', top: 80 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, marginBottom: 24 }}>{editing ? 'Edit Product' : 'Add Product'}</h2>
          {['name', 'description', 'price', 'category', 'image', 'stock'].map(f => (
            <div className='form-group' key={f}>
              <label>{f.charAt(0).toUpperCase() + f.slice(1)}</label>
              <input className='input' name={f} value={form[f]} onChange={handleChange}
                type={f === 'price' || f === 'stock' ? 'number' : 'text'} />
            </div>
          ))}
          <button className='btn btn-primary' style={{ width: '100%', justifyContent: 'center' }} onClick={handleSubmit}>
            {editing ? 'Update Product' : 'Add Product'}
          </button>
          {editing && <button className='btn btn-outline' style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => { setEditing(null); setForm(EMPTY); }}>Cancel</button>}
        </div>
        <div>
          {loading ? <div className='loading'>Loading...</div> : (
            <table>
              <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td><img src={p.image} alt={p.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} /></td>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td style={{ color: '#e8c547' }}>${p.price}</td>
                    <td style={{ color: '#888', fontSize: 13 }}>{p.category}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button className='btn btn-outline' style={{ padding: '6px 14px', fontSize: 13, marginRight: 8 }} onClick={() => handleEdit(p)}>Edit</button>
                      <button className='btn btn-danger' style={{ padding: '6px 14px', fontSize: 13 }} onClick={() => handleDelete(p._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;