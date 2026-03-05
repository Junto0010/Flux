import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const config = { headers: { Authorization: `Bearer ${user?.token}` } };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/orders', config);
      setOrders(data);
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, config);
      toast.success('Status updated!');
      fetchOrders();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  if (loading) return <div className='loading'>Loading...</div>;

  return (
    <div className='container' style={{ padding: '60px 24px' }}>
      <h1 className='page-title'>Manage Orders</h1>
      <div style={{ marginTop: 40 }}>
        <table>
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td style={{ fontFamily: 'Courier New', fontSize: 12, color: '#888' }}>{order._id.slice(-8)}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{order.user?.name || 'N/A'}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{order.user?.email}</div>
                </td>
                <td style={{ fontSize: 13, color: '#888' }}>{order.items.length} item(s)</td>
                <td style={{ color: '#e8c547', fontWeight: 700 }}>${order.totalPrice?.toFixed(2)}</td>
                <td>
                  <select className='input' style={{ padding: '6px 12px', width: 'auto', fontSize: 13 }}
                    value={order.status} onChange={e => updateStatus(order._id, e.target.value)}>
                    {['Pending', 'Processing', 'Completed', 'Cancelled'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td style={{ fontSize: 12, color: '#888' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <div className='loading'>No orders yet.</div>}
      </div>
    </div>
  );
};

export default AdminOrders;