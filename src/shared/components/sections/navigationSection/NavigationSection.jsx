// src/components/NavigationSection.jsx
import React from "react";
import NavigationButton from "@/shared/components/ui/button/navigationButton/NavigationButton.jsx";
import "./NavigationSection.css";

function NavigationSection({ items, title = "Navigeer naar:" }) {
    return (
        <div className="navigation-section">
            <h3>{title}</h3>
            <div className="navigation-buttons-container">
                {items.map(({ to, label }, index) => (
                    <NavigationButton key={index} to={to} label={label} />
                ))}
            </div>
        </div>
    );
}

export default NavigationSection;
