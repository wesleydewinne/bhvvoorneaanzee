import { useState } from "react";

function SimulationQuestion({ question, onAnswer }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [log, setLog] = useState([]);
    const [finished, setFinished] = useState(false);

    const stepData = question.steps.find((s) => s.id === currentStep);

    const handleChoice = (choice) => {
        setLog((prev) => [...prev, choice.label]);

        if (choice.next === "end") {
            setFinished(true); // simulatie is klaar, wacht op bevestiging
        } else {
            setCurrentStep(choice.next);
        }
    };

    const handleConfirm = () => {
        onAnswer(true, log); // zelfde gedrag als andere vragen
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>

            {!finished && stepData && (
                <div>
                    <p>{stepData.text}</p>
                    {stepData.choices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleChoice(choice)}
                            style={btnStyle}
                        >
                            {choice.label}
                        </button>
                    ))}
                </div>
            )}

            {finished && (
                <div>
                    <p>✅ Je hebt de simulatie afgerond!</p>
                    <button
                        onClick={handleConfirm}
                        style={btnStyle}
                    >
                        Bevestigen
                    </button>
                </div>
            )}

            {/* Log tonen */}
            {log.length > 0 && (
                <div style={{ marginTop: "2rem", textAlign: "left" }}>
                    <h4>Jouw keuzes:</h4>
                    <ul>
                        {log.map((entry, idx) => (
                            <li key={idx}>{entry}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const btnStyle = {
    display: "block",
    margin: "0.5rem auto",
    padding: "0.75rem 1.25rem",
    background: "#646cff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    maxWidth: "300px",
};

export default SimulationQuestion;
