import { useState, useEffect } from "react";

function OrderQuestion({ question, onAnswer }) {
    const [slots, setSlots] = useState([]);
    const [pool, setPool] = useState([]);
    const [trash, setTrash] = useState([]);

    useEffect(() => {
        setSlots(Array(question.options.length).fill(null)); // lege plekken voor juiste stappen
        const allOptions = [
            ...question.options, // juiste stappen
            ...(question.extra || []), // optionele irrelevante stappen
        ];
        setPool(shuffle(allOptions));
        setTrash([]);
    }, [question]);

    const shuffle = (array) =>
        array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

    const handleDragStart = (e, item, from) => {
        e.dataTransfer.setData("item", item);
        e.dataTransfer.setData("from", from);
    };

    const handleDropSlot = (e, index) => {
        e.preventDefault();
        const item = e.dataTransfer.getData("item");
        const from = e.dataTransfer.getData("from");

        if (!item || slots[index]) return;

        // item naar slot verplaatsen
        setSlots((prev) => {
            const newSlots = [...prev];
            newSlots[index] = item;
            return newSlots;
        });

        // item uit oude bron verwijderen
        if (from === "pool") setPool((prev) => prev.filter((p) => p !== item));
        if (from === "trash") setTrash((prev) => prev.filter((t) => t !== item));
    };

    const handleDropPool = (e) => {
        e.preventDefault();
        const item = e.dataTransfer.getData("item");
        const from = e.dataTransfer.getData("from");
        if (!item) return;

        setPool((prev) => [...prev, item]);
        if (from === "slots") {
            const index = slots.indexOf(item);
            if (index !== -1) {
                setSlots((prev) => {
                    const newSlots = [...prev];
                    newSlots[index] = null;
                    return newSlots;
                });
            }
        }
        if (from === "trash") {
            setTrash((prev) => prev.filter((t) => t !== item));
        }
    };

    const handleDropTrash = (e) => {
        e.preventDefault();
        const item = e.dataTransfer.getData("item");
        const from = e.dataTransfer.getData("from");
        if (!item) return;

        setTrash((prev) => [...prev, item]);

        if (from === "pool") setPool((prev) => prev.filter((p) => p !== item));
        if (from === "slots") {
            const index = slots.indexOf(item);
            if (index !== -1) {
                setSlots((prev) => {
                    const newSlots = [...prev];
                    newSlots[index] = null;
                    return newSlots;
                });
            }
        }
    };

    const allowDrop = (e) => e.preventDefault();

    const check = () => {
        const correctOrder = question.correct.map((i) => question.options[i]);
        const isCorrect = slots.join(",") === correctOrder.join(",");

        // check of alle irrelevante items in trash zitten
        const allExtrasTrashed =
            !question.extra || question.extra.every((ex) => trash.includes(ex));

        onAnswer(isCorrect && allExtrasTrashed);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>

            {/* Slots */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "10px",
                    maxWidth: "400px",
                    margin: "0 auto 2rem",
                }}
            >
                {slots.map((slot, idx) => (
                    <div
                        key={idx}
                        onDrop={(e) => handleDropSlot(e, idx)}
                        onDragOver={allowDrop}
                        style={{
                            minHeight: "50px",
                            padding: "12px",
                            border: "2px dashed #ccc",
                            borderRadius: "6px",
                            background: slot ? "#f9f9f9" : "#fff",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
            <span style={{ fontWeight: "bold", color: "#646cff" }}>
              Stap {idx + 1}:
            </span>
                        {slot || <span style={{ color: "#aaa" }}>Sleep hierheen</span>}
                    </div>
                ))}
            </div>

            {/* Pool met alle opties */}
            <div
                onDrop={handleDropPool}
                onDragOver={allowDrop}
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    justifyContent: "center",
                    marginBottom: "2rem",
                    padding: "1rem",
                    border: "2px dashed #eee",
                    borderRadius: "6px",
                    minHeight: "80px",
                }}
            >
                {pool.map((item, idx) => (
                    <div
                        key={idx}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item, "pool")}
                        style={{
                            padding: "12px 16px",
                            background: "#f1f1f1",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            cursor: "grab",
                            minWidth: "120px",
                            textAlign: "center",
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>

            {/* Prullenbak alleen tonen als er extra opties zijn */}
            {question.extra && question.extra.length > 0 && (
                <div
                    onDrop={handleDropTrash}
                    onDragOver={allowDrop}
                    style={{
                        margin: "0 auto 2rem",
                        padding: "1rem",
                        border: "2px dashed red",
                        borderRadius: "6px",
                        background: "#ffeaea",
                        color: "#900",
                        fontWeight: "bold",
                        maxWidth: "300px",
                    }}
                >
                    🗑️ Sleep irrelevante stappen hierheen
                    <div style={{ marginTop: "0.5rem" }}>
                        {trash.map((item, idx) => (
                            <div
                                key={idx}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item, "trash")}
                                style={{
                                    padding: "8px",
                                    margin: "4px 0",
                                    background: "#f99",
                                    borderRadius: "4px",
                                    cursor: "grab",
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={check}
                disabled={slots.includes(null)}
                style={{
                    padding: "0.75rem 1.5rem",
                    background: slots.includes(null) ? "#aaa" : "#646cff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    cursor: slots.includes(null) ? "not-allowed" : "pointer",
                }}
            >
                Bevestigen
            </button>
        </div>
    );
}

export default OrderQuestion;
