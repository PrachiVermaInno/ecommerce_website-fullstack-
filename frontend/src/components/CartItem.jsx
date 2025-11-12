
import React from "react";
import { useDispatch } from "react-redux";
import { setQty, removeItem } from "../redux/reducers";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  if (!item) return null;

  const decrease = () => {
    if (item.qty > 1) dispatch(setQty({ id: item.id, qty: item.qty - 1 }));
  };
  const increase = () => dispatch(setQty({ id: item.id, qty: item.qty + 1 }));

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, border: "1px solid #f0f0f0", borderRadius: 6 }}>
      <img src={item.image} alt={item.title} style={{ width: 84, height: 84, objectFit: "cover", borderRadius: 6 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ margin: 0, fontSize: 16 }}>{item.title}</h4>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700 }}>₹{(item.price).toFixed(2)}</div>
            <div style={{ fontSize: 12, color: "#666" }}>each</div>
          </div>
        </div>

        <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={decrease} style={{ padding: "6px 10px" }}>-</button>
          <div>{item.qty}</div>
          <button onClick={increase} style={{ padding: "6px 10px" }}>+</button>

          <button onClick={() => dispatch(removeItem(item.id))} style={{ marginLeft: 16, background: "transparent", border: "none", color: "#b00", cursor: "pointer" }}>
            Remove
          </button>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 12, color: "#666" }}>Item total</div>
        <div style={{ fontWeight: 700, marginTop: 6 }}>₹{(item.price * item.qty).toFixed(2)}</div>
      </div>
    </div>
  );
}
