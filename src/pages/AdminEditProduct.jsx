import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PRODUCT_KEY = "Veloura_products";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    active: true,
  });

  /* ================= LOAD PRODUCT ================= */

  useEffect(() => {
    const products =
      JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];

    const product = products.find(
      p => p.id === Number(id)
    );

    if (!product) {
      alert("Product not found");
      navigate("/admin-dashboard");
      return;
    }

    setForm({
      ...product,
      price: Number(product.price),
      active: product.active !== false, // ✅ safety
    });
  }, [id, navigate]);

  /* ================= SAVE ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const products =
      JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];

    const duplicate = products.find(
      p =>
        p.name.toLowerCase() === form.name.toLowerCase() &&
        p.id !== Number(id)
    );

    if (duplicate) {
      alert("Product with same name already exists");
      return;
    }

    const updatedProducts = products.map(p =>
      p.id === Number(id)
        ? {
            ...p,
            ...form,
            id: Number(id),
            price: Number(form.price), // ✅ FIX
          }
        : p
    );

    localStorage.setItem(
      PRODUCT_KEY,
      JSON.stringify(updatedProducts)
    );

    alert("Product updated successfully ✅");
    navigate("/admin-dashboard");
  };

  return (
    <div style={styles.container}>
      <h2>✏️ Edit Product</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          value={form.name}
          onChange={e =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Product Name"
          required
        />

        <input
          type="number"
          value={form.price}
          onChange={e =>
            setForm({ ...form, price: e.target.value })
          }
          placeholder="Price"
          required
        />

        <select
          value={form.category}
          onChange={e =>
            setForm({ ...form, category: e.target.value })
          }
          required
        >
          <option value="">Select Category</option>
          <option value="Necklace">Necklace</option>
          <option value="Bracelet">Bracelet</option>
          <option value="Ring">Ring</option>
        </select>

        <textarea
          value={form.description}
          onChange={e =>
            setForm({ ...form, description: e.target.value })
          }
          placeholder="Description"
        />

        <input
          value={form.image}
          onChange={e =>
            setForm({ ...form, image: e.target.value })
          }
          placeholder="Image URL"
        />

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={form.active}
            onChange={e =>
              setForm({ ...form, active: e.target.checked })
            }
          />
          Product Active
        </label>

        <button type="submit" style={styles.saveBtn}>
          💾 Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin-dashboard")}
          style={styles.cancelBtn}
        >
          ❌ Cancel
        </button>
      </form>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    padding: 30,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    fontFamily: "Inter, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
  },
  saveBtn: {
    background: "#6a4a3c",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  cancelBtn: {
    background: "#eee",
    border: "none",
    padding: "10px",
    borderRadius: 10,
    cursor: "pointer",
  },
};
