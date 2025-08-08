import './Header.css';
import Navigation from "./navigation/Navigation.jsx";
import Logo from './logo/Logo.jsx';
import { useState } from "react";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="inner-container">
            <Logo />

            {/* Hamburger / kruis knop */}
            <button
                className={`hamburger ${isMenuOpen ? "open" : ""}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <Navigation isMenuOpen={isMenuOpen} />
        </header>
    );
}

export default Header;
