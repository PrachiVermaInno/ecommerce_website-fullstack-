import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/api";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/reducers";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    fetchProducts()
      .then((data) => {
        if (mounted) setProducts(data);
      })
      .catch((e) => {
        console.error("fetch error:", e);
      })
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <Loader />;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 18 }}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={(prod) => dispatch(addItem(prod))} />
      ))}
    </div>
  );
}
