import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading product...</p>;

  const handleCart = () => {
    if (!isAuthenticated()) {
      alert("Please login to add items to cart 💎");
      navigate("/login");
      return;
    }
    addToCart(product);
    alert("💎 Item added to cart!");
  };

  const handleWishlist = () => {
    if (!isAuthenticated()) {
      alert("Please login to add items to wishlist ❤️");
      navigate("/login");
      return;
    }
    addToWishlist(product);
    alert("❤️ Item added to wishlist!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageWrapper}>
        <img src={product.image} alt={product.name} style={styles.image} />
      </div>

      <div style={styles.details}>
        <h1 style={styles.name}>{product.name}</h1>
        <p style={styles.category}>{product.category || "General"}</p>
        <h2 style={styles.price}>₹{product.price}</h2>
        <p style={styles.description}>
          {product.description || "No description available for this product."}
        </p>

        <div style={styles.buttons}>
          <button style={{ ...styles.button, background: "#6a4a3c" }} onClick={handleCart}>
            Add to Cart
          </button>
          <button style={{ ...styles.button, background: "#d5885d" }} onClick={handleWishlist}>
            ❤️ Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

// Professional styles
const styles = {
  container: {
    maxWidth: 1000,
    margin: "50px auto",
    display: "flex",
    gap: 40,
    flexWrap: "wrap",
    padding: "0 20px",
    fontFamily: "'Inter', sans-serif",
  },
  imageWrapper: {
    flex: 1,
    minWidth: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 20,
    objectFit: "cover",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  },
  details: {
    flex: 1,
    minWidth: 300,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    color: "#6a4a3c",
    fontFamily: "'Playfair Display', serif",
  },
  category: {
    fontSize: 14,
    color: "#8c6f58",
  },
  price: {
    fontSize: 24,
    color: "#6a4a3c",
    fontWeight: 600,
  },
  description: {
    fontSize: 16,
    color: "#6a4a3c",
    lineHeight: 1.6,
  },
  buttons: {
    display: "flex",
    gap: 15,
    marginTop: 20,
  },
  button: {
    padding: "12px 20px",
    borderRadius: 12,
    border: "none",
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    flex: 1,
  },
};
