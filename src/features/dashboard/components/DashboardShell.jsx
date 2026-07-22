import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/features/auth/context/AuthContext.jsx";
import logo from "@/assets/image/common/logo/logo.png";
import {
    DashboardBell,
    DashboardCalendarIcon,
    DashboardHelpIcon,
    DashboardHomeIcon,
    DashboardIcon,
} from "./DashboardIcon.jsx";
import "../styles/Dashboard.css";

const sidebarItems = [
    { key: "dashboard", label: "Dashboard", to: "/dashboard", icon: "dashboard" },
    { key: "trainings", label: "Trainingen", to: "/admin/trainingen", icon: "trainings" },
    { key: "companies", label: "Bedrijven", to: "/admin/companies", icon: "companies" },
    { key: "locations", label: "Locaties", to: "/admin/locations", icon: "locations" },
    { key: "evaluations", label: "Evaluaties", to: "/admin/evaluations", icon: "evaluations" },
    { key: "quotes", label: "Offertes", to: "/admin/offertes", icon: "quotes" },
    { key: "contact", label: "Contact", to: "/admin/contact-berichten", icon: "contact" },
    { key: "reviews", label: "Reviews", to: "/admin/reviews", icon: "reviews" },
    { key: "users", label: "Gebruikers", to: "/admin/users", icon: "users" },
    { key: "invoices", label: "Facturen", to: "/admin/invoices", icon: "invoices" },
];

function DashboardShell({ children }) {
    const { user } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    const displayName =
        user?.firstName ??
        user?.firstname ??
        user?.name ??
        user?.username ??
        "Gebruiker";
    const roleLabel = getPrimaryRoleLabel(user);
    const todayLabel = useMemo(() => (
        new Intl.DateTimeFormat("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date())
    ), []);

    return (
        <main className="dashboard">
            <aside className="dashboard-sidebar" aria-label="Dashboard navigatie">
                <div className="dashboard-sidebar__brand">
                    <img src={logo} alt="BHV Voorne aan Zee" />
                </div>

                <nav className="dashboard-sidebar__nav">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.key}
                            type="button"
                            className={`dashboard-sidebar__link ${isActivePath(location.pathname, item.to) ? "is-active" : ""}`}
                            onClick={() => navigate(item.to)}
                        >
                            <DashboardIcon name={item.icon} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="dashboard-sidebar__help">
                    <DashboardHelpIcon />
                    <strong>Hulp nodig?</strong>
                    <span>We staan voor je klaar.</span>
                    <button type="button" onClick={() => navigate("/contact")}>
                        Contact opnemen
                    </button>
                </div>
            </aside>

            <div className="dashboard__container">
                <header className="dashboard-topbar" aria-label="Dashboard statusbalk">
                    <div className="dashboard-topbar__spacer" />

                    <div className="dashboard-topbar__actions">
                        <div className="dashboard-date-pill">
                            <DashboardCalendarIcon />
                            <span>{todayLabel}</span>
                        </div>

                        <button
                            type="button"
                            className="dashboard-icon-button"
                            aria-label="Meldingen bekijken"
                        >
                            <DashboardBell />
                            <span>3</span>
                        </button>

                        <button
                            type="button"
                            className="dashboard-home-button"
                            onClick={() => navigate("/")}
                            aria-label="Terug naar homepage"
                        >
                            <DashboardHomeIcon />
                            <span>Homepage</span>
                        </button>

                        <div className="dashboard-user">
                            <span className="dashboard-user__avatar">
                                {getInitials(displayName)}
                            </span>
                            <span>
                                <strong>{displayName}</strong>
                                <small>{roleLabel}</small>
                            </span>
                        </div>
                    </div>
                </header>

                {children}
            </div>
        </main>
    );
}

export default DashboardShell;

function isActivePath(pathname, target) {
    if (target === "/dashboard") {
        return pathname === target;
    }

    return pathname === target || pathname.startsWith(`${target}/`);
}

function getPrimaryRoleLabel(user) {
    const roles = user?.roles ?? user?.authorities ?? [];
    const role = Array.isArray(roles) ? roles[0] : null;

    if (!role) {
        return "Gebruiker";
    }

    const normalizedRole = typeof role === "string" ? role : role.authority ?? role.name;

    return String(normalizedRole)
        .replace(/^ROLE_/, "")
        .toLowerCase()
        .split("_")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function getInitials(name) {
    return String(name)
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("") || "BH";
}
