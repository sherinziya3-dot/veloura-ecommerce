import React from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleCart = () => {
    if (!isAuthenticated()) {
      alert("Please login to add items to cart 💎");
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  const handleWishlist = () => {
    if (!isAuthenticated()) {
      alert("Please login to add items to wishlist ❤️");
      navigate("/login");
      return;
    }
    addToWishlist(product);
  };

  const goToSingleProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div style={styles.card}>
      <img
        src={product.image}
        alt={product.name}
        style={styles.image}
        onClick={goToSingleProduct}
      />
      <h3 style={styles.name} onClick={goToSingleProduct}>
        {product.name}
      </h3>
      <p style={styles.price}>₹{product.price}</p>

      <div style={styles.buttonGroup}>
        <button
          style={{ ...styles.button, background: "#6a4a3c" }}
          onClick={handleCart}
        >
          Add to Cart
        </button>

        
        <button
          style={{ ...styles.button, background: "#d5885d" }}
          onClick={handleWishlist}
        >
          ❤️ Wishlist
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "220px",
    padding: "15px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
    margin: "15px",
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  name: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#6a4a3c",
    margin: "10px 0 5px",
  },
  price: {
    fontSize: "14px",
    color: "#8c6f58",
    marginBottom: "10px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
  },
  button: {
    flex: 1,
    padding: "10px 0",
    borderRadius: "12px",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};  