import { useAuthContext } from "@/features/auth/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { getDashboardCards } from "../helpers/dashboardCards.js";
import { getNormalizedRoles } from "../helpers/dashboardRoleHelpers.js";
import "../styles/Dashboard.css";

function Dashboard() {
    const { user, loading, authenticated } = useAuthContext();
    const navigate = useNavigate();

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

    const roles = getNormalizedRoles(user);

    const displayName =
        user.firstName ??
        user.firstname ??
        user.name ??
        user.username ??
        "Gebruiker";

    const dashboardCards = getDashboardCards({ roles, user, navigate });

    return (
        <main className="dashboard">
            <div className="dashboard__container">
                <section className="dashboard__header" aria-labelledby="dashboard-title">
                    <h1 id="dashboard-title">Welkom terug, {displayName}!</h1>
                    <p className="dashboard__intro">
                        Kies hieronder het onderdeel dat je wilt openen. Dit dashboard
                        geeft je een centraal startpunt voor beheer, opvolging en
                        communicatie.
                    </p>
                </section>

                <section className="dashboard__grid" aria-label="Dashboard onderdelen">
                    {dashboardCards.map((card) => (
                        <article key={card.key} className="dashboard-card">
                            <div className="dashboard-card__content">
                                <h2 className="dashboard-card__title">{card.title}</h2>
                                <p className="dashboard-card__description">
                                    {card.description}
                                </p>

                                {card.meta?.length > 0 && (
                                    <ul className="dashboard-card__meta">
                                        {card.meta.map((item, index) => (
                                            <li key={index} className="dashboard-card__meta-item">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="dashboard-card__actions">
                                <button
                                    type="button"
                                    className="dashboard-card__button"
                                    onClick={card.action}
                                >
                                    {card.actionLabel}
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}

export default Dashboard;