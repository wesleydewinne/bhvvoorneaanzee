import { Link } from "react-router-dom";
import "./FloatingQuoteButton.css";

function FloatingQuoteButton({
                                 to = "/offerte",
                                 label = "Offerte aanvragen",
                             }) {
    return (
        <Link
            className="floating-quote-button"
            to={to}
            aria-label={label}
            title={label}
        >
      <span className="floating-quote-button__icon" aria-hidden="true">
        →
      </span>
            <span className="floating-quote-button__text">{label}</span>
        </Link>
    );
}

export default FloatingQuoteButton;