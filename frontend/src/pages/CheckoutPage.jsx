import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/reducers";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };
const handlePlaceOrder = async () => {
  if (
    !address.name ||
    !address.street ||
    !address.city ||
    !address.state ||
    !address.zip ||
    !address.country
  ) {
    setError("Please fill out all address fields.");
    return;
  }

  if (cartItems.length === 0) {
    setError("Your cart is empty.");
    return;
  }

  const orderPayload = {
    orderitems: cartItems.map((item) => ({
      product: { id: item.id },
      quantity: item.quantity,
      price: parseFloat(item.price),
      productTitle: item.title,
    })),
    address,
    total: parseFloat(subtotal.toFixed(2)),
    qty: cartItems.reduce((acc, item) => acc + item.quantity, 0),
    status: "PENDING",
  };

  try {
    const res = await fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    if (res.ok) {
      const savedOrder = await res.json();


      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      existingOrders.push(savedOrder);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      dispatch(clearCart());
      setPlaced(true);

      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } else {
      setError("Failed to place order. Please try again.");
    }
  } catch (err) {
    console.error("Error placing order:", err);
    setError("Backend error. Could not place order.");
  }
};

 

  const styles = `
    :root {
      --primary: #3C1874;
      --primary-dark: #2E125A;
      --light-bg: #f7f4fc;
      --text-dark: #1C1C1C;
    }

    .checkout-container {
      max-width: 1100px;
      margin: 40px auto;
      padding: 20px;
      font-family: 'Poppins', sans-serif;
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
    }

    .checkout-title {
      text-align: center;
      color: var(--primary-dark);
      font-size: 2rem;
      font-weight: 700;
      width: 100%;
      margin-bottom: 10px;
    }

    .form-section, .summary-section {
      flex: 1;
      min-width: 340px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
      padding: 24px;
    }

    .form-section h3, .summary-section h3 {
      color: var(--primary-dark);
      margin-bottom: 20px;
      font-weight: 700;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 6px;
      color: var(--primary);
    }

    .form-group input {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      border: 2px solid var(--primary);
      font-size: 0.95rem;
      outline: none;
    }

    .form-group input:focus {
      border-color: var(--primary-dark);
      box-shadow: 0 0 6px rgba(60,24,116,0.2);
    }

    .summary-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding-bottom: 6px;
      color: var(--text-dark);
      font-weight: 500;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--primary-dark);
      margin-top: 12px;
    }

    .place-order-btn {
      width: 100%;
      margin-top: 20px;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 14px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .place-order-btn:hover {
      background: var(--primary-dark);
    }

    .error-msg {
      color: #e63946;
      margin-top: 8px;
      font-size: 0.9rem;
    }

    .success-msg {
      text-align: center;
      color: #2e8b57;
      background: #e9f8ef;
      padding: 12px;
      border-radius: 8px;
      margin-top: 10px;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .checkout-container {
        flex-direction: column;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout </h1>

        <div className="form-section">
          <h3>Delivery Address</h3>
          {["name", "street", "city", "state", "zip", "country"].map((field) => (
            <div key={field} className="form-group">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                value={address[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}

          {error && <p className="error-msg">{error}</p>}
          {placed && <p className="success-msg">Order placed successfully!</p>}

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>


        <div className="summary-section">
          <h3>Order Summary</h3>
          {cartItems.length === 0 ? (
            <p>No items in your cart.</p>
          ) : (
            <>
              <div className="summary-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
