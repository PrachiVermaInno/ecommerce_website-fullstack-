import React from "react";

export default function OrderCard({ order }) {
  const now = Date.now();
  const delivered = now >= order.deliveredAt;
  const status = delivered ? "Delivered" : "Processing";

  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div><strong>Order #{order.id}</strong></div>
        <div>{status}</div>
      </div>

      <div style={{ marginTop: 8 }}>
        <strong>Total:</strong> ₹{order.total}
      </div>

      <div style={{ marginTop: 8 }}>
        <strong>Items:</strong>
        <ul>
          {order.items.map((it) => (
            <li key={it.id}>{it.title} × {it.quantity}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 8 }}>
        <strong>Address:</strong>
        <div>{order.address.name}, {order.address.street}, {order.address.city} {order.address.zipcode}, {order.address.country}</div>
      </div>
    </div>
  );
}
