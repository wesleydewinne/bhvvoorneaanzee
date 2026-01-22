import { useState } from "react";

const questions = [
    {
        id: "focus",
        question: "Waar wil je vooral inzicht in?",
        options: [
            "BHV",
            "EHBO",
            "Ontruiming",
            "Combinatie",
            "Weet ik niet zeker"
        ]
    },
    {
        id: "role",
        question: "Wat is jouw rol binnen de organisatie?",
        options: [
            "Eigenaar / directie",
            "HR / management",
            "PloegleiderBasis2Daagse.jsx / BHV’er",
            "Medewerker / anders"
        ]
    },
    {
        id: "currentState",
        question: "Hoe is de veiligheid nu geregeld?",
        options: [
            "Goed geregeld, maar mogelijk verouderd",
            "Gedeeltelijk geregeld",
            "Onvoldoende / onduidelijk",
            "Geen idee"
        ]
    },
    {
        id: "urgency",
        question: "Wanneer wil je hier iets mee doen?",
        options: [
            "Zo snel mogelijk",
            "Binnen 3 maanden",
            "Later dit jaar",
            "Oriënterend"
        ]
    }
];

export default function SafetyWizard({ onSubmit }) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const totalSteps = questions.length + 1;

    function handleAnswer(value) {
        const key = questions[step].id;
        setAnswers(prev => ({ ...prev, [key]: value }));
        setStep(prev => prev + 1);
    }

    function goBack() {
        setStep(prev => Math.max(prev - 1, 0));
    }

    function handleFinalSubmit(e) {
        e.preventDefault();

        console.log("🚀 FORM SUBMIT GEDRUKT");
        console.log("📦 ANSWERS OBJECT:", answers);

        onSubmit(answers);
    }

    return (
        <div className="wizard glass">
            <div className="wizard-progress">
                Vraag {step + 1} van {totalSteps}
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            {/* Vragen */}
            {step < questions.length && (
                <>
                    <h2 className="wizard-question">
                        {questions[step].question}
                    </h2>

                    <div className="wizard-options">
                        {questions[step].options.map(option => (
                            <button
                                key={option}
                                className="wizard-option"
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {step > 0 && (
                        <button className="wizard-back" onClick={goBack}>
                            ← Terug
                        </button>
                    )}
                </>
            )}

            {/* Contactgegevens */}
            {step === questions.length && (
                <form className="wizard-form" onSubmit={handleFinalSubmit}>
                    <h2>Waar mogen we het resultaat naartoe sturen?</h2>

                    <label>
                        Naam
                        <input
                            type="text"
                            required
                            onChange={e =>
                                setAnswers(prev => ({ ...prev, name: e.target.value }))
                            }
                        />
                    </label>

                    <label>
                        E-mailadres
                        <input
                            type="email"
                            required
                            onChange={e =>
                                setAnswers(prev => ({ ...prev, email: e.target.value }))
                            }
                        />
                    </label>

                    <label>
                        Organisatie (optioneel)
                        <input
                            type="text"
                            onChange={e =>
                                setAnswers(prev => ({ ...prev, company: e.target.value }))
                            }
                        />
                    </label>

                    <button type="submit" className="btn primary full">
                        Verstuur veiligheidscheck →
                    </button>

                    <button type="button" className="wizard-back" onClick={goBack}>
                        ← Terug
                    </button>
                </form>
            )}
        </div>
    );
}
