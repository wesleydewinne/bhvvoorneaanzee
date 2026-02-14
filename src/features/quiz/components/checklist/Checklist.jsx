// src/components/Checklist/Checklist.jsx
import React from "react";
import "./Checklist.css";

function Checklist({ items }) {
    return (
        <ul className="checklist">
            {items.map((item, index) => (
                <li key={index}>✅ {item}</li>
            ))}
        </ul>
    );
}

export default Checklist;
