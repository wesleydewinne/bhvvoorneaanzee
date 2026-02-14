import { useEffect, useLayoutEffect, useRef, useState } from "react";

function MatchingQuestion({ question, onAnswer }) {
    const pairs = (question.pairs || []).map((p) => ({
        left:
            typeof p.left === "string" ? { type: "text", value: p.left } : p.left,
        right: p.right,
    }));

    const [rightItems, setRightItems] = useState([]);
    const [selectedLeft, setSelectedLeft] = useState(null);
    const [matches, setMatches] = useState({});
    const [lines, setLines] = useState([]);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    const containerRef = useRef(null);
    const leftRefs = useRef([]);
    const rightRefs = useRef([]);

    const shuffle = (array) =>
        array
            .map((v) => ({ v, r: Math.random() }))
            .sort((a, b) => a.r - b.r)
            .map(({ v }) => v);

    useEffect(() => {
        setRightItems(shuffle(pairs.map((p) => p.right)));
        setMatches({});
        setSelectedLeft(null);
    }, [question]); // eslint-disable-line

    useEffect(() => {
        leftRefs.current = leftRefs.current.slice(0, pairs.length);
        rightRefs.current = rightRefs.current.slice(0, rightItems.length);
    }, [pairs.length, rightItems.length]);

    const handleLeftClick = (leftIdx) => setSelectedLeft(leftIdx);

    const handleRightClick = (rightIdx) => {
        if (selectedLeft === null) return;
        setMatches((prev) => {
            const newMatches = { ...prev };
            for (const k of Object.keys(newMatches)) {
                if (newMatches[k] === rightIdx) delete newMatches[k];
            }
            newMatches[selectedLeft] = rightIdx;
            return newMatches;
        });
        setSelectedLeft(null);
    };

    const removeAll = () => {
        setMatches({});
        setSelectedLeft(null);
    };

    const updateLines = () => {
        if (!containerRef.current) return;
        const box = containerRef.current.getBoundingClientRect();
        const nextLines = Object.entries(matches)
            .map(([leftIdxStr, rightIdx]) => {
                const leftIdx = Number(leftIdxStr);
                const leftEl = leftRefs.current[leftIdx];
                const rightEl = rightRefs.current[rightIdx];
                if (!leftEl || !rightEl) return null;
                const lb = leftEl.getBoundingClientRect();
                const rb = rightEl.getBoundingClientRect();
                return {
                    x1: lb.right - box.left,
                    y1: lb.top + lb.height / 2 - box.top,
                    x2: rb.left - box.left,
                    y2: rb.top + rb.height / 2 - box.top,
                };
            })
            .filter(Boolean);

        setLines(nextLines);
        setContainerSize({ width: box.width, height: box.height });
    };

    useLayoutEffect(() => {
        updateLines();
    }, [matches, rightItems]);

    useEffect(() => {
        const onResize = () => updateLines();
        window.addEventListener("resize", onResize);
        const ro =
            typeof ResizeObserver !== "undefined"
                ? new ResizeObserver(updateLines)
                : null;
        if (ro && containerRef.current) ro.observe(containerRef.current);

        return () => {
            window.removeEventListener("resize", onResize);
            if (ro) ro.disconnect();
        };
    }, [matches, rightItems]);

    const allMatched = Object.keys(matches).length === pairs.length;

    const handleConfirm = () => {
        const isCorrect = pairs.every((p, leftIdx) => {
            const correctRightIdx = rightItems.indexOf(p.right);
            return matches[leftIdx] === correctRightIdx;
        });
        onAnswer(isCorrect, { matches, rightItems });
    };

    const renderLeft = (left) =>
        left.type === "image" ? (
            <img
                src={left.value}
                alt="pictogram"
                style={{ maxHeight: 50, maxWidth: 80, objectFit: "contain" }}
            />
        ) : (
            <span>{left.value}</span>
        );

    return (
        <div style={{ textAlign: "center", position: "relative" }}>
            <h2 style={{ marginBottom: "1rem" }}>{question.question}</h2>
            <p style={{ marginTop: 0, marginBottom: "1rem", color: "#666" }}>
                Klik eerst <strong>links</strong>, daarna <strong>rechts</strong> om te koppelen.
            </p>

            <div
                ref={containerRef}
                style={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.2rem",
                    maxWidth: 600,
                    margin: "0 auto",
                    padding: "8px 0 20px",
                }}
            >
                {/* Linkerkolom */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {pairs.map((pair, idx) => (
                        <div
                            key={`left-${idx}`}
                            ref={(el) => (leftRefs.current[idx] = el)}
                            onClick={() => handleLeftClick(idx)}
                            style={{
                                maxWidth: 180,
                                margin: "0 auto",
                                padding: "8px 10px",
                                background: "#f9f9f9",
                                border:
                                    selectedLeft === idx
                                        ? "2px solid #646cff"
                                        : "1px solid #ddd",
                                borderRadius: 6,
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: 52,
                                userSelect: "none",
                            }}
                        >
                            {renderLeft(pair.left)}
                        </div>
                    ))}
                </div>

                {/* Rechterkolom */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {rightItems.map((label, idx) => {
                        const isUsed = Object.values(matches).includes(idx);
                        return (
                            <div
                                key={`right-${idx}`}
                                ref={(el) => (rightRefs.current[idx] = el)}
                                onClick={() => handleRightClick(idx)}
                                style={{
                                    maxWidth: 180,
                                    margin: "0 auto",
                                    padding: "8px 10px",
                                    background: isUsed ? "#e6e9ff" : "#f1f1f1",
                                    border: isUsed ? "2px solid #646cff" : "1px solid #ddd",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                    minHeight: 52,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    userSelect: "none",
                                }}
                            >
                                {label}
                            </div>
                        );
                    })}
                </div>

                {/* SVG lijnen */}
                <svg
                    width={containerSize.width}
                    height={containerSize.height}
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        overflow: "visible",
                    }}
                >
                    {lines.map((ln, i) => (
                        <g key={`line-${i}`}>
                            <line
                                x1={ln.x1}
                                y1={ln.y1}
                                x2={ln.x2}
                                y2={ln.y2}
                                stroke="#646cff"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <circle cx={ln.x1} cy={ln.y1} r="4" fill="#646cff" />
                            <circle cx={ln.x2} cy={ln.y2} r="4" fill="#646cff" />
                        </g>
                    ))}
                </svg>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button
                    onClick={removeAll}
                    style={{
                        padding: "0.6rem 1rem",
                        background: "#eee",
                        color: "#333",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        cursor: "pointer",
                    }}
                >
                    Reset koppelingen
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={!allMatched}
                    style={{
                        padding: "0.6rem 1.2rem",
                        background: allMatched ? "#646cff" : "#aaa",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        cursor: allMatched ? "pointer" : "not-allowed",
                    }}
                >
                    Bevestigen
                </button>
            </div>
        </div>
    );
}

export default MatchingQuestion;
