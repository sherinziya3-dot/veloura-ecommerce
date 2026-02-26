// src/pages/admin/OrderManagement.jsx
import React, { useEffect, useState } from "react";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("Veloura_orders")) || [];
    setOrders(stored);
  }, []);

  // Update order status
  const updateStatus = (id, status) => {
    const updated = orders.map(order =>
      order.id === id ? { ...order, status } : order
    );
    setOrders(updated);
    localStorage.setItem("Veloura_orders", JSON.stringify(updated));
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Order Management</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div style={styles.table}>
          {orders.map(order => (
            <div key={order.id} style={styles.row}>
              <div><strong>Order ID:</strong> {order.id}</div>
              <div><strong>User:</strong> {order.userEmail}</div>
              <div><strong>Total:</strong> ₹{order.total}</div>
              <div>
                <strong>Status:</strong>{" "}
                <span style={styles.badge(order.status)}>{order.status}</span>
              </div>

              <div style={styles.actions}>
                <button onClick={() => updateStatus(order.id, "Pending")} style={{...styles.btn, background:"#f5c6cb"}}>Pending</button>
                <button onClick={() => updateStatus(order.id, "Shipped")} style={{...styles.btn, background:"#ffe0b2"}}>Shipped</button>
                <button onClick={() => updateStatus(order.id, "Delivered")} style={{...styles.btn, background:"#c8e6c9"}}>Delivered</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "40px", minHeight: "100vh", background: "#f6efe7" },
  title: { fontSize: "30px", color: "#6a4a3c", marginBottom: "25px" },
  table: { display: "flex", flexDirection: "column", gap: "20px" },
  row: {
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  actions: { marginTop: "12px", display: "flex", gap: "10px" },
  badge: status => ({
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    background:
      status === "Delivered"
        ? "#c8e6c9"
        : status === "Shipped"
        ? "#ffe0b2"
        : "#f5c6cb",
  }),
  btn: {
    padding: "8px 16px",
    borderRadius: "10px",
    border: "none",
    color: "#000",
    cursor: "pointer",
    fontWeight: "600",
  },
};
