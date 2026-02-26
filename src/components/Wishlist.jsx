import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) return <p style={{ textAlign: "center", marginTop: "50px" }}>Your wishlist is empty</p>;

  return (
    <div style={{ padding: "30px 40px", minHeight: "90vh" }}>
      <h2 style={{ color: "#6a4a3c", marginBottom: "20px" }}>Your Wishlist</h2>
      {wishlist.map(item => (
        <div key={item.id} style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "15px",
          background: "rgba(255,255,255,0.8)",
          padding: "10px",
          borderRadius: "12px"
        }}>
          <img src={item.image} alt={item.name} style={{ width: "100px", borderRadius: "12px" }} />
          <div style={{ flex: 1, marginLeft: "15px" }}>
            <h4 style={{ color: "#6a4a3c" }}>{item.name}</h4>
            <p style={{ fontWeight: "600" }}>₹{item.price}</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => addToCart(item)}
              style={{
                padding: "8px 12px",
                background: "linear-gradient(135deg, #8a6a55, #6a4a3c)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => removeFromWishlist(item.id)}
              style={{
                padding: "8px 12px",
                background: "#d6b37e",
                color: "#5a3829",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
