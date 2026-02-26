import React from "react";

export default function AdminSidebar({ onSelect }) {
  return (
    <div style={styles.sidebar}>
      <h3>Admin Panel</h3>

      <button onClick={() => onSelect("products")}>
        📦 Products
      </button>

      <button onClick={() => onSelect("users")}>
        👤 Users
      </button>

      <button onClick={() => onSelect("orders")}>
  🧾 Orders
</button>

    </div>
  );
}



const styles = {
  sidebar: {
    width: "220px",
    background: "#3e2723",
    color: "#fff",
    padding: "20px",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "20px",
  },
  btn: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "none",
    cursor: "pointer",
  },
  activeBtn: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    background: "#d7ccc8",
    border: "none",
    cursor: "pointer",
  },
};
