import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState("");

useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load product");
        setLoading(false);
      });
  }, [id]);

  
  const increase = () => setQty(qty + 1);
  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };
  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }

    addToCart({ ...product, qty });
    alert("Added to cart");
    navigate("/cart");
  };

  if (loading) return <p style={{ padding: "30px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "30px" }}>{error}</p>;
  if (!product) return null;

  return (
    <div style={styles.wrapper}>
      <img src={product.image} alt={product.name} style={styles.image} />

      <div style={styles.info}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>₹{product.price}</h3>

        <div style={styles.qtyBox}>
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            style={styles.qtyInput}
          />
        </div>

        <button onClick={handleAddToCart} style={styles.button}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: "40px",
    padding: "40px",
  },
  image: {
    width: "320px",
    borderRadius: "16px",
    objectFit: "cover",
  },
  info: {
    maxWidth: "400px",
  },
  qtyBox: {
    margin: "15px 0",
  },
  qtyInput: {
    marginLeft: "10px",
    width: "60px",
    padding: "5px",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#6a4a3c",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};
 