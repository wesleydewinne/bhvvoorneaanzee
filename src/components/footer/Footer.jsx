import React from "react";
import { Link } from "react-router-dom"; // nodig als je routing gebruikt
import "./Footer.css";
import StatusCheck from "@/components/status/StatusCheck.jsx";
import StatusIndicator from "@/components/status/StatusIndicator.jsx";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-column">
                    <h4>Website</h4>
                    <ul>
                        <li><Link to="#">Trainingen</Link></li>
                        <li><Link to="#">Maatwerk training</Link></li>
                        <li><Link to="#">Modulair trainen</Link></li>
                        <li><Link to="/blog">Blogs</Link></li>
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
                        <li><Link to="/veelgestelde-vragen">Veelgestelde vragen</Link></li>
                        <li><Link to="#">Aanmelding nieuwsbrief</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Bedrijfsgegevens</h4>
                    <ul>
                        <li><Link to="#">Over ons</Link></li>
                        <li><Link to="#">Contact ons</Link></li>
                    </ul>
                {/*  totale reviews  */}
                </div>
            </div>

            <div className="footer-bottom">
                BHV Voorne aan zee &copy; {new Date().getFullYear()} – Alle rechten voorbehouden
                <StatusCheck />
                <StatusIndicator />
            </div>
        </footer>
    );
};

export default Footer;
