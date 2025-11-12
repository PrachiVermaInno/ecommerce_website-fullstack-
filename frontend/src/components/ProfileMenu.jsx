
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
        }}
        title="Profile Menu"
      >
        👤
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "120%",
            right: 0,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            minWidth: "160px",
            zIndex: 100,
          }}
        >
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            style={linkStyle}
          >
            My Profile
          </Link>
          <Link
            to="/orders"
            onClick={() => setOpen(false)}
            style={linkStyle}
          >
            My Orders
          </Link>
          <button
            onClick={() => {
              alert("Logged out (placeholder)");
              setOpen(false);
            }}
            style={{
              ...linkStyle,
              border: "none",
              background: "none",
              width: "100%",
              textAlign: "left",
              color: "red",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};


const linkStyle = {
  display: "block",
  padding: "10px 15px",
  textDecoration: "none",
  color: "#333",
  borderBottom: "1px solid #eee",
  fontSize: "15px",
};

export default ProfileMenu;
