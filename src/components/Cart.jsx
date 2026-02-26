import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart, totalAmount } = useCart();

  if (cart.length === 0) {
    return <h3 style={{ textAlign: "center", marginTop: "50px" }}>Your cart is empty</h3>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Your Cart</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cart.map(item => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "10px" }}>
            <img src={item.image} alt={item.name} style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "10px" }} />
            <div style={{ flex: 1 }}>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              {/* Quantity Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button onClick={() => decreaseQty(item.id)} style={qtyBtnStyle}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)} style={qtyBtnStyle}>+</button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)} style={{ background: "#955225ff", color: "white", padding: "8px 14px", border: "none", borderRadius: "8px", cursor: "pointer" }}>Remove</button>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "30px" }}>Total: ₹{totalAmount()}</h3>

      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        <button onClick={clearCart} style={btnStyle}>Clear Cart</button>
        <button onClick={() => navigate("/checkout")} style={btnStyle}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "12px 25px",
  borderRadius: "10px",
  border: "none",
  background: "#955225ff",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600
};

const qtyBtnStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  border: "1px solid #8a6a55",
  background: "#fff",
  cursor: "pointer",
  fontWeight: "600"
};
