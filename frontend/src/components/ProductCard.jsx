import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/reducers"; // adjust path if needed

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const styles = `
    :root {
      --primary: #3C1874;
      --primary-dark: #2E125A;
      --hover-tint: #d8c4f5;
      --light-bg: #F5F2FA;
      --text-dark: #1C1C1C;
      --text-light: #FFFFFF;
    }

    .product-card {
      background: #ffffff;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(60, 24, 116, 0.3);
    }

    .product-image {
      width: 100%;
      height: 220px;
      object-fit: contain;
      margin-bottom: 12px;
      border-radius: 8px;
      background-color: #f8f6fb;
      border: 1px solid rgba(60, 24, 116, 0.15);
    }

    .product-title {
      font-weight: 600;
      color: var(--text-dark);
      font-size: 1rem;
      margin: 4px 0 6px 0;
      line-height: 1.4;
      min-height: 40px;
    }

    .product-price {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--primary-dark);
      margin-bottom: 12px;
    }

    .button-group {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: auto;
    }

    .btn {
      background: var(--primary);
      color: var(--text-light);
      border: none;
      border-radius: 6px;
      padding: 4px 6px;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 500;
      transition: background 0.25s ease, transform 0.2s ease;
      text-decoration: none;
      flex: 1;
      text-align: center;
    }

    .btn:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .product-image {
        height: 180px;
      }

      .btn {
        font-size: 0.85rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="product-card">
        <img
          src={product.image || "https://placehold.co/300x300?text=No+Image"}
          alt={product.title}
          className="product-image"
        />

        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">₹{product.price}</p>

        <div className="button-group">
          <button className="btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="btn">
            View
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
