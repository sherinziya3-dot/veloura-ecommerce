import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts, updateProduct } from "../utils/api";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProducts().then((data) =>
      setProduct(data.find((p) => String(p.id) === id))
    );
  }, [id]);

  if (!product) return null;

  const save = async (e) => {
    e.preventDefault();
    await updateProduct(id, product);
    navigate("/admin-dashboard");
  };

  return (
    <form onSubmit={save} style={styles.form}>
      <h3>Edit Product</h3>

      {["name", "price", "category", "image"].map((f) => (
        <input
          key={f}
          value={product[f]}
          onChange={(e) =>
            setProduct({ ...product, [f]: e.target.value })
          }
        />
      ))}

      <button>Save</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: 400,
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
};
