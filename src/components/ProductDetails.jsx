import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  const discount =
    product.mrp
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src={product.image} alt={product.name} style={styles.image} />

        <div style={styles.info}>
          <h2>{product.name}</h2>
          <p style={styles.desc}>{product.description}</p>

          {/* PRICE BOX */}
          <div style={styles.priceBox}>
            {product.mrp && (
              <span style={styles.mrp}>₹{product.mrp}</span>
            )}
            <span style={styles.price}>₹{product.price}</span>
            {discount > 0 && (
              <span style={styles.discount}>{discount}% OFF</span>
            )}
          </div>

          {/* QUANTITY */}
          <div style={styles.qty}>
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          {/* ACTIONS */}
          <div style={styles.actions}>
            <button
              style={styles.cartBtn}
              onClick={() => {
                addToCart({ ...product, qty });
                navigate("/cart");
              }}
            >
              Add to Cart
            </button>

            <button
              style={styles.wishlistBtn}
              onClick={() => addToWishlist(product)}
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "50px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    gap: "40px",
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
    maxWidth: "900px",
  },
  image: {
    width: "320px",
    height: "320px",
    objectFit: "cover",
    borderRadius: "18px",
  },
  info: {
    flex: 1,
  },
  desc: {
    fontSize: "14px",
    color: "#666",
    margin: "10px 0 20px",
  },
  priceBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 18px",
    borderRadius: "14px",
    background: "#fdf6f0",
    width: "fit-content",
    marginBottom: "20px",
  },
  mrp: {
    textDecoration: "line-through",
    color: "#999",
  },
  price: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#6a4a3c",
  },
  discount: {
    background: "#6a4a3c",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "10px",
    fontSize: "12px",
  },
  qty: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px",
  },
  actions: {
    display: "flex",
    gap: "15px",
  },
  cartBtn: {
    padding: "12px 24px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg,#9c4c26,#5a2f1b)",
    color: "#fff",
    cursor: "pointer",
  },
  wishlistBtn: {
    padding: "12px 24px",
    borderRadius: "14px",
    border: "none",
    background: "#d6b27b",
    color: "#fff",
    cursor: "pointer",
  },
};