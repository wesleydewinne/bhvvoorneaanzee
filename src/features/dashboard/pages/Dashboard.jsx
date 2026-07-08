import { useEffect, useState } from "react";
import { useAuthContext } from "@/features/auth/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import AdminDashboardPanel from "../components/AdminDashboardPanel.jsx";
import CursistDashboardPanel from "../components/CursistDashboardPanel.jsx";
import DashboardCard from "../components/DashboardCard.jsx";
import {
    DashboardBell,
    DashboardCalendarIcon,
    DashboardChevron,
    DashboardHelpIcon,
    DashboardHomeIcon,
    DashboardIcon,
} from "../components/DashboardIcon.jsx";
import RoleDashboardRenderer from "../components/RoleDashboardRenderer.jsx";
import logo from "@/assets/image/common/logo/logo.png";
import {
    getDashboardCards,
    getDashboardQuickActions,
    getDashboardStats,
} from "../helpers/dashboardCards.js";
import {
    DASHBOARD_PROFILE_TYPES,
    getRoleLabels,
    resolveDashboardProfile,
} from "../helpers/dashboardProfiles.js";
import { getNormalizedRoles } from "../helpers/dashboardRoleHelpers.js";
import dashboardService from "../services/dashboardService.js";
import "../styles/Dashboard.css";

