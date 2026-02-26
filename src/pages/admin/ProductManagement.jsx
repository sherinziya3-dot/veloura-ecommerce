import React, { useState, useEffect } from "react";
import "./admin.css";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  // 🔹 FETCH PRODUCTS (SAME AS USER SIDE)
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const refreshProducts = () => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 ADD / UPDATE PRODUCT
  const handleAddOrUpdate = () => {
    if (!form.name || !form.price) {
      alert("All fields required");
      return;
    }

    if (editId) {
      fetch(`http://localhost:5000/products/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editId,
          ...form,
          price: Number(form.price),
          active: true,
        }),
      }).then(() => {
        refreshProducts();
        setEditId(null);
      });
    } else {
      fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now(),
          ...form,
          price: Number(form.price),
          active: true, // 🔥 IMPORTANT
        }),
      }).then(refreshProducts);
    }

    setForm({ name: "", price: "", category: "", image: "" });
  };

  const editProduct = (product) => {
    setForm(product);
    setEditId(product.id);
  };

  // 🔹 ENABLE / DISABLE (SOFT DELETE)
  const toggleStatus = (product) => {
    fetch(`http://localhost:5000/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !product.active }),
    }).then(refreshProducts);
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Product Management</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />

        <button onClick={handleAddOrUpdate} style={styles.save}>
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div style={styles.grid}>
        {products.map(p => (
          <div key={p.id} style={{ ...styles.card, opacity: p.active ? 1 : 0.4 }}>
            <img src={p.image} alt={p.name} style={styles.img} />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <p>{p.category}</p>

            <div style={styles.actions}>
              <button onClick={() => editProduct(p)} style={styles.edit}>Edit</button>
              <button onClick={() => toggleStatus(p)} style={styles.delete}>
                {p.active ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const styles = {
  page: { padding: "40px", background: "#f6efe7", minHeight: "100vh" },
  title: { fontSize: "30px", color: "#6a4a3c", marginBottom: "25px" },

  form: {
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
    gap: "15px",
    marginBottom: "30px",
  },
  save: {
    gridColumn: "1/-1",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#6a4a3c",
    color: "#fff",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
    gap: "25px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  img: {
    width: "100%",
    height: "180px",
    borderRadius: "14px",
    objectFit: "cover",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  edit: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "#8a6a55",
    color: "#fff",
    cursor: "pointer",
  },
  delete: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "#d6c3b5",
    cursor: "pointer",
  },
};