import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:id' element={<ProductDetailPage />} />
            <Route path='/cart' element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path='/checkout' element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path='/order-success' element={<ProtectedRoute><OrderSuccessPage /></ProtectedRoute>} />
            <Route path='/admin' element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
            <Route path='/admin/products' element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>} />
            <Route path='/admin/orders' element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
          </Routes>
          <ToastContainer theme='dark' position='bottom-right' />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;