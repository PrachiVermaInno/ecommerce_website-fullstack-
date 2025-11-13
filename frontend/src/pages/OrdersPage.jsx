import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../api/config"; // ensure correct import path
import "../App.css"; // only if you already have this global file

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders from backend
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle Cancel Order
  const handleCancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${id}/cancel`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      // Handle error responses
      if (!res.ok) {
        const errorMsg = await res.text();
        alert(errorMsg || "Failed to cancel order.");
        return;
      }

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const updatedOrder = await res.json();
        setOrders((prev) =>
          prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
        );
        alert("Order cancelled successfully!");
      } else {
        const msg = await res.text();
        alert(msg);
        // optimistic UI update
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, status: "CANCELLED" } : order
          )
        );
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Network or server error occurred.");
    }
  };

  // Format date/time
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem", color: "#3C1874" }}>
        <h2>Loading your orders...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f7f7fa", minHeight: "100vh" }}>
      <h1 style={{ color: "#3C1874", marginBottom: "2rem" }}>My Orders</h1>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", color: "#555" }}>
          <h3>No orders placed yet.</h3>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#fff",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ color: "#3C1874" }}>Order #{order.id}</h3>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      order.status === "CANCELLED"
                        ? "red"
                        : order.status === "DELIVERED"
                        ? "green"
                        : "#3C1874",
                    fontWeight: "bold",
                  }}
                >
                  {order.status}
                </span>
              </p>
              <p>
                <strong>Placed At:</strong> {formatDateTime(order.placedAt)}
              </p>
              <p>
                <strong>Delivered At:</strong> {formatDateTime(order.deliveredAt)}
              </p>
            </div>

            {/* Address section */}
            {order.address && (
              <div
                style={{
                  background: "#f2f2fa",
                  padding: "0.8rem 1rem",
                  borderRadius: "6px",
                  marginBottom: "1rem",
                }}
              >
                <h4 style={{ color: "#3C1874" }}>Delivery Address</h4>
                <p style={{ margin: 0 }}>
                  {order.address.name}, {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country} -{" "}
                  {order.address.zipcode}
                </p>
              </div>
            )}

            {/* Order items */}
            <div>
              <h4 style={{ color: "#3C1874", marginBottom: "0.5rem" }}>Items</h4>
              {order.orderItems?.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #ddd",
                    padding: "0.8rem 0",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img
                      src={item.product?.image || "https://via.placeholder.com/80"}
                      alt={item.product?.title || "Product"}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                        objectFit: "contain",
                        background: "#f9f9f9",
                      }}
                    />
                    <div>
                      <h4 style={{ color: "#3C1874", marginBottom: "0.3rem" }}>
                        {item.product?.title || "Unnamed Product"}
                      </h4>
                      <p style={{ margin: 0 }}>
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div>
                    <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo and total */}
            <div style={{ marginTop: "1rem" }}>
              <p>
                <strong>Promo Code:</strong>{" "}
                {order.promo?.code ? order.promo.code : "None"}
              </p>
              <h3 style={{ color: "#3C1874" }}>
                Total: ₹{order.total ? order.total.toFixed(2) : "0.00"}
              </h3>
            </div>

            {/* Cancel Button */}
            {order.status === "PENDING" && (
              <button
                onClick={() => handleCancelOrder(order.id)}
                style={{
                  marginTop: "1rem",
                  padding: "0.6rem 1.5rem",
                  backgroundColor: "#3C1874",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#5C2EB3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#3C1874")}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
