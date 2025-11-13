import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart, setQty } from "../redux/reducers";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
const [appliedPromo, setAppliedPromo] = useState(null); 

  

const API_BASE = "http://localhost:8080"; 


const handleApplyPromo = async () => {
  const raw = (promoCode || "").trim();
  if (!raw) {
    setError("Please enter a promo code");
    setDiscount(0);
    return;
  }

  
  const code = raw.toUpperCase();

  
  const interpret = (data) => {
      if (typeof data.valid !== "undefined") {
      if (!data.valid) return { ok: false, message: data.message || "Invalid promo code" };
      const isPct = !!data.isPercentage;
      const disc = Number(data.discount) || 0;
      return { ok: true, isPercentage: isPct, discountValue: disc, message: data.message || "Promo applied" };
    }

    
    if (data && (data.code || data.id)) {
          const isPct = typeof data.isPercentage !== "undefined" ? !!data.isPercentage : !!data.is_percentage;
      const disc = Number(data.discount) || 0;
      return { ok: true, isPercentage: isPct, discountValue: disc, message: "Promo applied" };
    }

    
    return { ok: false, message: "Invalid promo response from server" };
  };

  
  const urlsToTry = [
    `${API_BASE}/api/promos/validate/${encodeURIComponent(code)}`,
    `${API_BASE}/api/promos/validate?code=${encodeURIComponent(code)}`
  ];

  let lastError = null;
  for (const url of urlsToTry) {
    try {
      console.log("[Promo] trying url:", url);
      const res = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });

      
      if (!res.ok) {
        
        let text;
        try { text = await res.text(); } catch(e) { text = "<no body>"; }
        console.warn("[Promo] non-OK response", res.status, text);
        lastError = `Server returned ${res.status}`;
        continue; 
      }

      const data = await res.json();
      console.log("[Promo] server response json:", data);

      const interpreted = interpret(data);
      if (!interpreted.ok) {
        setError(interpreted.message || "Invalid promo code");
        setDiscount(0);
        return;
      }

      
      let discountMoney = 0;
      if (interpreted.isPercentage) {
        discountMoney = subtotal * Number(interpreted.discountValue);
      } else {
              discountMoney = Number(interpreted.discountValue);
      }

      
      setError("");
      setDiscount(discountMoney);        
      setAppliedPromo(code);             
      alert(interpreted.message || "Promo applied!");
      return;
    } catch (err) {
      console.error("[Promo] fetch error for", url, err);
      lastError = err.message || String(err);

    }
  }

  setError("Promo validation failed: " + (lastError || "unknown error"));
  setDiscount(0);
};




  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const discountAmount =
    discount < 1 ? subtotal * discount : Math.min(discount, subtotal);
  const total = subtotal - discountAmount;

  const handleQuantityChange = (item, type) => {
    if (type === "increase") {
      dispatch(setQty({ id: item.id, quantity: item.quantity + 1 }));
    } else if (type === "decrease" && item.quantity > 1) {
      dispatch(setQty({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const styles = `
    :root {
      --primary: #3C1874;
      --primary-dark: #2E125A;
      --hover-tint: #d8c4f5;
      --light-bg: #f7f4fc;
      --text-dark: #1C1C1C;
      --text-light: #fff;
    }

    .cart-container {
      max-width: 1100px;
      margin: 40px auto;
      padding: 20px;
      font-family: 'Poppins', sans-serif;
    }

    .cart-header {
      text-align: center;
      color: var(--primary-dark);
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 30px;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .cart-item {
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      justify-content: space-between;
    }

    .cart-item img {
      width: 90px;
      height: 90px;
      object-fit: contain;
      border-radius: 8px;
      background-color: #f7f4fc;
      border: 1px solid rgba(60, 24, 116, 0.1);
      margin-right: 16px;
    }

    .cart-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .cart-title {
      font-weight: 600;
      color: var(--text-dark);
      font-size: 1rem;
      margin-bottom: 5px;
    }

    .cart-price {
      color: var(--primary-dark);
      font-weight: 600;
      margin-bottom: 8px;
    }

    .qty-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .qty-btn {
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 6px;
      width: 28px;
      height: 28px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: background 0.3s ease;
    }

    .qty-btn:hover {
      background: var(--primary-dark);
    }

    .remove-btn {
      background: none;
      border: none;
      color: #b80d57;
      font-weight: 600;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .remove-btn:hover {
      color: #e63946;
    }

    .summary {
      margin-top: 40px;
      background: var(--light-bg);
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }

    .summary h3 {
      color: var(--primary-dark);
      margin-bottom: 20px;
      font-weight: 700;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 1rem;
    }

    .promo-section {
      margin: 20px 0;
      display: flex;
      gap: 10px;
    }

    .promo-input {
      flex: 1;
      padding: 10px;
      border-radius: 8px;
      border: 2px solid var(--primary);
      outline: none;
      font-size: 0.95rem;
    }

    .promo-btn {
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .promo-btn:hover {
      background: var(--primary-dark);
    }

    .error-msg {
      color: #e63946;
      font-size: 0.9rem;
      margin-top: -5px;
    }

    .checkout-btn {
      width: 100%;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 14px;
      font-size: 1.1rem;
      font-weight: 600;
      margin-top: 20px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .checkout-btn:hover {
      background: var(--primary-dark);
    }

    @media (max-width: 650px) {
      .cart-item {
        flex-direction: column;
        align-items: flex-start;
      }
      .cart-item img {
        margin-bottom: 10px;
      }
      .cart-info {
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="cart-container">
        <h1 className="cart-header">Your Cart </h1>

        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "50px", color: "#555" }}>
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image || "https://placehold.co/90x90?text=No+Image"}
                    alt={item.title}
                  />
                  <div className="cart-info">
                    <div className="cart-title">{item.title}</div>
                    <div className="cart-price">₹{item.price}</div>

                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item, "decrease")}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item, "increase")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span>- ₹{discountAmount.toFixed(2)}</span>
              </div>
              <hr style={{ margin: "10px 0", borderColor: "#ccc" }} />
              <div className="summary-row" style={{ fontWeight: "700" }}>
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="promo-section">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button className="promo-btn" onClick={handleApplyPromo}>
                  Apply
                </button>
              </div>
              {error && <p className="error-msg">{error}</p>}

              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
