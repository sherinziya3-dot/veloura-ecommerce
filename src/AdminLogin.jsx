import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const savedSession = localStorage.getItem("Veloura_session");
    if (savedSession) {
      const session = JSON.parse(savedSession);
      // ✅ Corrected isLoggedIn capitalization
      if (session.isLoggedIn && session.role === "admin") {
        navigate("/admin", { replace: true }); // Redirect automatically
      }
    }
  }, [navigate]);

  const [adminData, setAdminData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ Ensure using http, not https
      const res = await fetch(
        `http://localhost:5000/admins?username=${adminData.username}&password=${adminData.password}`
      );

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        alert("❌ Invalid admin credentials");
        setLoading(false);
        return;
      }

      const admin = data[0];

      const session = {
        username: adminData.username,
        role: "admin",
        isLoggedIn: true, // ✅ Fixed capitalization
        loginAt: new Date().toISOString(),
      };
      localStorage.setItem("Veloura_session", JSON.stringify(session));

      alert(`🔐 Admin login successful`);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.leftShape}></div>

      <div style={styles.wrapper}>
        <h1 style={styles.brand}>Veloura Admin</h1>
        <p style={styles.tagline}>Admin Access Only 🔐</p>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.card}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Admin Username</label>
              <input
                type="text"
                name="username"
                value={adminData.username}
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
                value={adminData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.button}>
              {loading ? "Logging in..." : "Login as Admin"}
            </button>
          </form>
        </div>

        <p style={styles.footer}>
          Back to{" "}
          <span
            style={{ color: "#8B6F55", cursor: "pointer" }}
            // ✅ Optional: add navigation to user login
            onClick={() => navigate("/userlogin")}
          >
            User Login
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
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  leftShape: {
    width: "380px",
    height: "110%",
    background: "linear-gradient(180deg, #e9dbc8, #d5c0a8)",
    position: "absolute",
    left: "-80px",
    top: "-5%",
    transform: "rotate(-8deg)",
    borderRadius: "50px",
    boxShadow: "0 0 70px rgba(154,118,86,0.3)",
  },
  wrapper: {
    margin: "auto",
    width: "400px",
    textAlign: "center",
    zIndex: 10,
  },
  brand: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "46px",
    color: "#6a4a3c",
    marginBottom: "5px",
  },
  tagline: {
    fontSize: "14px",
    color: "#8c6f58",
    marginBottom: "25px",
  },
  card: {
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(12px)",
    padding: "30px 36px",
    borderRadius: "22px",
    border: "1px solid rgba(193,109,14,0.3)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  inputGroup: { textAlign: "left" },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#6a4a3c",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #d6c3b5",
    background: "#fdf9f4",
    fontSize: "14px",
    outline: "none",
    color: "#6a4a3c",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    width: "100%",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #8a6a55, #6a4a3c)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 5px 12px rgba(106,74,60,0.25)",
    transition: "0.3s",
  },
  footer: {
    marginTop: "22px",
    fontSize: "12px",
    color: "#8c6f58",
  },
};
