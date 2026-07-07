import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import useAuth from "@/features/auth/hooks/useAuth.js";
import logo from "@/assets/image/common/logo/logo.png";

import "./Header.css";

const mainNavItems = [
    { to: "/bhv", label: "BHV" },
    { to: "/ploegleider", label: "Ploegleider" },
    { to: "/ontruimingsoefening", label: "Ontruiming" },
    { to: "/ehbo", label: "EHBO" },
    { to: "/workshops", label: "Workshops" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { authenticated, loading, roles = [], logout } = useAuth();
    const navigate = useNavigate();

    const isAdmin = roles.includes("ROLE_ADMIN");
    const isTrainer = roles.includes("ROLE_TRAINER");
    const isStudent = roles.includes("ROLE_STUDENT");
    const isSafety = roles.includes("ROLE_SAFETY_MANAGER");

    const userStatusClass = authenticated ? "status-online" : "status-offline";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);

        onScroll();
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavigate = (to) => {
        setMenuOpen(false);
        setUserMenuOpen(false);
        navigate(to);
    };

    const handleNavLinkClick = () => {
        setMenuOpen(false);
        setUserMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
            handleNavigate("/inloggen");
        } catch (err) {
            console.error("Uitloggen mislukt:", err);
        }
    };

    return (
        <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
            <div className="header-inner">
                <Link
                    to="/"
                    className="header-brand"
                    onClick={handleNavLinkClick}
                    aria-label="Ga naar de homepage van BHV Voorne aan Zee"
                >
                    <img
                        src={logo}
                        alt="BHV Voorne aan Zee"
                        className="header-logo"
                    />
                </Link>

                <nav
                    id="main-navigation"
                    className={`main-nav ${menuOpen ? "open" : ""}`}
                    aria-label="Hoofdnavigatie"
                >
                    <ul>
                        {mainNavItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    className="nav-link"
                                    onClick={handleNavLinkClick}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="header-actions">
                    <button
                        type="button"
                        className={`user-icon-wrapper ${userStatusClass}`}
                        onClick={() => setUserMenuOpen((prev) => !prev)}
                        aria-label={authenticated ? "Accountmenu openen" : "Inloggen of accountmenu openen"}
                        aria-expanded={userMenuOpen}
                        aria-controls="user-dropdown"
                        title={authenticated ? "Ingelogd" : "Niet ingelogd - klik om in te loggen"}
                    >
                        <span className="user-icon" aria-hidden="true" />
                    </button>

                    <button
                        type="button"
                        className={`hamburger ${menuOpen ? "open" : ""}`}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
                        aria-expanded={menuOpen}
                        aria-controls="main-navigation"
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </button>

                    {userMenuOpen && !loading && (
                        <div id="user-dropdown" className="user-dropdown">
                            {!authenticated && (
                                <button type="button" onClick={() => handleNavigate("/inloggen")}>
                                    Inloggen
                                </button>
                            )}

                            {authenticated && (
                                <>
                                    <div className="user-dropdown-section-title">Mijn account</div>

                                    <button type="button" onClick={() => handleNavigate("/dashboard")}>
                                        Dashboard
                                    </button>
                                    <button type="button" onClick={() => handleNavigate("/profile")}>
                                        Profiel
                                    </button>
                                    <button type="button" className="logout-btn" onClick={handleLogout}>
                                        Uitloggen
                                    </button>

                                    {isAdmin && (
                                        <>
                                            <div className="user-dropdown-section-title">Admin</div>
                                            <button type="button" onClick={() => handleNavigate("/admin/users")}>
                                                Gebruikersbeheer
                                            </button>
                                            <button type="button" onClick={() => handleNavigate("/admin/trainingen")}>
                                                Trainingbeheer
                                            </button>
                                            <button type="button" onClick={() => handleNavigate("/admin/invoices")}>
                                                Facturen
                                            </button>
                                            <button type="button" onClick={() => handleNavigate("/admin/locations")}>
                                                Locatiebeheer
                                            </button>
                                        </>
                                    )}

                                    {isTrainer && (
                                        <>
                                            <div className="user-dropdown-section-title">Trainer</div>
                                            <button type="button" onClick={() => handleNavigate("/admin/trainingen")}>
                                                Mijn trainingen
                                            </button>
                                            <button type="button" onClick={() => handleNavigate("/admin/trainingen")}>
                                                Cursistenbeheer
                                            </button>
                                            <button type="button" onClick={() => handleNavigate("/dashboard")}>
                                                Ontruimingsverslagen
                                            </button>
                                        </>
                                    )}

                                    {isStudent && (
                                        <>
                                            <div className="user-dropdown-section-title">Cursist</div>
                                            <button type="button" onClick={() => handleNavigate("/dashboard")}>
                                                Mijn trainingen
                                            </button>
                                            <button type="button" onClick={() => handleNavigate("/profile")}>
                                                Mijn certificaten
                                            </button>
                                        </>
                                    )}

                                    {isSafety && (
                                        <>
                                            <div className="user-dropdown-section-title">Veiligheid</div>
                                            <button type="button" onClick={() => handleNavigate("/admin/locations")}>
                                                Veiligheidsrapportage
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
