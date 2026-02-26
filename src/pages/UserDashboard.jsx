import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { getSession } from "../utils/isAuthenticated";
import ProductList from "../components/ProductList";

export default function UserDashboard() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const session = getSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      const userOrders =
        JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
      setOrders(userOrders);
    }
  }, [userId]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✨ Your Veloura Dashboard ✨</h1>

      {/* TOP BUTTONS */}
      <div style={styles.topButtons}>
        <button
          style={styles.topBtn}
          onClick={() => {
            setShowCart(!showCart);
            setShowWishlist(false);
          }}
        >
          🛒 Cart ({cart.length})
        </button>

        <button
          style={styles.topBtn}
          onClick={() => {
            setShowWishlist(!showWishlist);
            setShowCart(false);
          }}
        >
          ❤️ Wishlist ({wishlist.length})
        </button>

        <button
          style={styles.topBtn}
          onClick={() => navigate("/orders")}
        >
          📦 Orders
        </button>
      </div>

      {/* PRODUCTS */}
      <section style={styles.section}>
        <h2>🛍️ Shop Products</h2>
        <ProductList />
      </section>

      {/* CART */}
      {showCart && (
        <section style={styles.section}>
          <h2>💎 Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty 😢</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} style={styles.item}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.image}
                  />

                  <div style={styles.info}>
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>

                    <div>
                      <button
                        onClick={() => decreaseQty(item.id)}
                        style={styles.qtyBtn}
                      >
                        -
                      </button>
                      <span style={{ margin: "0 8px" }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        style={styles.qtyBtn}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <h3>Total: ₹{totalPrice}</h3>
              <button
                onClick={() => navigate("/checkout")}
                style={styles.checkoutBtn}
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                style={styles.clearBtn}
              >
                Clear Cart
              </button>
            </>
          )}
        </section>
      )}

      {/* WISHLIST */}
      {showWishlist && (
        <section style={styles.section}>
          <h2>❤️ Wishlist</h2>

          {wishlist.length === 0 ? (
            <p>Your wishlist is empty 😢</p>
          ) : (
            <>
              {wishlist.map((item) => (
                <div key={item.id} style={styles.item}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.image}
                  />
                  <div style={styles.info}>
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    style={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                onClick={clearWishlist}
                style={styles.clearBtn}
              >
                Clear Wishlist
              </button>
            </>
          )}
        </section>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    color: "#6a4a3c",
    marginBottom: 20,
    fontFamily: "'Playfair Display', serif",
  },
  topButtons: {
    display: "flex",
    justifyContent: "center",
    gap: 15,
    marginBottom: 30,
    flexWrap: "wrap",
  },
  topBtn: {
    background: "#6a4a3c",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
  },
  section: { marginBottom: 40 },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    marginBottom: 15,
    padding: 12,
    borderRadius: 12,
    background: "rgba(255,255,255,0.8)",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  },
  image: {
    width: 80,
    height: 80,
    objectFit: "cover",
    borderRadius: 10,
  },
  info: { flex: 1 },
  qtyBtn: {
    padding: "4px 8px",
    borderRadius: 6,
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  removeBtn: {
    background: "#d5885d",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
  clearBtn: {
    marginTop: 10,
    background: "#8c6f58",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 10,
    cursor: "pointer",
  },
  checkoutBtn: {
    marginTop: 10,
    background: "#6a4a3c",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 10,
    cursor: "pointer",
  },
};
