import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✅ Fixed localStorage key typo
    const savedSession = localStorage.getItem("Veloura_session");
    if (savedSession) {
      const session = JSON.parse(savedSession);
      if (session.isLoggedIn && session.role === "user") {
        navigate("/user", { replace: true });
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${form.email}&password=${form.password}`
      );

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        alert("❌ Invalid email or password");
        setLoading(false);
        return;
      }
      const user = data[0];

      const session = {
        id: user.id,
        email: user.email,
        role: "user", // ✅ Ensure role is "user" for ProtectedRoute
        isLoggedIn: true,
        loginAt: new Date().toISOString(),
      };

      localStorage.setItem("Veloura_session", JSON.stringify(session));

      setLoading(false);
      navigate("/user");
    } catch (error) {
      console.error("Login error:", error);
      alert("⚠️ Server error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.leftShape}></div>

      <div style={styles.formWrapper}>
        <h1 style={styles.brand}>Veloura Necklace</h1>
        <p style={styles.subtitle}>Login to your account ✨</p>

        <form style={styles.formCard} onSubmit={handleSubmit}>
          <h2 style={styles.title}>User Login</h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              style={styles.input}
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              style={styles.input}
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <span
            style={{ color: "#8B6F55", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100%",
    display: "flex",
    background: "linear-gradient(135deg, #f6efe7, #f2e9df)",
    overflow: "hidden",
    position: "relative",
    fontFamily: "'Inter', sans-serif",
  },
  leftShape: {
    width: "380px",
    height: "110%",
    background: "linear-gradient(180deg, #d5c0a8, #e9dbc8)",
    position: "absolute",
    left: "-80px",
    top: "-5%",
    transform: "rotate(-8deg)",
    borderRadius: "40px",
    boxShadow: "0 0 60px rgba(154,118,86,0.3)",
  },
  formWrapper: {
    margin: "auto",
    width: "400px",
    textAlign: "center",
    zIndex: 10,
  },
  brand: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "42px",
    color: "#6a4a3c",
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#8c6f58",
    marginBottom: "25px",
  },
  formCard: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    padding: "28px 32px",
    borderRadius: "22px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    border: "1px solid rgba(193,109,14,0.4)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "24px",
    marginBottom: "10px",
    color: "#6a4a3c",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "5px",
    color: "#6a4a3c",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #d6c3b5",
    outline: "none",
    background: "#fdf9f4",
    fontSize: "14px",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    width: "100%",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #8a6a55, #6a4a3c)",
    color: "white",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 5px 12px rgba(106,74,60,0.3)",
    transition: "0.3s",
  },
  footer: {
    marginTop: "22px",
    fontSize: "11px",
    color: "#8c6f58",
  },
};
