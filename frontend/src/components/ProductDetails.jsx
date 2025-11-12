import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/reducers";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  if (!product) return <h3>Loading...</h3>;

  return (
    <div className="product-details" style={{ padding: "20px" }}>
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "contain",
          borderRadius: "8px",
        }}
      />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><b>₹{product.price}</b></p>
      <p>⭐ {product.ratingRate} / 5</p>
      <p>Category: {product.category}</p>

      <button
          onClick={() =>
            dispatch(
              addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              })
            )
          }
        >
          Add to Cart
        </button>
    </div>
  );
}

export default ProductDetails;
