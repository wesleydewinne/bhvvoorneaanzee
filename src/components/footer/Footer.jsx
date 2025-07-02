import React from "react";
import { Link } from "react-router-dom"; // nodig als je routing gebruikt
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-column">
                    <h4>Website</h4>
                    <ul>
                        {/*<li><Link to="/training">Trainingen</Link></li>*/}
                        {/*<li><Link to="/training-maatwerk">Maatwerk training</Link></li>*/}
                        {/*<li><Link to="/training-modulair">Modulair trainen</Link></li>*/}
                        {/*<li><Link to="/bedrijfsveiligheid-oefen-en-borgen">oefenen en borgen</Link></li>*/}
                        {/*<li><Link to="/sitemap">sitemap</Link></li>*/}
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Documenten</h4>
                    <ul>
                        {/*<li><Link to="/leveringsvoorwaarden">Leveringsvoorwaarden</Link></li>*/}
                        {/*<li><Link to="/cookies">Cookiebeleid</Link></li>*/}
                        {/*<li><Link to="/privacy">Privacyverklaring</Link></li>*/}
                        {/*<li><Link to="/nieuwsbrief">Aanmelding nieuwsbrief</Link></li>*/}
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Bedrijfsgegevens</h4>
                    <ul>
                        {/*<li><Link to="/over-ons">Over ons</Link></li>*/}
                        <li><Link to="#">Contact ons</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                BHV Voorne aan zee &copy; {new Date().getFullYear()} – Alle rechten voorbehouden
            </div>
        </footer>
    );
};

export default Footer;
