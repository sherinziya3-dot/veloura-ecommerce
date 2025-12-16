import React,{ useState } from "react";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";

export default function Register() {
  const [page, setPage] = useState("register"); // "register", "user", "admin"
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
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
        createdAt: new Date().toISOString()
      })
    });

    setLoading(false);

    if (response.ok) {
      alert("✨ Welcome to Veloura Necklace! Your account is ready.");
    } else {
      alert("Something went wrong. Try again.");
    }
  }

  return (
    <div>
      {page === "register" && (
        <div style={styles.page}>
          <div style={styles.leftShape}></div>

          <div style={styles.formWrapper}>
            <h1 style={styles.brand}>Veloura Necklace</h1>
            <p style={styles.subtitle}>Where Daily Elegance Begins ✨</p>

            <div style={styles.formCard}>
              <h2 style={styles.title}>Create Your Account</h2>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input type="text" style={styles.input} name="name" onChange={handleChange} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input type="email" style={styles.input} name="email" onChange={handleChange} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input type="password" style={styles.input} name="password" onChange={handleChange} />
              </div>

              {/* ✅ Fixed: added type="button" and corrected CSS */}
              <button type="button" style={styles.button} onClick={handleSubmit}>
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>

            <p style={styles.footer}>© 2025 VelouraNecklace — Designed with Love & Elegance</p>
          </div>
        </div>
      )}

      {page === "user" && <UserLogin />}
      {page === "admin" && <AdminLogin />}

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <button onClick={() => setPage("register")} style={toggleButtonStyle}>Register</button>
        <button onClick={() => setPage("user")} style={toggleButtonStyle}>User Login</button>
        <button onClick={() => setPage("admin")} style={toggleButtonStyle}>Admin Login</button>
      </div>
    </div>
  );
}

const styles = {
  page: { height: "100vh", width: "100%", display: "flex", background: "linear-gradient(135deg, #f6efe7, #f2e9df)", overflow: "hidden", position: "relative", fontFamily: "'Inter', sans-serif" },
  leftShape: { width: "380px", height: "110%", background: "linear-gradient(180deg, #d5c0a8, #e9dbc8)", position: "absolute", left: "-80px", top: "-5%", transform: "rotate(-8deg)", borderRadius: "40px", boxShadow: "0 0 60px rgba(154,118,86,0.3)" },
  formWrapper: { margin: "auto", width: "400px", textAlign: "center", zIndex: 10 },
  brand: { fontFamily: "'Playfair Display', serif", fontSize: "42px", color: "#6a4a3c", marginBottom: "5px" },
  subtitle: { fontSize: "14px", color: "#8c6f58", marginBottom: "25px" },
  formCard: { background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", padding: "28px 32px", borderRadius: "22px", boxShadow: "0 10px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(193, 109, 14, 0.4)", display: "flex", flexDirection: "column", gap: "15px" },
  title: { fontFamily: "'Playfair Display', serif", fontSize: "24px", marginBottom: "10px", color: "#6a4a3c" },
  inputGroup: { textAlign: "left" },
  label: { fontSize: "13px", fontWeight: "600", marginBottom: "5px", color: "#6a4a3c" },
  input: { width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #d6c3b5", outline: "none", background: "#fdf9f4", fontSize: "14px" },
  button: { marginTop: "10px", padding: "12px", width: "100%", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #8a6a55, #6a4a3c)", color: "white", fontSize: "16px", fontWeight: 600, cursor: "pointer" },
  footer: { marginTop: "15px", fontSize: "12px", color: "#6a4a3c" }
};

const toggleButtonStyle = {
  padding: "10px 18px",
  margin: "0 8px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#6a4a3c",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer"
};
