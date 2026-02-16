import { useState, useMemo } from "react";
import "./WorkshopPage.css";
import { moduleCategories } from "./modulaireModules.js";
import { useNavigate } from "react-router-dom";

function ModulaireTraining() {
    const navigate = useNavigate();
    const [selectedModules, setSelectedModules] = useState([]);

    const toggleModule = (module) => {
        setSelectedModules((prev) => {
            const exists = prev.find((m) => m.id === module.id);

            if (exists) {
                return prev.filter((m) => m.id !== module.id);
            } else {
                return [...prev, module];
            }
        });
    };

    // Totale tijd
    const totalDuration = useMemo(() => {
        return selectedModules.reduce((total, module) => total + module.duration, 0);
    }, [selectedModules]);

    // Subtotaal per categorie
    const getCategoryTotal = (categoryModules) => {
        return categoryModules
            .filter((m) => selectedModules.some((sel) => sel.id === m.id))
            .reduce((total, m) => total + m.duration, 0);
    };

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours === 0) return `${mins} min`;
        if (mins === 0) return `${hours} uur`;
        return `${hours} uur ${mins} min`;
    };

    return (
        <main className="workshop-page">
            <section className="workshop-content">

                <h1>Stel zelf jouw modulaire training samen</h1>

                <p>
                    Kies modules uit verschillende categorieën en stel een praktijkgerichte training op maat samen.
                    De totale duur wordt automatisch berekend.
                </p>

                {moduleCategories.map((category) => (
                    <div key={category.category} className="module-category">

                        <h2>{category.category}</h2>

                        <div className="module-grid">
                            {category.modules.map((module) => {
                                const isSelected = selectedModules.some(
                                    (m) => m.id === module.id
                                );

                                return (
                                    <div
                                        key={module.id}
                                        className={`module-card ${isSelected ? "active" : ""}`}
                                        onClick={() => toggleModule(module)}
                                    >
                                        {module.image && (
                                            <img
                                                src={module.image}
                                                alt={module.title}
                                                className="module-image"
                                            />
                                        )}

                                        <h3>{module.title}</h3>
                                        <p>{module.description}</p>
                                        <span>{module.duration} minuten</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="category-summary">
                            <strong>
                                Subtotaal {category.category}:{" "}
                                {formatTime(getCategoryTotal(category.modules))}
                            </strong>
                        </div>

                    </div>
                ))}

                <div className="training-summary">
                    <h2>Totaal geselecteerde trainingstijd</h2>
                    <p>{formatTime(totalDuration)}</p>

                    {totalDuration >= 240 && (
                        <p className="training-advice">
                            Advies: Dit komt neer op een volledige trainingsdag.
                        </p>
                    )}

                    {totalDuration >= 120 && totalDuration < 240 && (
                        <p className="training-advice">
                            Advies: Dit past binnen een dagdeeltraining.
                        </p>
                    )}
                </div>

            </section>
            <button
                className="workshop-button"
                disabled={selectedModules.length === 0}
                onClick={() =>
                    navigate("/modulair-overzicht", {
                        state: {selectedModules}
                    })
                }
            >
                Bekijk overzicht
            </button>
        </main>
    );
}

export default ModulaireTraining;
