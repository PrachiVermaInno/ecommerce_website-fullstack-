import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  removeItem,
  setQty,
  clearCart,
  applyPromo,
  addOrder,
} from "../redux/reducers";
import { API_BASE_URL } from "../api/config";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const appliedPromo = useSelector((state) => state.cart.promo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  // ✅ Subtotal before discount
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Recalculate discount whenever promo/subtotal changes
  useEffect(() => {
    if (appliedPromo && appliedPromo.discount) {
      setDiscount(subtotal * appliedPromo.discount);
    } else {
      setDiscount(0);
    }
  }, [subtotal, appliedPromo]);

  // ✅ Apply Promo Code
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      alert("Please enter a promo code!");
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/promos/validate/${promoCode}`);
      if (res.data && res.data.code) {
        dispatch(applyPromo(res.data));
        alert(
          `Promo applied: ${res.data.code} (${res.data.discount * 100}% OFF)`
        );
      } else {
        alert("Invalid or expired promo code!");
      }
    } catch (error) {
      console.error("Promo validation failed:", error);
      alert("Invalid or expired promo code!");
    }
  };

  // ✅ Quantity Increment/Decrement
  const handleQtyChange = (item, newQty) => {
    if (newQty < 1) return;
    dispatch(setQty({ id: item.id, quantity: newQty }));
  };

  // ✅ Proceed to Address Form
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowAddressForm(true);
  };

  // ✅ Submit Order to Backend
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setPlacingOrder(true);

    const orderPayload = {
      total: subtotal - discount,
      promoCode: appliedPromo ? appliedPromo : null,
      address,
      items: cartItems.map((item) => ({
        productId: item.id,
        productTitle: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/orders`, orderPayload);
      dispatch(addOrder(res.data));
      dispatch(clearCart());
      setShowAddressForm(false);
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Order failed:", err);
      alert("Failed to place order!");
    } finally {
      setPlacingOrder(false);
    }
  };

  const total = subtotal - discount;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                <div>
                  <h4 style={{ margin: 0 }}>{item.title}</h4>
                  <p style={{ margin: "5px 0", color: "gray" }}>
                    {item.description ? item.description.slice(0, 80) : ""}
                  </p>
                  <strong>₹{item.price.toFixed(2)}</strong>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "10px",
                  }}
                >
                  <button onClick={() => handleQtyChange(item, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQtyChange(item, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <button
                  style={{ marginTop: "10px", color: "red" }}
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Promo Section */}
          <div style={{ marginTop: "2rem" }}>
            <h3>Promo Code</h3>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
            />
            <button onClick={handleApplyPromo} style={{ marginLeft: "10px" }}>
              Apply
            </button>
            {appliedPromo && (
              <p style={{ color: "green", marginTop: "5px" }}>
                Applied: {appliedPromo.code} ({appliedPromo.discount * 100}% off)
              </p>
            )}
          </div>

          {/* Summary */}
          <div style={{ marginTop: "2rem" }}>
            <h3>Summary</h3>
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Discount: ₹{discount.toFixed(2)}</p>
            <h3>Total: ₹{total.toFixed(2)}</h3>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={handlePlaceOrder}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              style={{
                marginLeft: "10px",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}

      {/* Address Form Modal */}
      {showAddressForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <form
            onSubmit={handleSubmitOrder}
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "10px",
              width: "400px",
            }}
          >
            <h3>Enter Delivery Address</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={address.name}
              onChange={(e) =>
                setAddress({ ...address, name: e.target.value })
              }
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="Street"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="Zipcode"
              value={address.zipcode}
              onChange={(e) =>
                setAddress({ ...address, zipcode: e.target.value })
              }
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <button
              type="submit"
              disabled={placingOrder}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              {placingOrder ? "Placing..." : "Confirm Order"}
            </button>
            <button
              type="button"
              onClick={() => setShowAddressForm(false)}
              style={{
                marginLeft: "10px",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CartPage;
