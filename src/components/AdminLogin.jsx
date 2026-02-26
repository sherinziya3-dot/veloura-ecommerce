import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSession } from "../utils/isAuthenticated";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
      const res = await fetch(
        `http://localhost:5000/admins?username=${form.username}&password=${form.password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        // ✅ Admin authenticated
        setSession({
          user: { username: data[0].username, role: "admin" },
        });
        navigate("/admin-dashboard", { replace: true }); // Prevent back navigation
      } else {
        alert("Invalid Admin Credentials");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div style={styles.page}>
      <div style={styles.formWrapper}>
        <h1 style={styles.brand}>Veloura Admin</h1>
        <p style={styles.subtitle}>Admin Access Only 🔐</p>

        <div style={styles.formCard}>
          <h2 style={styles.title}>Admin Login</h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
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

          <button style={styles.button} onClick={handleSubmit}>
            {loading ? "Checking..." : "Login as Admin"}
          </button>
          
        </div>
        
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
    background: "linear-gradient(135deg, #f6efe7, #e0d4c3)", // Dual-tone premium gradient
    backgroundBlendMode: "overlay",
    backgroundAttachment: "fixed",
  },
  formWrapper: {
    width: "400px",
    textAlign: "center",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 12px 50px rgba(0,0,0,0.15)", // soft shadow for luxury feel
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  brand: { fontSize: "40px", color: "#6a4a3c", fontWeight: "700" },
  subtitle: { fontSize: "14px", color: "#8c6f58", marginBottom: "25px" },
  formCard: {
    background: "rgba(255,255,255,0.95)",
    padding: "28px 32px",
    borderRadius: "22px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
  },
  title: { fontSize: "22px", color: "#6a4a3c", marginBottom: "15px" },
  inputGroup: { marginBottom: "15px", textAlign: "left" },
  label: { fontSize: "13px", fontWeight: 600, color: "#6a4a3c" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d6c3b5",
    background: "#fdf9f4",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #8a6a55, #6a4a3c)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};
