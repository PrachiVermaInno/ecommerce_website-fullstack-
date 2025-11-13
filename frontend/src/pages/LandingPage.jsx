import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/products/categories");
        const data = await res.json();
        setCategories(["All", ...data]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Filter logic (both search + category)
  const filterProducts = (search, category) => {
    let filtered = [...products];

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterProducts(value, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    filterProducts(searchTerm, value);
  };

  const styles = `
    :root {
      --primary: #3C1874;
      --primary-dark: #2E125A;
      --hover-tint: #d8c4f5;
      --text-light: #ffffff;
      --light-bg: #f7f4fc;
    }

    .landing-container {
      max-width: 1200px;
      margin: 40px auto;
      padding: 0 20px;
      font-family: 'Poppins', sans-serif;
    }

    .hero-banner {
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: var(--text-light);
      text-align: center;
      padding: 50px 20px;
      border-radius: 12px;
      margin-bottom: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    .hero-banner h1 {
      font-size: 2.2rem;
      margin-bottom: 10px;
    }

    .hero-banner p {
      font-size: 1rem;
      opacity: 0.9;
    }

    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 25px;
      background: var(--light-bg);
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    }

    .search-input {
      flex: 1;
      min-width: 200px;
      padding: 10px 14px;
      border-radius: 8px;
      border: 2px solid var(--primary);
      outline: none;
      font-size: 0.95rem;
    }

    .search-input:focus {
      border-color: var(--primary-dark);
      box-shadow: 0 0 4px rgba(60,24,116,0.3);
    }

    .category-select {
      padding: 10px 14px;
      border-radius: 8px;
      border: 2px solid var(--primary);
      background: #fff;
      font-size: 0.95rem;
      cursor: pointer;
    }

    .category-select:hover {
      border-color: var(--primary-dark);
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
    }

    .no-products {
      text-align: center;
      font-size: 1.1rem;
      margin-top: 50px;
      color: var(--primary-dark);
    }

    @media (max-width: 600px) {
      .filter-bar {
        flex-direction: column;
        align-items: stretch;
      }
      .search-input, .category-select {
        width: 100%;
      }
      .hero-banner h1 {
        font-size: 1.8rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="landing-container">
        {/* Hero Banner */}
        <div className="hero-banner">
          <h1>Welcome to ShopEase 💜</h1>
          <p>Find your favorite products at the best prices.</p>
        </div>

        {/* Search + Category Filters */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Products */}
        {loading ? (
          <p style={{ textAlign: "center", marginTop: "50px" }}>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="no-products">No products found.</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LandingPage;
