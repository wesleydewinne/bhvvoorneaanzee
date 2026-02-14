// src/components/layout/CoverageSection.jsx

import React from "react";
import "./CoverageSection.css";

const CoverageSection = ({ id, ariaLabel, children }) => {
    return (
        <section id={id} aria-label={ariaLabel} className="coverage-section">
            <div className="container">
                {children}
            </div>
        </section>
    );
};

export default CoverageSection;
