// src/pages/ProfilePage.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function ProfilePage() {
  return (
    <div style={{ padding: 20 }}>
      <h2>My Profile</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <Link to="/profile">Overview</Link>
        <Link to="/profile/orders">My Orders</Link>
      </div>

      <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
        <p><strong>Placeholder profile</strong></p>
        <p>Name: Guest user</p>
        <p>Email: guest@example.com</p>
      </div>

      {/* If using nested routes (Outlet), OrdersPage could render here */}
      <Outlet />
    </div>
  );
}
