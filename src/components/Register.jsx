 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSession } from "../utils/isAuthenticated";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Fake register logic (replace with JSON server fetch if needed)
    setTimeout(() => {
      if (form.name && form.email && form.password) {
        setSession({ user: { email: form.email, role: "user" } });
        setLoading(false);
        navigate("/"); // redirect to home/product list
      } else {
        alert("Please fill all fields");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div style={styles.page}>
      <div style={styles.formWrapper}>
        <h1 style={styles.brand}>Veloura Necklace</h1>
        <p style={styles.subtitle}>Create a new account ✨</p>

        <div style={styles.formCard}>
          <h2 style={styles.title}>Register</h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button} onClick={handleSubmit}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span
            style={{ color: "#8B6F55", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

        {/* Admin Login Link */}
        <p style={{ marginTop: "10px" }}>
          Are you an admin?{" "}
          <span
            style={{ color: "#c9a36a", cursor: "pointer", fontWeight: 600 }}
            onClick={() => navigate("/admin-login")}
          >
            Admin Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f6efe7, #f2e9df)",
    fontFamily: "'Inter', sans-serif",
  },
  formWrapper: { width: "400px", textAlign: "center" },
  brand: { fontSize: "42px", color: "#6a4a3c", marginBottom: "5px" },
  subtitle: { fontSize: "14px", color: "#8c6f58", marginBottom: "25px" },
  formCard: {
    background: "rgba(255,255,255,0.8)",
    padding: "28px 32px",
    borderRadius: "22px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: { fontSize: "24px", color: "#6a4a3c", marginBottom: "10px" },
  inputGroup: { marginBottom: "15px", textAlign: "left" },
  label: { fontSize: "13px", fontWeight: 600, color: "#6a4a3c" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d6c3b5",
    outline: "none",
    background: "#fdf9f4",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #8a6a55, #6a4a3c)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
  },
  footer: { fontSize: "12px", color: "#6a4a3c", marginTop: "15px" },
};