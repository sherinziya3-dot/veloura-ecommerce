 import React, { useEffect, useState } from "react";
import { getSession } from "../utils/isAuthenticated";

export default function Orders() {
  const session = getSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders =
      JSON.parse(localStorage.getItem("Veloura_orders")) || [];

    // show only logged-in user's orders
    const userOrders = session
      ? allOrders.filter(o => o.userEmail === session.user.email)
      : [];

    setOrders(userOrders);
  }, [session]);

  if (!orders.length) {
    return (
      <div style={styles.empty}>
        <h2>No Orders Yet</h2>
        <p>Your placed orders will appear here</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>My Orders</h2>

      {orders.map(order => (
        <div key={order.id} style={styles.orderCard}>
          {/* HEADER */}
          <div style={styles.header}>
            <span>Order ID: #{order.id}</span>
            <span style={styles.status}>{order.status}</span>
          </div>

          {/* ITEMS */}
          {order.items.map(item => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.img} />

              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>Qty: {item.qty}</p>
              </div>

              <strong>₹{item.price * item.qty}</strong>
            </div>
          ))}

          {/* FOOTER */}
          <div style={styles.footer}>
            <span>
              Ordered on:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
            <strong>Total: ₹{order.total}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "#f6efe7",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    color: "#6a4a3c",
    marginBottom: "25px",
  },
  orderCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    fontWeight: "600",
  },
  status: {
    color: "#8a6a55",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },
  img: {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
    objectFit: "cover",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    fontWeight: "600",
  },
  empty: {
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#6a4a3c",
  },
};