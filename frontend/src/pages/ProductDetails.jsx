import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/reducers"; // adjust path if needed

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single product by ID from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity: 1 }));
    alert(`${product.title} added to cart!`);
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const styles = `
    :root {
      --primary: #3C1874;
      --primary-dark: #2E125A;
      --hover-tint: #d8c4f5;
      --text-dark: #1C1C1C;
      --text-light: #FFFFFF;
    }

    .product-details-container {
      max-width: 1100px;
      margin: 40px auto;
      padding: 20px;
      display: flex;
      align-items: flex-start;
      gap: 40px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.08);
      font-family: 'Poppins', sans-serif;
    }

    .product-details-image {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f6fb;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid rgba(60,24,116,0.1);
    }

    .product-details-image img {
      width: 100%;
      max-width: 400px;
      height: auto;
      object-fit: contain;
      border-radius: 10px;
    }

    .product-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .product-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--primary-dark);
    }

    .product-category {
      font-size: 0.95rem;
      font-weight: 500;
      color: #666;
      text-transform: capitalize;
    }

    .product-price {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--primary);
    }

    .product-desc {
      font-size: 1rem;
      line-height: 1.6;
      color: #333;
      margin: 10px 0;
    }

    .button-row {
      display: flex;
      gap: 12px;
      margin-top: 10px;
    }

    .btn {
      background: var(--primary);
      color: var(--text-light);
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.2s ease;
      text-decoration: none;
    }

    .btn:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: transparent;
      color: var(--primary);
      border: 2px solid var(--primary);
    }

    .btn-secondary:hover {
      background: var(--primary);
      color: var(--text-light);
    }

    @media (max-width: 850px) {
      .product-details-container {
        flex-direction: column;
        text-align: center;
        gap: 20px;
      }

      .product-details-image img {
        max-width: 300px;
      }

      .button-row {
        justify-content: center;
      }
    }
  `;

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading product...</p>;
  if (!product)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Product not found.</p>;

  return (
    <>
      <style>{styles}</style>

      <div className="product-details-container">
        {/* Left: Product Image */}
        <div className="product-details-image">
          <img
            src={product.image || "https://placehold.co/350x350?text=No+Image"}
            alt={product.title}
          />
        </div>

        {/* Right: Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-price">₹{product.price}</p>
          <p className="product-desc">{product.description}</p>

          <div className="button-row">
            <button className="btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-secondary" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
