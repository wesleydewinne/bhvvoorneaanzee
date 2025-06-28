import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
    return (
        <div className="notfound-container">
            <h1>404 - Pagina niet gevonden</h1>
            <p>De pagina die je probeert te bezoeken bestaat niet of is verplaatst.</p>
            <Link to="/" className="notfound-link">Ga terug naar de homepage</Link>
        </div>
    );
}
