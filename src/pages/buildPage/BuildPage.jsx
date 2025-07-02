import React from "react";
import "./BuildPage.css";

export default function BuildPage() {
    return (
        <div className="page-container">
            <h1>Website in aanbouw</h1>
            <p>
                We zijn bezig met het bouwen van een nieuwe website. Kom snel terug voor meer informatie!
            </p>

            <section className="page-footer">
                Heb je vragen?{' '}
                <a href="mailto:algemeen@bhvvoorneaanzee.nl" className="email-link">
                    Email ons
                </a>
            </section>
        </div>
    );
}
