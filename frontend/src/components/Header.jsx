// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Redux cart item count
  const cartItems = useSelector((state) => (state.cart && state.cart.items) || []);
  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, it) => sum + (it.quantity || 0), 0)
    : 0;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const styles = `
    :root {
      --primary: #3C1874;
      --primary-dark: #2E125A;
      --hover-tint: #d8c4f5;
      --text-light: #ffffff;
      --badge-red: #ff4d6d;
    }

    .header {
      background: var(--primary);
      color: var(--text-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 28px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      position: sticky;
      top: 0;
      z-index: 999;
      font-family: 'Poppins', sans-serif;
    }

    .logo {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-light);
      text-decoration: none;
      letter-spacing: 0.3px;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      transition: background 0.2s ease;
    }

    .icon-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .icon-svg {
      fill: var(--text-light);
      width: 22px;
      height: 22px;
      transition: fill 0.2s ease;
    }

    .icon-btn:hover .icon-svg {
      fill: var(--hover-tint);
    }

    .cart-badge {
      position: absolute;
      top: 5px;
      right: 4px;
      background: var(--badge-red);
      color: #fff;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 50%;
    }

    .cart-wrapper {
      position: relative;
    }

    /* Dropdown */
    .profile-dropdown {
      position: relative;
    }

    .dropdown-menu {
      position: absolute;
      top: 48px;
      right: 0;
      background: #fff;
      color: #333;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      border-radius: 8px;
      overflow: hidden;
      min-width: 150px;
      display: flex;
      flex-direction: column;
      z-index: 1000;
    }

    .dropdown-item {
      padding: 10px 14px;
      font-size: 0.95rem;
      text-decoration: none;
      color: #333;
      transition: background 0.2s ease;
    }

    .dropdown-item:hover {
      background: var(--light-hover, #f4f4f4);
    }

    @media (max-width: 640px) {
      .header {
        padding: 10px 18px;
      }
      .logo {
        font-size: 1.2rem;
      }
      .icon-btn {
        width: 36px;
        height: 36px;
      }
      .icon-svg {
        width: 20px;
        height: 20px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <header className="header">
        {/* Left: Logo */}
        <Link to="/" className="logo">
          ShopEase
        </Link>

        {/* Right: Icons */}
        <div className="nav-right">
          {/* Notification Icon */}
          <button className="icon-btn" title="Notifications">
            <svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 24c1.104 0 2-.896 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V6a1.5 1.5 0 0 0-3 0v.68C7.63 7.36 6 9.92 6 13v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
          </button>

          {/* Cart Icon with Badge */}
          <Link to="/cart" className="icon-btn cart-wrapper" title="Cart">
            <svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 2zM17 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm2.93-4.36l2.7-8.13A1.003 1.003 0 0 0 21.7 4H6.31l-.94-2H1v2h3l3.6 7.59-1.35 2.44C6.52 14.37 6 15.15 6 16c0 1.104.896 2 2 2h12v-2H8.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h8.68c.75 0 1.41-.47 1.67-1.17z"/>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* Profile Dropdown */}
          <div className="profile-dropdown" ref={dropdownRef}>
            <button
              className="icon-btn"
              onClick={() => setShowDropdown((prev) => !prev)}
              title="Profile"
            >
              <svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 12c2.67 0 8 1.34 8 4v4H4v-4c0-2.66 5.33-4 8-4zm0-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
              </svg>
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/orders" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                  My Orders
                </Link>
                <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                  Profile
                </Link>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    alert("Logged out successfully!");
                    setShowDropdown(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
