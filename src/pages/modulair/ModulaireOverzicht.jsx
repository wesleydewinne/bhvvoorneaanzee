import { useLocation, useNavigate } from "react-router-dom";
import "./WorkshopPage.css";

function ModulaireOverzicht() {
    const location = useLocation();
    const navigate = useNavigate();

    const selectedModules = location.state?.selectedModules || [];

    const totalDuration = selectedModules.reduce(
        (total, module) => total + module.duration,
        0
    );

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours === 0) return `${mins} min`;
        if (mins === 0) return `${hours} uur`;
        return `${hours} uur ${mins} min`;
    };

    if (selectedModules.length === 0) {
        return (
            <main className="workshop-page">
                <section className="workshop-content">
                    <h1>Geen modules geselecteerd</h1>
                    <button
                        className="workshop-button"
                        onClick={() => navigate("#")}
                    >
                        Terug naar samenstellen
                    </button>
                </section>
            </main>
        );
    }

    return (
        <main className="workshop-page">
            <section className="workshop-content">

                <h1>Overzicht modulaire training</h1>

                <ul className="selected-list">
                    {selectedModules.map((module) => (
                        <li key={module.id}>
                            <strong>{module.title}</strong> – {module.duration} minuten
                        </li>
                    ))}
                </ul>

                <div className="training-summary">
                    <h2>Totaal</h2>
                    <p>{formatTime(totalDuration)}</p>
                </div>

                <button
                    className="workshop-button"
                    onClick={() =>
                        navigate("/offerte/modulair", {
                            state: {
                                selectedModules,
                                totalDuration
                            }
                        })
                    }
                >
                    Vraag offerte aan
                </button>

            </section>
        </main>
    );
}

export default ModulaireOverzicht;
