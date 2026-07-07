import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

const BackendStatus = lazy(() =>
    import("@/shared/components/ui/status/BackendStatus.jsx")
);

const footerGroups = [
    {
        title: "Trainingen",
        links: [
            { label: "BHV trainingen", to: "/bhv" },
            { label: "Ploegleider BHV", to: "/ploegleider" },
            { label: "Ontruimingsoefening", to: "/ontruimingsoefening" },
            { label: "EHBO", to: "/ehbo" },
            { label: "Workshops", to: "/workshops" },
        ],
    },
    {
        title: "Voor jouw organisatie",
        links: [
            { label: "Werkgebied", to: "/regio" },
            { label: "Maatwerk training", to: "/maatwerk" },
            { label: "Modulair trainen", to: "/modulaire-trainen" },
            { label: "Veiligheidscheck", to: "/veiligheidscheck" },
            { label: "Veelgestelde vragen", to: "/veelgestelde-vragen" },
        ],
    },
    {
        title: "BHV Voorne aan Zee",
        links: [
            { label: "Over ons", to: "/over-ons" },
            { label: "Contact", to: "/contact" },
            { label: "Blog", to: "/blog" },
            { label: "Bedrijfsgegevens", to: "/bedrijfsgegevens" },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-links">
                    {footerGroups.map((group) => (
                        <nav
                            className="footer-column"
                            aria-label={group.title}
                            key={group.title}
                        >
                            <h4>{group.title}</h4>

                            <ul>
                                {group.links.map((link) => (
                                    <li key={link.to}>
                                        <Link to={link.to}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-status">
                    <Suspense fallback={null}>
                        <BackendStatus />
                    </Suspense>
                </div>

                <small className="footer-copy">
                    BHV Voorne aan Zee &copy; {new Date().getFullYear()} - Alle rechten voorbehouden -{" "}
                    <Link to="/bedrijfsgegevens">Bedrijfsgegevens</Link>
                </small>
            </div>
        </footer>
    );
};

export default Footer;