import { ArrowUpRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./FloatingQuoteButton.css";

function FloatingQuoteButton({
                                 to = "/offerte",
                                 label = "Offerte aanvragen",
                             }) {
    const [mobileExpanded, setMobileExpanded] = useState(false);

    function handleClick(event) {
        const isMobile = window.matchMedia("(max-width: 640px)").matches;

        if (isMobile && !mobileExpanded) {
            event.preventDefault();
            setMobileExpanded(true);
        }
    }

    return (
        <Link
            className={`floating-quote-button${mobileExpanded ? " floating-quote-button--expanded" : ""}`}
            to={to}
            aria-label={label}
            title={label}
            onClick={handleClick}
            onBlur={() => setMobileExpanded(false)}
        >
            <span className="floating-quote-button__icon" aria-hidden="true">
                <FileText />
            </span>
            <span className="floating-quote-button__content">
                <small>Vrijblijvend</small>
                <span className="floating-quote-button__text">{label}</span>
            </span>
            <ArrowUpRight className="floating-quote-button__arrow" aria-hidden="true" />
        </Link>
    );
}

export default FloatingQuoteButton;
