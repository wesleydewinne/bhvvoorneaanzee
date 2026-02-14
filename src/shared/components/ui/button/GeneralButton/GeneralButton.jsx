import './GeneralButton.css';
import { Link } from "react-router-dom";
import React from "react";

function GeneralButton({ to, buttonClass, icon, text }) {
    return (
        <Link to={to}>
            <button className={`card-button ${buttonClass ? buttonClass : ""}`}>
                {icon && <span className="icon">{icon}</span>}
                {text && <span className="text">{text}</span>}
            </button>
        </Link>
    );
}

export default GeneralButton;
