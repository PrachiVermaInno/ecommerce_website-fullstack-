
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Header() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const items = useSelector((state) => state?.cart?.items ?? []);
  const count = items.reduce((s, it) => s + (Number(it.quantity) || 0), 0);


  useEffect(() => {
    function onDocClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  
  useEffect(() => {
    function onCartUpdated() {
    }
    window.addEventListener("cartUpdated", onCartUpdated);
    return () => window.removeEventListener("cartUpdated", onCartUpdated);
  }, []);

  const handleLogout = () => {
    
    alert("Logged out (placeholder)");
    setDropdownOpen(false);
   
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#222",
        color: "#fff",
        padding: "10px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        zIndex: 1000,
      }}
    >
      
      <div
        style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}
        onClick={() => navigate("/")}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") navigate("/"); }}
        aria-label="Go to home"
      >
        <span style={{ fontSize: 22 }}>🛍️</span>
        <span style={{ fontWeight: 700, fontSize: 20, color: "#fff" }}>ShopEase</span>
      </div>

      
      <nav style={{ display: "flex", alignItems: "center", gap: 18 }}>
      

        
        <button
          aria-label="Notifications"
          title="Notifications"
          style={iconButtonStyle}
          onClick={() => alert("No notifications (placeholder)")}
        >
          
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 17H9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        
        <div style={{ position: "relative" }}>
          <button
            aria-label="Open cart"
            title="Cart"
            onClick={() => navigate("/cart")}
            style={iconButtonStyle}
          >
            
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6h15l-1.5 9h-12L6 6z" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L4 2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="20" r="1" fill="#fff"></circle>
              <circle cx="18" cy="20" r="1" fill="#fff"></circle>
            </svg>
          </button>

          {count > 0 && (
            <span
              aria-live="polite"
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "#e63946",
                color: "#fff",
                borderRadius: "50%",
                padding: "3px 7px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {count}
            </span>
          )}
        </div>

        
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen((s) => !s)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            style={{
              ...iconButtonStyle,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
            }}
          >
            <span style={{ fontSize: 16 }}>👤</span>
            <span style={{ color: "#fff", fontWeight: 600 }}>Profile</span>
          </button>

          {dropdownOpen && (
            <div
              role="menu"
              aria-label="Profile menu"
              style={{
                position: "absolute",
                right: 0,
                top: "110%",
                background: "#fff",
                color: "#222",
                borderRadius: 8,
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                minWidth: 180,
                overflow: "hidden",
                zIndex: 1100,
              }}
            >
              <Link to="/profile" onClick={() => setDropdownOpen(false)} style={profileItemStyle}>
                My Profile
              </Link>
              <Link to="/orders" onClick={() => setDropdownOpen(false)} style={profileItemStyle}>
                My Orders
              </Link>
              <button onClick={handleLogout} style={{ ...profileItemStyle, border: "none", textAlign: "left", background: "transparent", width: "100%" }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}


const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: 600,
};

const iconButtonStyle = {
  background: "transparent",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  padding: 6,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const profileItemStyle = {
  display: "block",
  padding: "10px 14px",
  color: "#222",
  textDecoration: "none",
  cursor: "pointer",
  fontSize: 14,
};
