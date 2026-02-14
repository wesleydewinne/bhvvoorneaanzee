import { useState, useEffect } from "react";

function DragToRankQuestion({ question, onAnswer }) {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        // Shuffle de opties bij het laden van de vraag
        setOrder(shuffle([...question.options]));
    }, [question]);

    const shuffle = (array) =>
        array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("dragIndex", index);
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const dragIndex = e.dataTransfer.getData("dragIndex");
        if (dragIndex === "") return;

        const newOrder = [...order];
        const [moved] = newOrder.splice(dragIndex, 1);
        newOrder.splice(index, 0, moved);
        setOrder(newOrder);
    };

    const allowDrop = (e) => e.preventDefault();

    const check = () => {
        if (!question.correct) {
            // geen correct → altijd goed, maar geef volgorde terug
            onAnswer(true, order);
            return;
        }
        const correctOrder = question.correct.map((i) => question.options[i]);
        const isCorrect = order.join(",") === correctOrder.join(",");
        onAnswer(isCorrect, order);
    };

    return (
        <div style={{ textAlign: "center" }}>
            {/* Vraag */}
            <h2 style={{ marginBottom: "1.5rem" }}>{question.question}</h2>

            {/* Drag lijst */}
            <ol
                style={{
                    listStyle: "decimal",
                    paddingLeft: "1.5rem",
                    maxWidth: "500px",
                    margin: "0 auto 2rem",
                    textAlign: "left",
                }}
            >
                {order.map((opt, idx) => (
                    <li
                        key={idx}
                        draggable
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragOver={allowDrop}
                        onDrop={(e) => handleDrop(e, idx)}
                        style={{
                            padding: "12px 16px",
                            margin: "10px 0",
                            background: "#f9f9f9",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            cursor: "grab",
                            fontSize: "1.5rem",
                            transition: "background 0.2s",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.background = "#f1f1f1")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.background = "#f9f9f9")
                        }
                    >
                        {opt}
                    </li>
                ))}
            </ol>

            {/* Bevestigen knop */}
            <button
                onClick={check}
                style={{
                    padding: "0.75rem 1.5rem",
                    background: "#646cff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    transition: "background 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#535bf2")}
                onMouseOut={(e) => (e.target.style.background = "#646cff")}
            >
                Bevestigen
            </button>
        </div>
    );
}

export default DragToRankQuestion;
