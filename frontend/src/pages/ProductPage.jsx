import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch = p.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  
  const groupedProducts = useMemo(() => {
    const grouped = {};
    filteredProducts.forEach((p) => {
      const cat = p.category || "Uncategorized";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(p);
    });
    return grouped;
  }, [filteredProducts]);

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

    .landing-header {
      text-align: center;
      margin-bottom: 30px;
      padding: 30px 10px;
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: var(--text-light);
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.15);
    }

    .landing-header h1 {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: var(--light-bg);
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      margin-bottom: 30px;
    }

    .search-input {
      flex: 1;
      min-width: 250px;
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

    .category-section {
      margin-bottom: 40px;
    }

    .category-title {
      color: var(--primary-dark);
      font-weight: 700;
      font-size: 1.4rem;
      margin-bottom: 18px;
      text-transform: capitalize;
      border-left: 6px solid var(--primary);
      padding-left: 10px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
    }

    .no-products {
      text-align: center;
      font-size: 1.1rem;
      margin-top: 40px;
      color: var(--primary-dark);
    }

    @media (max-width: 600px) {
      .filter-bar {
        flex-direction: column;
        align-items: stretch;
      }

      .category-select,
      .search-input {
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="landing-container">  
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        
        {loading ? (
          <p style={{ textAlign: "center", marginTop: "40px" }}>Loading products...</p>
        ) : Object.keys(groupedProducts).length === 0 ? (
          <p className="no-products">No products found.</p>
        ) : (
          Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="category-section">
              <h2 className="category-title">{category}</h2>
              <div className="products-grid">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductPage;
