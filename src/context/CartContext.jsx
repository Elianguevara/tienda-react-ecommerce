/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('aether_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('aether_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        const newQuantity = newCart[existingItemIndex].quantity + quantity;
        
        // Ensure we don't exceed stock limits
        const maxStock = item.stock;
        newCart[existingItemIndex].quantity = Math.min(newQuantity, maxStock);
        return newCart;
      } else {
        return [...prevCart, { ...item, quantity: Math.min(quantity, item.stock) }];
      }
    });
  };

  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        clearCart,
        isInCart,
        getCartQuantity,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
