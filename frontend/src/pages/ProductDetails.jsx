import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/reducers";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Unable to fetch product details.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));
      alert(`${product.title} added to cart!`);
    }
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={
              product.image ||
              "https://via.placeholder.com/350x350?text=No+Image+Available"
            }
            alt={product.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/350x350?text=Image+Not+Found";
            }}
            className="w-[350px] h-[350px] object-contain rounded-xl border border-gray-200"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-3 text-gray-900">
            {product.title}
          </h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {product.description}
          </p>

          <div className="text-xl font-semibold mb-3 text-gray-800">
            ₹{product.price?.toFixed(2)}
          </div>

          {product.rating && (
            <div className="flex items-center mb-6 text-yellow-500">
              <span className="text-lg mr-2">⭐</span>
              <span className="text-gray-700">{product.rating.rate}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all"
            >
              Add to Cart
            </button>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
