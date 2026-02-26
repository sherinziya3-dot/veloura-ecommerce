import React from "react";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Veloura Jewelry Store</h1>
      <ProductList />
    </div>
  );
}
