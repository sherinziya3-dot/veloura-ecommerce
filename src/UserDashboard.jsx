import React from "react";
import Navbar from "./components/Navbar"; // default export
import ProductList from "./components/ProductList"; // default export
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <Navbar />

      {/* Product Listing */}
      <ProductList />

      {/* Cart Summary */}
      <div style={{ padding: 30, maxWidth: 600, margin: "40px auto", borderTop: "2px solid #e6e2de" }}>
        <h2>My Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <p>{item.name} × {item.qty}</p>
                <p>₹{item.price * item.qty}</p>
              </div>
            ))}
            <h3>Total: ₹{cartTotal}</h3>
            <button
              onClick={() => navigate("/checkout")}
              style={{ marginTop: 10, padding: "10px 15px", background: "#6a4a3c", color: "#fff", border: "none", borderRadius: 10 }}
            >
              Go to Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
}
