// components/Modal.jsx
import React from "react";
export default function Modal({ children, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", justifyContent:"center", alignItems:"center" }}>
      <div style={{ background:"#fff", padding:20, minWidth:320 }}>
        <button style={{ float:"right" }} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}
