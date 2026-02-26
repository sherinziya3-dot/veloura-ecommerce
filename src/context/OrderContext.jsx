import React, { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "../utils/isAuthenticated";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const session = getSession();
  const userId = session?.user?.id || "guest";
  const storageKey = `orders_${userId}`;

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(orders));
  }, [orders, storageKey]);

  const placeOrder = (cartItems, total) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total,
      date: new Date().toLocaleString(),
      status: "Placed",
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
