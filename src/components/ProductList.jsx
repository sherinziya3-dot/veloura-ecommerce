import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = products
    .filter(product => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || product.category === category;

      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ textAlign: "center" }}>Our Products</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search jewellery..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* FILTER */}
      <div style={styles.controls}>
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Premium")}>Premium</button>
        <button onClick={() => setCategory("Sports")}>Sports</button>

        {/* SORT */}
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div style={styles.grid}>
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  search: {
    width: "100%",
    maxWidth: "400px",
    padding: "12px",
    margin: "20px auto",
    display: "block",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};
