import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add some items first 💎");
      return;
    }
    alert("✨ Order placed successfully!");
    clearCart();
    navigate("/user");
  };

  if (cart.length === 0) return <p style={{ textAlign: "center", marginTop: 50 }}>Your cart is empty 💎</p>;

  return (
    <div style={styles.container}>
      <h1>Checkout</h1>
      <div style={styles.cartList}>
        {cart.map(item => (
          <div key={item.id} style={styles.cartItem}>
            <img src={item.image} alt={item.name} style={styles.image} />
            <div style={styles.details}>
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <div style={styles.qty}>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
              <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <h2>Total: ₹{totalAmount}</h2>
      <button style={styles.placeOrderBtn} onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: "50px auto",
    padding: "0 20px",
    fontFamily: "'Inter', sans-serif",
  },
  cartList: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginBottom: 30,
  },
  cartItem: {
    display: "flex",
    gap: 20,
    padding: 20,
    borderRadius: 15,
    background: "rgba(255,255,255,0.8)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  },
  image: {
    width: 120,
    height: 120,
    objectFit: "cover",
    borderRadius: 12,
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  qty: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
  removeBtn: {
    marginTop: 10,
    padding: "6px 12px",
    border: "none",
    borderRadius: 10,
    background: "#d5885d",
    color: "#fff",
    cursor: "pointer",
    width: 100,
  },
  placeOrderBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: 12,
    background: "#6a4a3c",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 16,
    width: "100%",
  },
};
