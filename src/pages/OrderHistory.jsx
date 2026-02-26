import React from "react";
import { getSession } from "../utils/isAuthenticated";

export default function OrderHistory() {
  const session = getSession();
  const userId = session?.user?.id;
  const allOrders = JSON.parse(localStorage.getItem("Veloura_orders")) || [];
  const userOrders = allOrders.filter(o => o.userId === userId);

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#6a4a3c", fontFamily: "'Playfair Display', serif" }}>📦 Your Orders</h1>
      {userOrders.length === 0 ? (
        <p style={{ textAlign: "center" }}>You have no orders yet 😢</p>
      ) : (
        userOrders.map(order => (
          <div key={order.id} style={{ padding: 15, marginBottom: 15, border: "1px solid #ccc", borderRadius: 10 }}>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.items.map(i => (
                <li key={i.id}>{i.name} x {i.qty} - ₹{i.price * i.qty}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
