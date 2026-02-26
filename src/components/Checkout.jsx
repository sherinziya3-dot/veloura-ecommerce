import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getSession } from "../utils/isAuthenticated";

export default function Checkout() {
  const { cart, clearCart, totalAmount } = useCart();
  const navigate = useNavigate();
  const session = getSession();

  //  auth guard
  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, []);

  const handleCheckout = () => {
    if (!cart.length) {
      alert("Cart is empty");
      return;
    }

    const newOrder = {
      id: Date.now(),
      userEmail: session.user.email,
      items: cart,
      total: totalAmount(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const existing =
      JSON.parse(localStorage.getItem("Veloura_orders")) || [];

    localStorage.setItem(
      "Veloura_orders",
      JSON.stringify([...existing, newOrder])
    );

    clearCart(); // ✅ only cart clear
    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Checkout</h2>
      <p>Total: ₹{totalAmount()}</p>
      <button onClick={handleCheckout} style={btn}>
        Confirm Order
      </button>
    </div>
  );
}

const btn = {
  padding: "14px 40px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg,#8a6a55,#6a4a3c)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};
