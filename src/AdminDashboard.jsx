import React from "react";
import Logout from "./Auth/Logout";

export default function AdminDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome, Admin!</h1>
      <p>This is your admin dashboard. You can manage users, orders, and other admin tasks here.</p>
      <Logout />
    </div>
  );
}
