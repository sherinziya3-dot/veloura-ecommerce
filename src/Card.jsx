import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setLoading(true);

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...form,
        role: "user",
        joinedAt: new Date().toISOString()
      })
    });

    setLoading(false);

    if (response.ok) {
      alert("Welcome to AuraNecklace ✨ Your account is created.");
    } else {
      alert("Something went wrong. Try again.");
    }
  }

  return (
    <div style={styles.page}>
      
      {/* BRAND */}
      <h1 style={styles.brand}>AuraNecklace</h1>
      <p style={styles.tagline}>Discover Your Daily Elegance</p>

      {/* FORM CARD */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Create Your Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email Address"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          style={styles.input}
          onChange={handleChange}
        />

        <button style={styles.button} onClick={handleSubmit}>
          {loading ? "Creating..." : "Register"}
        </button>
      </div>

      <p style={styles.footer}>© 2025 AuraNecklace. Crafted with elegance.</p>
    </div>
  );
}

const styles = {
  page: {
    background: "#f9f4ec",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    fontSize: "42px",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#6a4a3c",
    marginBottom: "5px",
    fontFamily: "'Playfair Display', serif",
  },
  tagline: {
    fontSize: "16px",
    color: "#8c6f58",
    marginBottom: "25px",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    width: "360px",
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    animation: "fadeIn 0.8s ease",
  },
  cardTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#6a4a3c",
    textAlign: "center",
    fontFamily: "'Playfair Display', serif",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d3c4b7",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    marginTop: "10px",
    background: "#6a4a3c",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "600",
  },
  footer: {
    marginTop: "25px",
    fontSize: "12px",
    color: "#8c6f58",
  },
};
