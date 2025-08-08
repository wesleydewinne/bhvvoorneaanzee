// src/components/NavigationButton.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavigationButton.css";

function NavigationButton({ to, label }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`navigation-button ${isActive ? "active" : ""}`}
        >
            {label}
        </Link>
    );
}

export default NavigationButton;
