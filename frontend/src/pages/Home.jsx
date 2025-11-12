
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data.slice(0, 12)))
      .catch(() => setProducts([]));
  }, []);

  const filtered = products.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Featured products</h2>
        <Link to="/products">View all products</Link>
      </div>

      <div style={{ marginTop: 8 }}>
        <input placeholder="Search featured..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginTop: 12 }}>
        {filtered.map(p => (
          <div key={p.id} style={{ border: "1px solid #eee", padding: 12, borderRadius: 6 }}>
            <Link to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img src={p.image} alt={p.title} style={{ height: 120, objectFit: "contain", display: "block", margin: "0 auto 8px" }} />
              <div style={{ fontSize: 14, minHeight: 40 }}>{p.title}</div>
              <div style={{ fontWeight: 700, marginTop: 6 }}>₹{p.price}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
