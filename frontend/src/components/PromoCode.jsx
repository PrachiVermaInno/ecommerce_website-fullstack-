import React, { useState } from "react";
import { validatePromo } from "../api/api";

const PromoCode = ({ onApply }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleApply = async () => {
    setError("");
    setSuccess("");
    if (!code.trim()) {
      setError("Enter a promo code");
      return;
    }

    try {
      const promo = await validatePromo(code.trim());
      setSuccess(`Promo applied: ${promo.discount * 100}% off`);
      onApply(promo);
    } catch (err) {
      setError(typeof err === "string" ? err : "Invalid promo code");
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter promo code"
      />
      <button onClick={handleApply}>Apply</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default PromoCode;
