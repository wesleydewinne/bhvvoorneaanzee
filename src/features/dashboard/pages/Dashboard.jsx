import { useEffect, useState } from "react";
import { useAuthContext } from "@/features/auth/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import AdminDashboardPanel from "../components/AdminDashboardPanel.jsx";
import CursistDashboardPanel from "../components/CursistDashboardPanel.jsx";
import DashboardCard from "../components/DashboardCard.jsx";
import RoleDashboardRenderer from "../components/RoleDashboardRenderer.jsx";
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

    return (
        <main className="dashboard">
            <div className="dashboard__container">
                <section className="dashboard__header" aria-labelledby="dashboard-title">
                    <div className="dashboard__header-content">
                        <p className="dashboard__eyebrow">
                            {getDashboardProfileLabel(dashboardProfile)}
                        </p>
                        <h1 id="dashboard-title">Welkom terug, {displayName}!</h1>

                        <p className="dashboard__intro">
                            Kies hieronder waar je mee verder wilt. Dit dashboard geeft
                            je een centraal startpunt voor beheer, opvolging en je
                            persoonlijke account.
                        </p>
                    </div>

                    <div className="dashboard__roles" aria-label="Jouw rollen">
                        {roleLabels.length > 0 ? (
                            roleLabels.map((role) => (
                                <span key={role} className="dashboard__role-badge">
                                    {role}
                                </span>
                            ))
                        ) : (
                            <span className="dashboard__role-badge">Gebruiker</span>
                        )}
                    </div>
                </section>

                <section className="dashboard__overview" aria-label="Dashboard overzicht">
                    {dashboardStats.map((item) => (
                        <article key={item.key} className="dashboard-stat">
                            <strong>{item.value}</strong>
                            <span>{item.label}</span>
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
                                <span>{action.label}</span>
                                <small>{action.helper}</small>
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
