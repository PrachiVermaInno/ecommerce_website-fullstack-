// src/components/CheckoutForm.jsx
import React from "react";

export default function CheckoutForm({ address, setAddress, onSubmit }) {
  const handleChange = (field) => (e) =>
    setAddress({ ...address, [field]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      style={{
        display: "grid",
        gap: 10,
        maxWidth: 400,
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 8,
      }}
    >
      <h3>Delivery Details</h3>
      <label>
        Name
        <input value={address.name} onChange={handleChange("name")} required />
      </label>

      <label>
        Address Line
        <input value={address.line1} onChange={handleChange("line1")} required />
      </label>

      <label>
        City
        <input value={address.city} onChange={handleChange("city")} required />
      </label>

      <label>
        State
        <input value={address.state} onChange={handleChange("state")} required />
      </label>

      <label>
        Zip Code
        <input
          value={address.zipcode}
          onChange={handleChange("zipcode")}
          required
        />
      </label>

      <label>
        Phone
        <input
          value={address.phone}
          onChange={handleChange("phone")}
          required
        />
      </label>

      <button
        type="submit"
        style={{
          background: "#1976d2",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: 4,
          cursor: "pointer",
          marginTop: 10,
        }}
      >
        Place Order
      </button>
    </form>
  );
}
