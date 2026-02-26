import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("Veloura_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("Veloura_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        return [...prev, { ...product, qty }];
      }
    });
  };

  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item)
    );
  };

  const decreaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalAmount = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const checkout = () => {
    if (cart.length === 0) return;

    const session = JSON.parse(localStorage.getItem("Veloura_session"));
    const userEmail = session?.user?.email || "guest";

    const newOrder = {
      id: Date.now(),
      user: userEmail,
      items: cart,
    };

    setOrders(prev => [...prev, newOrder]);
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalAmount,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

