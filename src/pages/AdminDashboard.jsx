
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, logout } from "../utils/isAuthenticated";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const session = getSession();

  const handleLogout = () => {
    logout();
    navigate("/admin-login", { replace: true }); // prevents back navigation
  };

  // Prevent browser back after logout
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePop = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const cards = [
    { title: "Manage Users", icon: "👤", path: "/admin-users" },
    { title: "Manage Products", icon: "📦", path: "/admin-products" },
    { title: "View Orders", icon: "🧾", path: "/admin-orders" },
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <p style={styles.sub}>Welcome, {session?.user?.username}</p>

      <div style={styles.grid}>
        {cards.map((c, i) => (
          <div key={i} style={styles.card} onClick={() => navigate(c.path)}>
            <span style={styles.icon}>{c.icon}</span>
            <h3>{c.title}</h3>
          </div>
        ))}
      </div>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    minHeight: "100vh",
    textAlign: "center",
    background: "#f6efe7",
  },
  title: { color: "#6a4a3c", fontSize: "32px" },
  sub: { marginBottom: "30px", color: "#8c6f58" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  icon: { fontSize: "32px", display: "block", marginBottom: "10px" },
  logout: {
    padding: "12px 30px",
    borderRadius: "12px",
    border: "none",
    background: "#6a4a3c",
    color: "#fff",
    cursor: "pointer",
  },
};