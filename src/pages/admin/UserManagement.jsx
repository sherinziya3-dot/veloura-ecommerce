 // src/pages/admin/UserManagement.jsx
import React, { useState, useEffect } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", role: "user" });
  const [editId, setEditId] = useState(null);

  // Load users from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("Veloura_users")) || [];
    setUsers(stored);
  }, []);

  const saveUsers = (data) => {
    setUsers(data);
    localStorage.setItem("Veloura_users", JSON.stringify(data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.username || !form.email) {
      alert("All fields required");
      return;
    }

    if (editId) {
      // Edit existing user
      const updated = users.map(u =>
        u.id === editId ? { ...u, ...form } : u
      );
      saveUsers(updated);
      setEditId(null);
    } else {
      // Add new user
      const exists = users.some(u => u.email === form.email);
      if (exists) {
        alert("User already exists");
        return;
      }
      const newUser = {
        id: Date.now(),
        ...form,
      };
      saveUsers([...users, newUser]);
    }

    setForm({ username: "", email: "", role: "user" });
  };

  const editUser = (user) => {
    setForm(user);
    setEditId(user.id);
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updated = users.filter(u => u.id !== id);
      saveUsers(updated);
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>User Management</h2>

      {/* Form */}
      <div style={styles.form}>
        <input
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button style={styles.saveBtn} onClick={handleSubmit}>
          {editId ? "Update User" : "Add User"}
        </button>
      </div>

      {/* User List */}
      <div style={styles.list}>
        {users.length === 0 ? (
          <p>No users yet</p>
        ) : (
          users.map(user => (
            <div key={user.id} style={styles.card}>
              <div>
                <strong>{user.username}</strong> ({user.role})
              </div>
              <div>{user.email}</div>
              <div style={styles.actions}>
                <button onClick={() => editUser(user)} style={styles.edit}>Edit</button>
                <button onClick={() => deleteUser(user.id)} style={styles.delete}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "40px", minHeight: "100vh", background: "#f6efe7" },
  title: { fontSize: "30px", color: "#6a4a3c", marginBottom: "25px" },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
    gap: "15px",
    marginBottom: "30px",
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
  },
  saveBtn: {
    gridColumn: "1/-1",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#6a4a3c",
    color: "#fff",
    cursor: "pointer",
  },
  list: { display: "grid", gap: "15px" },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  actions: { marginTop: "10px", display: "flex", gap: "10px" },
  edit: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "#8a6a55",
    color: "#fff",
    cursor: "pointer",
  },
  delete: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "#d6c3b5",
    cursor: "pointer",
  },
};