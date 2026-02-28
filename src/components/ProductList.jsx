import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";


export default function ProductList() {
  
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const[inputValue,setInputValue]=useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data.filter(p => p.active)));
  }, []);

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category === "All" ? true : p.category === category)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ padding: "40px 20px" }}>
      {/* Search + Filters */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          style={{
            width: "220px",
            padding: "12px 18px",
            borderRadius: "25px",
            border: "1px solid #d6c3b5",
            fontSize: "14px",
            outline: "none",
            background: "#fdf9f4"
          }}
        />
        <button
  onClick={() => setSearch(inputValue)}
  style={{
    padding: "12px 22px",
    borderRadius: "25px",
    border: "none",
    background: "linear-gradient(135deg, #9c4c26, #5a2f1b)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  }}
>
  Search
</button>


        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "25px",
            border: "1px solid #d6c3b5",
            background: "#fdf9f4",
            fontSize: "14px",
          }}
        >
          <option value="All">All Categories</option>
          <option value="Sports">Sports</option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
        </select>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "25px",
            border: "1px solid #d6c3b5",
            background: "#fdf9f4",
            fontSize: "14px",
          }}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>

      </div>

      {/* Products Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "25px" }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{
            padding: "20px",
            borderRadius: "18px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            textAlign: "center",
            background: "#fff"
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "200px", height: "200px", objectFit: "cover", marginBottom: "12px" }}
            />

            <h3>{product.name}</h3>

            {/* 💎 PREMIUM PRICE BOX (ADDED) */}
            <div style={styles.priceBox}>
              {product.mrp && product.mrp > product.price && (
                <div style={styles.mrp}>
                  ₹{product.mrp}
                  <span style={styles.discount}>
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </span>
                </div>
              )}
              <div style={styles.price}>₹{product.price}</div>
            </div>

            <p>{product.category}</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #9c4c26, #5a2f1b)",
                  color: "#fff",
                  cursor: "pointer"
                }}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>

              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#d6b27b",
                  color: "#fff",
                  cursor: "pointer"
                }}
                onClick={() => addToWishlist(product)}
              >
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 💎 PREMIUM PRICE STYLES (ONLY ADDITION) */
const styles = {
  priceBox: {
    margin: "10px auto",
    padding: "10px 14px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #fff1db, #e7c89a)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    display: "inline-block",
    minWidth: "130px",
  },
  mrp: {
    fontSize: "13px",
    color: "#8b6a44",
    textDecoration: "line-through",
    marginBottom: "4px",
  },
  discount: {
    marginLeft: "8px",
    padding: "2px 8px",
    fontSize: "11px",
    borderRadius: "10px",
    background: "#6a4a3c",
    color: "#fff",
    fontWeight: "600",
  },
  price: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#5a2f1b",
  },
};
  