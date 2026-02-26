import React, { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("Veloura_orders")) || [];
    setOrders(stored);
  }, []);

  const updateStatus = (id, status) => {
    const updated = orders.map(o =>
      o.id === id ? { ...o, status } : o
    );
    setOrders(updated);
    localStorage.setItem("Veloura_orders", JSON.stringify(updated));
  };

  if (!orders.length) {
    return (
      <div style={styles.empty}>
        <h2>No Orders Found</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>All Orders</h2>

      {orders.map(order => (
        <div key={order.id} style={styles.card}>
          {/* HEADER */}
          <div style={styles.header}>
            <div>
              <strong>Order #{order.id}</strong>
              <p style={styles.email}>{order.userEmail}</p>
            </div>

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
            <strong>Total: ₹{order.total}</strong>

            <div style={styles.actions}>
              <button
                onClick={() => updateStatus(order.id, "Pending")}
                style={styles.pending}
              >
                Pending
              </button>

              <button
                onClick={() => updateStatus(order.id, "Shipped")}
                style={styles.shipped}
              >
                Shipped
              </button>

              <button
                onClick={() => updateStatus(order.id, "Delivered")}
                style={styles.delivered}
              >
                Delivered
              </button>
            </div>
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
    fontSize: "30px",
    color: "#6a4a3c",
    marginBottom: "25px",
  },
  card: {
    background: "#fff",
    borderRadius: "22px",
    padding: "22px",
    marginBottom: "30px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  email: {
    fontSize: "13px",
    color: "#8c6f58",
  },
  status: {
    fontWeight: "600",
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
    borderRadius: "12px",
    objectFit: "cover",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  pending: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "#d6c3b5",
    cursor: "pointer",
  },
  shipped: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "#8a6a55",
    color: "#fff",
    cursor: "pointer",
  },
  delivered: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "#6a4a3c",
    color: "#fff",
    cursor: "pointer",
  },
  empty: {
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#6a4a3c",
  },
};
