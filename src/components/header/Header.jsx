import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/image/algemeneAfbeeldingen/logo.png";
import "./Header.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Schaduw bij scroll
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector("header.inner-container");
            if (window.scrollY > 10) header.classList.add("is-scrolled");
            else header.classList.remove("is-scrolled");
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Sluit menu bij klik op link
    const handleLinkClick = () => setMenuOpen(false);

    return (
        <header className="inner-container">
            {/* LOGO */}
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="BHV Voorne aan Zee logo" className="logo" />
                </Link>
            </div>

            {/* HAMBURGER MENU */}
            <button
                className={`hamburger ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* NAVIGATIE */}
            <nav className={menuOpen ? "open" : ""}>
                <ul>
                    <li>
                        <NavLink
                            to="/bhv"
                            onClick={handleLinkClick}
                            className={({isActive}) => (isActive ? "active-link" : "default-link")}
                        >
                            BHV
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/ploegleider"
                            onClick={handleLinkClick}
                            className={({isActive}) => (isActive ? "active-link" : "default-link")}
                        >
                            Ploegleider
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/ontruimingsoefening"
                            onClick={handleLinkClick}
                            className={({isActive}) => (isActive ? "active-link" : "default-link")}
                        >
                            Ontruimingsoefening
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/ehbo"
                            onClick={handleLinkClick}
                            className={({isActive}) => (isActive ? "active-link" : "default-link")}
                        >
                            EHBO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/workshops"
                            onClick={handleLinkClick}
                            className={({isActive}) => (isActive ? "active-link" : "default-link")}
                        >
                            Workshops
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