function Dashboard() {
    const { user, loading, authenticated } = useAuthContext();
    const navigate = useNavigate();
    const [overview, setOverview] = useState(null);
    const [overviewLoading, setOverviewLoading] = useState(false);
    const [overviewError, setOverviewError] = useState("");
    const [cursistOverview, setCursistOverview] = useState(null);
    const [cursistOverviewLoading, setCursistOverviewLoading] = useState(false);
    const [cursistOverviewError, setCursistOverviewError] = useState("");
    const [roleOverview, setRoleOverview] = useState(null);
    const [roleOverviewLoading, setRoleOverviewLoading] = useState(false);
    const [roleOverviewError, setRoleOverviewError] = useState("");
    const roles = getNormalizedRoles(user);
    const dashboardProfile = resolveDashboardProfile(roles);
    const canLoadAdminOverview =
        authenticated &&
        dashboardProfile.type === DASHBOARD_PROFILE_TYPES.ADMIN;
    const canLoadCursistOverview =
        authenticated &&
        dashboardProfile.type === DASHBOARD_PROFILE_TYPES.CURSIST;
    const canLoadRoleOverview =
        authenticated &&
        canUseRoleOverview(dashboardProfile.type);

    useEffect(() => {
        if (!canLoadAdminOverview) {
            setOverview(null);
            setOverviewError("");
            return;
        }

        let isMounted = true;

        const loadOverview = async () => {
            try {
                setOverviewLoading(true);
                setOverviewError("");

                const data = await dashboardService.getAdminOverview();

                if (!isMounted) {
                    return;
                }

                setOverview(data);

                if (data.failedSources?.length > 0) {
                    setOverviewError(
                        `Niet alle dashboardgegevens konden worden geladen: ${data.failedSources.join(", ")}.`
                    );
                }
            } catch (err) {
                if (!isMounted) {
                    return;
                }

                setOverview(null);
                setOverviewError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Dashboardgegevens laden is mislukt."
                );
            } finally {
                if (isMounted) {
                    setOverviewLoading(false);
                }
            }
        };

        void loadOverview();

        return () => {
            isMounted = false;
        };
    }, [canLoadAdminOverview]);

    useEffect(() => {
        if (!canLoadCursistOverview) {
            setCursistOverview(null);
            setCursistOverviewError("");
            return;
        }

        let isMounted = true;

        const loadCursistOverview = async () => {
            try {
                setCursistOverviewLoading(true);
                setCursistOverviewError("");

                const data = await dashboardService.getCursistOverview();

                if (!isMounted) {
                    return;
                }

                setCursistOverview(data);

                if (data.failedSources?.length > 0) {
                    setCursistOverviewError(
                        `Nog niet alle cursistgegevens zijn beschikbaar: ${data.failedSources.join(", ")}.`
                    );
                }
            } catch (err) {
                if (!isMounted) {
                    return;
                }

                setCursistOverview(null);
                setCursistOverviewError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Cursistgegevens laden is mislukt."
                );
            } finally {
                if (isMounted) {
                    setCursistOverviewLoading(false);
                }
            }
        };

        void loadCursistOverview();

        return () => {
            isMounted = false;
        };
    }, [canLoadCursistOverview]);

    useEffect(() => {
        if (!canLoadRoleOverview) {
            setRoleOverview(null);
            setRoleOverviewError("");
            return;
        }

        let isMounted = true;

        const loadRoleOverview = async () => {
            try {
                setRoleOverviewLoading(true);
                setRoleOverviewError("");

                const data = await dashboardService.getRoleOverview(dashboardProfile.type);

                if (!isMounted) {
                    return;
                }

                setRoleOverview(data);
            } catch (err) {
                if (!isMounted) {
                    return;
                }

                setRoleOverview(null);
                setRoleOverviewError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Rolgegevens laden is mislukt."
                );
            } finally {
                if (isMounted) {
                    setRoleOverviewLoading(false);
                }
            }
        };

        void loadRoleOverview();

        return () => {
            isMounted = false;
        };
    }, [canLoadRoleOverview, dashboardProfile.type]);

    if (loading) {
        return (
            <main className="dashboard">
                <div className="dashboard__container">
                    <p>Gegevens laden...</p>
                </div>
            </main>
        );
    }

    if (!authenticated) {
        return (
            <main className="dashboard">
                <div className="dashboard__container">
                    <p className="dashboard__message dashboard__message--error">
                        Je bent niet ingelogd.
                    </p>
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="dashboard">
                <div className="dashboard__container">
                    <p className="dashboard__message">
                        Geen gebruikersgegevens gevonden.
                    </p>
                </div>
            </main>
        );
    }

    const displayName =
        user.firstName ??
        user.firstname ??
        user.name ??
        user.username ??
        "Gebruiker";

    const dashboardCards = getDashboardCards({
        dashboardProfile,
        roles,
        user,
        navigate,
    });
    const quickActions = getDashboardQuickActions({
        dashboardProfile,
        roles,
        navigate,
    });
    const dashboardStats = getDashboardStats({
        dashboardProfile,
        roles,
        user,
        overview,
        overviewLoading,
        cursistOverview,
        cursistOverviewLoading,
        roleOverview,
        roleOverviewLoading,
    });
    const roleLabels = getRoleLabels(roles);
    const todayLabel = new Intl.DateTimeFormat("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date());
    const primaryRole = roleLabels[0] ?? "Gebruiker";

    return (
        <main className="dashboard">
            <aside className="dashboard-sidebar" aria-label="Dashboard navigatie">
                <div className="dashboard-sidebar__brand">
                    <img src={logo} alt="BHV Voorne aan Zee" />
                </div>

                <nav className="dashboard-sidebar__nav">
                    <button type="button" className="dashboard-sidebar__link is-active">
                        <DashboardIcon name="dashboard" />
                        <span>Dashboard</span>
                    </button>

                    <button
                        type="button"
                        className="dashboard-sidebar__link"
                        onClick={() => navigate("/")}
                    >
                        <DashboardHomeIcon />
                        <span>Homepage</span>
                    </button>

                    {dashboardCards
                        .filter((card) => card.key !== "quotes" && !card.key.includes("quotes"))
                        .slice(0, 8)
                        .map((card) => (
                        <button
                            key={card.key}
                            type="button"
                            className="dashboard-sidebar__link"
                            onClick={card.action}
                        >
                            <DashboardIcon name={card.iconKey ?? card.key} />
                            <span>{card.title}</span>
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
                <header className="dashboard-topbar">
                    <section className="dashboard__header" aria-labelledby="dashboard-title">
                        <p className="dashboard__eyebrow">
                            {getDashboardProfileLabel(dashboardProfile)}
                        </p>
                        <h1 id="dashboard-title">Goedemorgen, {displayName}!</h1>
                        <p className="dashboard__intro">
                            Hier is wat er vandaag speelt bij BHV Voorne aan Zee.
                        </p>
                    </section>

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

                        <div className="dashboard-user">
                            <span className="dashboard-user__avatar">
                                {getInitials(displayName)}
                            </span>
                            <span>
                                <strong>{displayName}</strong>
                                <small>{primaryRole}</small>
                            </span>
                        </div>
                    </div>
                </header>

                <section className="dashboard__overview" aria-label="Dashboard overzicht">
                    {dashboardStats.map((item) => (
                        <article key={item.key} className="dashboard-stat">
                            <span className="dashboard-stat__icon">
                                <DashboardIcon name={item.iconKey ?? item.key} />
                            </span>
                            <span className="dashboard-stat__body">
                                <strong>{item.value}</strong>
                                <span>{item.label}</span>
                            </span>
                        </article>
                    ))}
                </section>

                {canLoadAdminOverview && (
                    <AdminDashboardPanel
                        overview={overview}
                        loading={overviewLoading}
                        error={overviewError}
                    />
                )}

                {canLoadCursistOverview && (
                    <CursistDashboardPanel
                        overview={cursistOverview}
                        loading={cursistOverviewLoading}
                        error={cursistOverviewError}
                    />
                )}

                {canLoadRoleOverview && (
                    <RoleDashboardRenderer
                        profileType={dashboardProfile.type}
                        overview={roleOverview}
                        loading={roleOverviewLoading}
                        error={roleOverviewError}
                    />
                )}

                <section className="dashboard__quick-actions" aria-labelledby="quick-actions-title">
                    <div>
                        <p className="dashboard__eyebrow">Snel verder</p>
                        <h2 id="quick-actions-title">Meest gebruikte acties</h2>
                    </div>

                    <div className="dashboard__quick-list">
                        {quickActions.map((action) => (
                            <button
                                key={action.key}
                                type="button"
                                className="dashboard__quick-button"
                                onClick={action.action}
                            >
                                <span className="dashboard__quick-icon">
                                    <DashboardIcon name={action.iconKey ?? action.key} />
                                </span>
                                <span>{action.label}</span>
                                <small>{action.helper}</small>
                                <DashboardChevron className="dashboard__quick-arrow" />
                            </button>
                        ))}
                    </div>
                </section>

                <div className="dashboard__section-heading">
                    <p className="dashboard__eyebrow">Onderdelen</p>
                    <h2>Wat wil je openen?</h2>
                </div>

                <section className="dashboard__grid" aria-label="Dashboard onderdelen">
                    {dashboardCards.map((card) => (
                        <DashboardCard key={card.key} card={card} />
                    ))}
                </section>
            </div>
        </main>
    );
}

export default Dashboard;

function getDashboardProfileLabel(profile) {
    const labels = {
        admin: "Beheer dashboard",
        cursist: "Cursist dashboard",
        trainer: "Trainer dashboard",
        office: "Kantoor dashboard",
        "training-manager": "Training manager dashboard",
        "safety-manager": "Safety manager dashboard",
        finance: "Finance dashboard",
        "building-owner": "Gebouw dashboard",
        "location-manager": "Locatie dashboard",
        technician: "Techniek dashboard",
        "team-leader": "Teamleider dashboard",
        default: "Dashboard",
    };

    return labels[profile.type] ?? "Dashboard";
}

function canUseRoleOverview(profileType) {
    return [
        DASHBOARD_PROFILE_TYPES.TRAINER,
        DASHBOARD_PROFILE_TYPES.TRAINING_MANAGER,
        DASHBOARD_PROFILE_TYPES.SAFETY_MANAGER,
        DASHBOARD_PROFILE_TYPES.FINANCE,
        DASHBOARD_PROFILE_TYPES.BUILDING_OWNER,
        DASHBOARD_PROFILE_TYPES.LOCATION_MANAGER,
        DASHBOARD_PROFILE_TYPES.TECHNICIAN,
        DASHBOARD_PROFILE_TYPES.TEAM_LEADER,
    ].includes(profileType);
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
