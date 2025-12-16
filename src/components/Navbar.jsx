import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav style={styles.nav}>
      {/* Brand */}
      <h2 style={styles.brand}>Veloura</h2>

      {/* Links */}
      <div style={styles.links}>
        <Link to="/user" style={styles.link}>Shop</Link>

        <Link to="/user" style={styles.link}>
          🛒 Cart
          {cart.length > 0 && <span style={styles.badge}>{cart.length}</span>}
        </Link>

        <Link to="/user" style={styles.link}>
          ❤️ Wishlist
          {wishlist.length > 0 && (
            <span style={styles.badge}>{wishlist.length}</span>
          )}
        </Link>

        <Link to="/logout" style={styles.logout}>
          Logout
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    height: "70px",
    background: "linear-gradient(135deg, #f6efe7, #f2e9df)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    fontFamily: "'Inter', sans-serif",
  },
  brand: {
    fontFamily: "'Playfair Display', serif",
    color: "#6a4a3c",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#6a4a3c",
    fontWeight: "600",
    position: "relative",
  },
  logout: {
    textDecoration: "none",
    color: "#fff",
    background: "#6a4a3c",
    padding: "8px 14px",
    borderRadius: "10px",
    fontWeight: "600",
  },
  badge: {
    background: "#d5885d",
    color: "#fff",
    borderRadius: "50%",
    padding: "2px 8px",
    fontSize: "12px",
    marginLeft: "6px",
  },
};
