import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = (product, quantity = 1) => {
    const exists = cartItems.find(i => i.product === product._id);
    if (exists) {
      saveCart(cartItems.map(i =>
        i.product === product._id ? { ...i, quantity: i.quantity + quantity } : i
      ));
    } else {
      saveCart([...cartItems, {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      }]);
    }
  };

  const removeFromCart = (productId) => {
    saveCart(cartItems.filter(i => i.product !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    saveCart(cartItems.map(i => i.product === productId ? { ...i, quantity } : i));
  };

  const clearCart = () => saveCart([]);

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);