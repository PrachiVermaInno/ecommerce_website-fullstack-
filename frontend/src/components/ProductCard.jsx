import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/reducers";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addItem(product));
    alert(`${product.title} added to cart!`);
  };

  const handleView = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "150px", height: "150px", objectFit: "contain" }}
      />
      <h4>{product.title}</h4>
      <p>₹{product.price.toFixed(2)}</p>
      <p>⭐ {product.rating?.rate || 4.5}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={handleView}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          View
        </button>
        <button
          onClick={handleAddToCart}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
