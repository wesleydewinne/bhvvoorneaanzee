import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/features/auth/context/AuthContext.jsx";
import logo from "@/assets/image/common/logo/logo.png";
import {
    DashboardBell,
    DashboardCalendarIcon,
    DashboardChevron,
    DashboardHelpIcon,
    DashboardHomeIcon,
    DashboardIcon,
} from "./DashboardIcon.jsx";
import { DASHBOARD_PROFILE_TYPES, resolveDashboardProfile } from "../helpers/dashboardProfiles.js";
import { getNormalizedRoles } from "../helpers/dashboardRoleHelpers.js";
import { getVisibleDashboardNavigation } from "../helpers/dashboardNavigation.js";
import dashboardService from "../services/dashboardService.js";
import "../styles/Dashboard.css";

function DashboardShell({ children }) {
    const { user } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [adminOverview, setAdminOverview] = useState(null);
    const [notificationsLoading, setNotificationsLoading] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem("dashboard-sidebar-collapsed") === "true");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState(() => new Set(["planning", "relations"]));
    const roles = getNormalizedRoles(user);
    const navigationGroups = getVisibleDashboardNavigation(roles);
    const isAdmin = resolveDashboardProfile(roles).type === DASHBOARD_PROFILE_TYPES.ADMIN;
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
    const notificationCount = isAdmin
        ? (adminOverview?.openQuoteCount ?? 0) + (adminOverview?.openContactMessageCount ?? 0)
        : 0;

    useEffect(() => {
        if (!isAdmin) {
            return;
        }

        let isMounted = true;

        const loadNotifications = async () => {
            setNotificationsLoading(true);

            try {
                const overview = await dashboardService.getAdminOverview();

                if (isMounted) {
                    setAdminOverview(overview);
                }
            } catch {
                if (isMounted) {
                    setAdminOverview(null);
                }
            } finally {
                if (isMounted) {
                    setNotificationsLoading(false);
                }
            }
        };

        void loadNotifications();

        return () => {
            isMounted = false;
        };
    }, [isAdmin]);

    const openNotificationTarget = (target) => {
        setNotificationsOpen(false);
        navigate(target);
    };

    const navigateFromMenu = (target) => {
        setMobileMenuOpen(false);
        navigate(target);
    };

    const toggleSidebar = () => {
        setSidebarCollapsed((collapsed) => {
            localStorage.setItem("dashboard-sidebar-collapsed", String(!collapsed));
            return !collapsed;
        });
    };

    const toggleGroup = (groupKey) => {
        if (sidebarCollapsed) {
            setSidebarCollapsed(false);
            localStorage.setItem("dashboard-sidebar-collapsed", "false");
        }

        setExpandedGroups((current) => {
            const next = new Set(current);
            next.has(groupKey) ? next.delete(groupKey) : next.add(groupKey);
            return next;
        });
    };

    return (
        <main className={`dashboard ${sidebarCollapsed ? "dashboard--sidebar-collapsed" : ""} ${mobileMenuOpen ? "dashboard--menu-open" : ""}`}>
            {mobileMenuOpen && (
                <button className="dashboard-sidebar-backdrop" type="button" aria-label="Menu sluiten" onClick={() => setMobileMenuOpen(false)} />
            )}
            <aside className="dashboard-sidebar" aria-label="Dashboard navigatie">
                <div className="dashboard-sidebar__brand">
                    <img src={logo} alt="BHV Voorne aan Zee" />
                    <button type="button" className="dashboard-sidebar__toggle" onClick={toggleSidebar} aria-label={sidebarCollapsed ? "Menu uitklappen" : "Menu inklappen"}>
                        <DashboardIcon name={sidebarCollapsed ? "menu" : "close"} />
                    </button>
                </div>

                <nav className="dashboard-sidebar__nav">
                    <button type="button" className={`dashboard-sidebar__link ${isActivePath(location.pathname, "/dashboard") ? "is-active" : ""}`} onClick={() => navigateFromMenu("/dashboard")}>
                        <DashboardIcon name="dashboard" />
                        <span>Dashboard</span>
                    </button>

                    {navigationGroups.map((group) => {
                        const groupActive = group.items.some((item) => isActivePath(location.pathname, item.to));
                        const expanded = expandedGroups.has(group.key) || groupActive;

                        return (
                            <section key={group.key} className={`dashboard-sidebar__group ${groupActive ? "is-active" : ""}`}>
                                <button type="button" className="dashboard-sidebar__group-button" onClick={() => toggleGroup(group.key)} aria-expanded={expanded} title={group.label}>
                                    <DashboardIcon name={group.icon} />
                                    <span>{group.label}</span>
                                    <DashboardChevron className="dashboard-sidebar__group-chevron" />
                                </button>
                                {expanded && (
                                    <div className="dashboard-sidebar__group-items">
                                        {group.items.map((item) => (
                                            <button key={item.key} type="button" title={item.label} className={`dashboard-sidebar__sub-link ${isActivePath(location.pathname, item.to) ? "is-active" : ""}`} onClick={() => navigateFromMenu(item.to)}>
                                                <DashboardIcon name={item.icon} />
                                                <span>{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </section>
                        );
                    })}
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
                    <button type="button" className="dashboard-mobile-menu" onClick={() => setMobileMenuOpen(true)} aria-label="Navigatiemenu openen">
                        <DashboardIcon name="menu" />
                        <span>Menu</span>
                    </button>

                    <div className="dashboard-topbar__actions">
                        <div className="dashboard-date-pill">
                            <DashboardCalendarIcon />
                            <span>{todayLabel}</span>
                        </div>

                        <div className="dashboard-notifications">
                            <button
                                type="button"
                                className="dashboard-icon-button"
                                aria-label={notificationCount > 0
                                    ? `${notificationCount} openstaande meldingen bekijken`
                                    : "Meldingen bekijken"}
                                aria-expanded={notificationsOpen}
                                aria-controls="dashboard-notifications-panel"
                                onClick={() => setNotificationsOpen((open) => !open)}
                            >
                                <DashboardBell />
                                {notificationCount > 0 && (
                                    <span>{notificationCount > 99 ? "99+" : notificationCount}</span>
                                )}
                            </button>

                            {notificationsOpen && (
                                <div
                                    id="dashboard-notifications-panel"
                                    className="dashboard-notifications__panel"
                                    role="region"
                                    aria-label="Openstaande meldingen"
                                >
                                    <div className="dashboard-notifications__header">
                                        <strong>Aandacht nodig</strong>
                                        <small>{notificationCount} openstaand</small>
                                    </div>

                                    {notificationsLoading ? (
                                        <p>Meldingen laden...</p>
                                    ) : isAdmin ? (
                                        <div className="dashboard-notifications__list">
                                            <NotificationItem
                                                label="Open offertes"
                                                count={adminOverview?.openQuoteCount ?? 0}
                                                onClick={() => openNotificationTarget("/admin/offertes")}
                                            />
                                            <NotificationItem
                                                label="Contactberichten"
                                                count={adminOverview?.openContactMessageCount ?? 0}
                                                onClick={() => openNotificationTarget("/admin/contact-berichten")}
                                            />
                                            <NotificationItem
                                                label="Geplande trainingen"
                                                count={adminOverview?.upcomingTrainingCount ?? 0}
                                                onClick={() => openNotificationTarget("/admin/trainingen")}
                                                informational
                                            />
                                        </div>
                                    ) : (
                                        <p>Je hebt geen openstaande meldingen.</p>
                                    )}
                                </div>
                            )}
                        </div>

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

function NotificationItem({ label, count, onClick, informational = false }) {
    return (
        <button type="button" onClick={onClick} disabled={count === 0}>
            <span>
                <strong>{label}</strong>
                <small>{informational ? "Ter informatie" : "Actie vereist"}</small>
            </span>
            <b>{count}</b>
        </button>
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
