import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOrders } from "../redux/reducers";
import { API_BASE_URL } from "../api/config";

const OrdersPage = () => {
  const orders = useSelector((state) => state.cart.orders);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/orders`);
        dispatch(setOrders(res.data));
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [dispatch]);

  if (loading) return <p>Loading orders...</p>;
  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            backgroundColor: "#fafafa",
          }}
        >
          <p>
            <strong>Status:</strong> {order.status || "Pending"}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.total?.toFixed(2) || 0}
          </p>

          {/* ✅ Fix: render promo properly */}
          <p>
            <strong>Promo Code:</strong>{" "}
            {order.promoCode ? order.promoCode.code : "None"}
          </p>

          {/* ✅ Fix: safely render nested address */}
          {order.address && (
            <div style={{ marginTop: "10px" }}>
              <strong>Address:</strong>
              <p style={{ marginLeft: "10px", lineHeight: "1.4" }}>
                {order.address.name},<br />
                {order.address.street},<br />
                {order.address.city}, {order.address.state}{" "}
                {order.address.zipcode}
              </p>
            </div>
          )}

          <p>
            <strong>Ordered On:</strong>{" "}
            {order.placedAt
              ? new Date(order.placedAt).toLocaleString()
              : "Invalid Date"}
          </p>

          {/* ✅ List ordered items */}
          {order.items && order.items.length > 0 && (
            <div>
              <strong>Items:</strong>
              <ul>
                {order.items.map((it) => (
                  <li key={it.id}>
                    {it.productTitle} — {it.quantity} × ₹{it.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
