import { useState, useEffect } from "react";

function MemoryQuestion({ question, onAnswer }) {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const allCards = question.pairs
            .flatMap(([a, b]) => [
                { id: `${a.label}-${Math.random()}`, value: a },
                { id: `${b.label}-${Math.random()}`, value: b }
            ])
            .sort(() => Math.random() - 0.5);

        setCards(allCards);
        setFlipped([]);
        setMatched([]);
        setFinished(false);
    }, [question]);

    const handleFlip = (card) => {
        if (
            flipped.length === 2 ||
            flipped.includes(card.id) ||
            matched.includes(card.id)
        )
            return;

        setFlipped([...flipped, card.id]);

        if (flipped.length === 1) {
            const firstCard = cards.find((c) => c.id === flipped[0]);
            if (firstCard && firstCard.value.label === card.value.label) {
                setMatched((prev) => [...prev, firstCard.id, card.id]);
            }
            setTimeout(() => setFlipped([]), 800);
        }
    };

    useEffect(() => {
        if (matched.length > 0 && matched.length === cards.length) {
            setFinished(true);
        }
    }, [matched, cards]);

    const handleConfirm = () => {
        onAnswer(true);
    };

    const renderCardContent = (value, visible) => {
        if (!visible) return "?";

        if (value.icon.startsWith("/") || value.icon.startsWith("http")) {
            return (
                <img
                    src={value.icon}
                    alt={value.label}
                    style={{ maxWidth: "70%", maxHeight: "70%" }}
                />
            );
        }
        return value.icon; // emoji of tekst
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
                    gap: "10px",
                    maxWidth: "420px",
                    margin: "0 auto 2rem"
                }}
            >
                {cards.map((card) => {
                    const visible =
                        matched.includes(card.id) || flipped.includes(card.id);
                    return (
                        <div
                            key={card.id}
                            onClick={() => handleFlip(card)}
                            style={{
                                height: "90px",
                                background: visible ? "#fff" : "#646cff",
                                color: visible ? "black" : "transparent",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                border: "2px solid #ddd",
                                borderRadius: "6px",
                                cursor: "pointer",
                                transition: "background 0.3s, color 0.3s"
                            }}
                        >
                            {renderCardContent(card.value, visible)}
                        </div>
                    );
                })}
            </div>

            {finished && (
                <button
                    onClick={handleConfirm}
                    style={{
                        padding: "0.75rem 1.5rem",
                        background: "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "1rem",
                        cursor: "pointer"
                    }}
                >
                    Bevestigen
                </button>
            )}
        </div>
    );
}

export default MemoryQuestion;
