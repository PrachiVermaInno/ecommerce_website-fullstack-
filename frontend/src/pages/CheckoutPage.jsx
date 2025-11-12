
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart, addOrder as addOrderAction } from "../redux/reducers";
import { useNavigate } from "react-router-dom";



const toNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const cart = useSelector((s) => s.cart);
  const items = cart.items ?? [];
  const promo = cart.promo ?? null;

  
  const savedAddressJson = (typeof window !== "undefined" && localStorage.getItem("userAddress")) || null;
  let savedAddress = null;
  try {
    savedAddress = savedAddressJson ? JSON.parse(savedAddressJson) : null;
  } catch {
    savedAddress = null;
  }

  const [address, setAddress] = useState({
    name: savedAddress?.name ?? "",
    street: savedAddress?.street ?? "",
    city: savedAddress?.city ?? "",
    state: savedAddress?.state ?? "",
    zipcode: savedAddress?.zipcode ?? "",
    phone: savedAddress?.phone ?? "",
    country: savedAddress?.country ?? "",
  });

  const [saveAddress, setSaveAddress] = useState(Boolean(savedAddress));
  const [placing, setPlacing] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null); 

  
  const subtotal = items.reduce((s, it) => s + toNumber(it.price) * toNumber(it.quantity ?? 1), 0);

  
  const discount = (() => {
    if (!promo) return 0;
    const val = toNumber(promo.value ?? promo.discount ?? 0);
    
    const type = promo.type ?? (val > 1 ? "flat" : "percent");
    if (type === "flat") return val;
    
    return subtotal * val;
  })();

  const total = Math.max(0, subtotal - discount);

  useEffect(() => {
    
  }, [subtotal, promo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((p) => ({ ...p, [name]: value }));
  };

  const validateAddress = () => {
    if (!address.name?.trim()) return "Name is required";
    if (!address.city?.trim()) return "City is required";
    if (!address.street?.trim()) return "Street is required";
    if (!address.zipcode?.trim()) return "Zipcode is required";
    return null;
  };

  const buildOrderPayload = () => {
    const itemsPayload = items.map((it) => ({
      productId: it.id,
      productName: it.title || it.name || "Product",
      qty: Number(it.quantity ?? it.qty ?? 1),
      price: toNumber(it.price) ?? 0,
      productImage: it.image ?? it.img ?? null,
    }));

    return {
      items: itemsPayload,
      address: {
        name: address.name,
        street: address.street,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
        phone: address.phone,
        country: address.country,
      },
      total: total,
      promoCode: promo ? { code: promo.code ?? promo.name ?? promo.codeValue } : null,
    };
  };

  const handlePlaceOrder = async () => {
    const err = validateAddress();
    if (err) {
      alert(err);
      return;
    }

    if (items.length === 0) {
      alert("Cart is empty. Add items to cart before placing an order.");
      return;
    }

    
    if (saveAddress) {
      try {
        localStorage.setItem("userAddress", JSON.stringify(address));
      } catch {
        
      }
    } else {
      localStorage.removeItem("userAddress");
    }

    const payload = buildOrderPayload();

    setPlacing(true);
    try {
      
      const res = await axios.post("http://localhost:8080/api/orders", payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });

      
      const created = res?.data ?? null;

      if (created) {
        setOrderResponse(created);

        
        try {
          dispatch(addOrderAction(created));
        } catch (e) {
          
        }
        dispatch(clearCart());
        
        window.dispatchEvent(new Event("cartUpdated"));
        setPlacing(false);
        return;
      }

      
      const fallback = {
        id: Date.now(),
        items: payload.items,
        total: payload.total,
        address: payload.address,
        promoCode: payload.promoCode,
        status: "PENDING",
        placedAt: new Date().toISOString(),
      };
      setOrderResponse(fallback);
      dispatch(addOrderAction(fallback));
      dispatch(clearCart());
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Order placement error:", error);
      
      const fallback = {
        id: Date.now(),
        items: payload.items,
        total: payload.total,
        address: payload.address,
        promoCode: payload.promoCode,
        status: "PENDING",
        placedAt: new Date().toISOString(),
      };
      
      alert("Backend not available — order saved locally for demo.");
      setOrderResponse(fallback);
      dispatch(addOrderAction(fallback));
      dispatch(clearCart());
      window.dispatchEvent(new Event("cartUpdated"));
    } finally {
      setPlacing(false);
    }
  };

  
  if (orderResponse) {
    const ord = orderResponse;
    return (
      <div style={{ padding: 20 }}>
        <h2>Order Confirmed</h2>
        <p>
          <b>Order ID:</b> {ord.id ?? "N/A"}
        </p>
        <p>
          <b>Status:</b> {ord.status ?? ord.state ?? "PENDING"}
        </p>
        <p>
          <b>Total:</b> ₹{toNumber(ord.total ?? total).toFixed(2)}
        </p>
        <p>
          <b>Promo:</b> {ord.promoCode?.code ?? ord.promo?.code ?? "None"}
        </p>
        <p>
          <b>Placed At:</b>{" "}
          {ord.placedAt ? new Date(ord.placedAt).toLocaleString() : new Date().toLocaleString()}
        </p>

        <h3>Items</h3>
        <ul>
          {(ord.items ?? []).map((it, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              <img
                src={it.productImage ?? "/placeholder.png"}
                alt={it.productName}
                style={{ width: 60, height: 60, objectFit: "contain", marginRight: 8 }}
              />
              {it.productName} — x{it.qty} — ₹{toNumber(it.price).toFixed(2)}
            </li>
          ))}
        </ul>

        <h3>Delivery Address</h3>
        <div style={{ whiteSpace: "pre-line" }}>
          {ord.address?.name}
          {"\n"}
          {ord.address?.street}
          {"\n"}
          {ord.address?.city}, {ord.address?.state} - {ord.address?.zipcode}
          {"\n"}
          {ord.address?.country}
        </div>

        <div style={{ marginTop: 16 }}>
          <button onClick={() => navigate("/orders")}>Go to My Orders</button>
        </div>
      </div>
    );
  }

 
  return (
    <div style={{ padding: 20, maxWidth: 800 }}>
      <h2>Checkout</h2>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        
        <div style={{ flex: 1 }}>
          <label>
            Full name *
            <input name="name" value={address.name} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 8 }} />
          </label>

          <label>
            Street / Address line *
            <input name="street" value={address.street} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 8 }} />
          </label>

          <label>
            City *
            <input name="city" value={address.city} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 8 }} />
          </label>

          <div style={{ display: "flex", gap: 8 }}>
            <label style={{ flex: 1 }}>
              State
              <input name="state" value={address.state} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 8 }} />
            </label>
            <label style={{ width: 150 }}>
              Zipcode *
              <input name="zipcode" value={address.zipcode} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 8 }} />
            </label>
          </div>

          <label>
            Phone
            <input name="phone" value={address.phone} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 8 }} />
          </label>

          <label>
            Country
            <input name="country" value={address.country} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 8 }} />
          </label>

          <div style={{ marginTop: 8 }}>
            <label>
              <input type="checkbox" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} />
              {"  "}
              Save this address for next time
            </label>
          </div>
        </div>

        
        <div style={{ width: 320, border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
          <h3>Order Summary</h3>
          <p>Subtotal: <b>₹{subtotal.toFixed(2)}</b></p>
          <p>Discount: <b>₹{discount.toFixed(2)}</b></p>
          <p style={{ fontSize: 18 }}><b>Total: ₹{total.toFixed(2)}</b></p>

          <div style={{ marginTop: 12 }}>
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                borderRadius: 6,
              }}
            >
              {placing ? "Placing order..." : "Place Order"}
            </button>
          </div>

          <div style={{ marginTop: 10, fontSize: 13, color: "#666" }}>
            <div>Promo: {promo ? (promo.code ?? promo.name ?? promo.value) : "None"}</div>
            <div style={{ marginTop: 6 }}>
              You will receive an email confirmation when the order is processed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
