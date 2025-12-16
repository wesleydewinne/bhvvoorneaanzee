// src/components/header/Header.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/algemeneAfbeeldingen/logo.png";
import "./Header.css";
import useAuth from "@/hooks/useAuth";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { authenticated, loading, roles = [], logout } = useAuth();
    const navigate = useNavigate();

    // Rollen
    const isAdmin = roles.includes("ROLE_ADMIN");
    const isTrainer = roles.includes("ROLE_TRAINER");
    const isStudent = roles.includes("ROLE_STUDENT");
    const isSafety = roles.includes("ROLE_SAFETY_MANAGER");

    // Glow
    const userStatusClass = authenticated ? "status-online" : "status-offline";

    // Scroll effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Navigeren
    const handleNavigate = (to) => {
        setMenuOpen(false);
        setUserMenuOpen(false);
        navigate(to);
    };

    // 🔥 NIEUWE logout: geen witte pagina meer
    const handleLogout = async () => {
        try {
            await logout(); // AuthContext zorgt voor het legen van state
            setUserMenuOpen(false);
            setMenuOpen(false);
            navigate("/inloggen"); // Zonder reload = geen witte pagina
        } catch (err) {
            console.error("Uitloggen mislukt:", err);
        }
    };

    return (
        <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
            <div className="header-inner">

                {/* LOGO */}
                <div className="header-left">
                    <Link to="/" onClick={() => handleNavigate("/")}>
                        <img
                            src={logo}
                            alt="BHV Voorne aan Zee"
                            className="header-logo"
                        />
                    </Link>
                </div>

                {/* NAV */}
                <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li><NavLink to="/bhv" className="nav-link" onClick={() => handleNavigate("/bhv")}>BHV</NavLink></li>
                        <li><NavLink to="/ploegleider" className="nav-link" onClick={() => handleNavigate("/ploegleider")}>Ploegleider</NavLink></li>
                        <li><NavLink to="/ontruimingsoefening" className="nav-link" onClick={() => handleNavigate("/ontruimingsoefening")}>Ontruimingsoefening</NavLink></li>
                        <li><NavLink to="/ehbo" className="nav-link" onClick={() => handleNavigate("/ehbo")}>EHBO</NavLink></li>
                        <li><NavLink to="/workshops" className="nav-link" onClick={() => handleNavigate("/workshops")}>Workshops</NavLink></li>
                    </ul>
                </nav>

                {/* RECHTS */}
                <div className="header-right">

                    {/* Hamburger */}
                    <button
                        className={`hamburger ${menuOpen ? "open" : ""}`}
                        onClick={() => setMenuOpen(prev => !prev)}
                    >
                        <span></span><span></span><span></span>
                    </button>

                    {/* USER ICON */}
                    <div
                        className={`user-icon-wrapper ${userStatusClass}`}
                        onClick={() => setUserMenuOpen(prev => !prev)}
                        title={authenticated ? "Ingelogd" : "Niet ingelogd - klik om in te loggen"}
                    >
                        <div className="user-icon"></div>
                    </div>

                    {/* DROPDOWN */}
                    {userMenuOpen && !loading && (
                        <div className="user-dropdown">

                            {!authenticated && (
                                <button onClick={() => handleNavigate("/inloggen")}>Inloggen</button>
                            )}

                            {authenticated && (
                                <>
                                    <div className="user-dropdown-section-title">Mijn account</div>
                                    <button onClick={() => handleNavigate("/dashboard")}>Dashboard</button>
                                    <button onClick={() => handleNavigate("/profile")}>Profiel</button>
                                    <button className="logout-btn" onClick={handleLogout}>Uitloggen</button>

                                    {isAdmin && (
                                        <>
                                            <div className="user-dropdown-section-title">Admin</div>
                                            <button onClick={() => handleNavigate("/admin/users")}>Gebruikersbeheer
                                            </button>
                                            <button onClick={() => handleNavigate("/admin/trainings")}>Trainingbeheer
                                            </button>
                                            <button onClick={() => handleNavigate("/admin/invoices")}>Facturen
                                            </button>
                                            <button onClick={() => handleNavigate("/admin/gebouwbeheer")}>Gebouw beheer
                                            </button>
                                        </>
                                    )}

                                    {isTrainer && (
                                        <>
                                            <div className="user-dropdown-section-title">Trainer</div>
                                            <button onClick={() => handleNavigate("/trainer/trainings")}>Mijn
                                                trainingen
                                            </button>
                                            <button
                                                onClick={() => handleNavigate("/trainer/students")}>Cursistenbeheer
                                            </button>
                                            <button
                                                onClick={() => handleNavigate("/trainer/verslagen")}>Ontruimingsverslagen
                                            </button>
                                        </>
                                    )}

                                    {isStudent && (
                                        <>
                                            <div className="user-dropdown-section-title">Cursist</div>
                                            <button onClick={() => handleNavigate("/student/trainings")}>Mijn
                                                trainingen
                                            </button>
                                            <button onClick={() => handleNavigate("/student/certificaten")}>Mijn
                                                certificaten
                                            </button>
                                        </>
                                    )}

                                    {isSafety && (
                                        <>
                                            <div className="user-dropdown-section-title">Veiligheid</div>
                                            <button
                                                onClick={() => handleNavigate("/safety/verslagen")}>Veiligheidsrapportage
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
