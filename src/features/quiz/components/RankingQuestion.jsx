import { useEffect, useMemo, useState } from "react";

function RankingQuestion({ question, onAnswer }) {
    const [ranking, setRanking] = useState([]);
    const [pool, setPool] = useState([]);
    const [trash, setTrash] = useState([]);

    const allItems = useMemo(() => {
        const all = [...(question.options || []), ...((question.extra) || [])];
        return all.map((text, idx) => ({
            id: `rank-${question.id}-${idx}-${Math.random().toString(36).slice(2)}`,
            text,
            isExtra: (question.extra || []).includes(text),
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.id]);

    useEffect(() => {
        setRanking([]);
        setTrash([]);
        setPool(shuffle(allItems));
    }, [allItems]);

    const shuffle = (arr) =>
        arr.map((v) => ({ v, r: Math.random() }))
            .sort((a, b) => a.r - b.r)
            .map(({ v }) => v);

    // ---------- drag helpers ----------
    const onDragStart = (e, payload) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(payload));
        e.dataTransfer.effectAllowed = "move";
    };
    const onAllowDrop = (e) => e.preventDefault();
    const safeParse = (str) => { try { return JSON.parse(str); } catch { return null; } };

    // item naar ranking op index
    const moveToRankingAt = (itemId, from, insertIndex) => {
        // reorder binnen ranking
        if (from === "ranking") {
            const currentIdx = ranking.findIndex((i) => i.id === itemId);
            if (currentIdx === -1) return;

            const newRanking = [...ranking];
            const [moved] = newRanking.splice(currentIdx, 1);

            // correctie als je naar beneden sleept
            let idx = Math.max(0, Math.min(insertIndex, newRanking.length));

            newRanking.splice(idx, 0, moved);
            setRanking(newRanking);
            return;
        }

        // van pool/trash naar ranking
        const [sourceArr, setSource] =
            from === "pool" ? [pool, setPool] : [trash, setTrash];

        const item = sourceArr.find((i) => i.id === itemId);
        if (!item) return;

        let idx = Math.max(0, Math.min(insertIndex, ranking.length));
        setSource(sourceArr.filter((i) => i.id !== itemId));
        setRanking((prev) => {
            const nr = [...prev];
            nr.splice(idx, 0, item);
            return nr;
        });
    };

    const moveToPool = (itemId, from) => {
        if (from === "pool") return;
        const [fromArr, setFromArr] =
            from === "ranking" ? [ranking, setRanking] : [trash, setTrash];

        const item = fromArr.find((i) => i.id === itemId);
        if (!item) return;

        setFromArr(fromArr.filter((i) => i.id !== itemId));
        setPool((prev) => [...prev, item]);
    };

    const moveToTrash = (itemId, from) => {
        if (from === "trash") return;
        const [fromArr, setFromArr] =
            from === "ranking" ? [ranking, setRanking] : [pool, setPool];

        const item = fromArr.find((i) => i.id === itemId);
        if (!item) return;

        setFromArr(fromArr.filter((i) => i.id !== itemId));
        setTrash((prev) => [...prev, item]);
    };

    // ---------- drops ----------
    // TOP-dropzone: altijd vóór index 0
    const handleDropOnRankingTop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const data = safeParse(e.dataTransfer.getData("text/plain"));
        if (!data) return;
        const { itemId, from } = data;
        moveToRankingAt(itemId, from, 0);
    };

    // Droppen op item: vóór dit item invoegen
    const handleDropOnRankingItem = (e, targetIndex) => {
        e.preventDefault();
        e.stopPropagation(); // belangrijk: voorkom bubbelen naar lijst-drop (einde)
        const data = safeParse(e.dataTransfer.getData("text/plain"));
        if (!data) return;
        const { itemId, from } = data;
        moveToRankingAt(itemId, from, targetIndex);
    };

    // Droppen op de lijst zelf → aan het eind
    const handleDropOnRankingListEnd = (e) => {
        e.preventDefault();
        const data = safeParse(e.dataTransfer.getData("text/plain"));
        if (!data) return;
        const { itemId, from } = data;
        moveToRankingAt(itemId, from, ranking.length);
    };

    const handleDropOnPool = (e) => {
        e.preventDefault();
        const data = safeParse(e.dataTransfer.getData("text/plain"));
        if (!data) return;
        const { itemId, from } = data;
        moveToPool(itemId, from);
    };

    const handleDropOnTrash = (e) => {
        e.preventDefault();
        const data = safeParse(e.dataTransfer.getData("text/plain"));
        if (!data) return;
        const { itemId, from } = data;
        moveToTrash(itemId, from);
    };

    // ---------- bevestigen ----------
    const check = () => {
        const rankingTexts = ranking.map((i) => i.text);
        const trashTexts = trash.map((i) => i.text);

        if (!question.correct) {
            const allExtrasTrashed =
                !question.extra || question.extra.every((ex) => trashTexts.includes(ex));
            onAnswer(allExtrasTrashed, { ranking: rankingTexts, trash: trashTexts });
            return;
        }

        const correctOrder = question.correct.map((i) => question.options[i]);
        const isCorrectOrder = rankingTexts.join("||") === correctOrder.join("||");
        const allExtrasTrashed =
            !question.extra || question.extra.every((ex) => trashTexts.includes(ex));

        onAnswer(isCorrectOrder && allExtrasTrashed, {
            ranking: rankingTexts,
            trash: trashTexts,
        });
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.2rem" }}>{question.question}</h2>

            {/* RANKING (met TOP-dropzone) */}
            <div
                onDragOver={onAllowDrop}
                onDrop={handleDropOnRankingListEnd}
                style={{
                    border: "2px dashed #ddd",
                    padding: 10,
                    borderRadius: 8,
                    maxWidth: 460,
                    margin: "0 auto 14px",
                    background: "#fafafa",
                }}
                title="Sleep hierheen om onderaan toe te voegen"
            >
                {/* top-dropzone */}
                <div
                    onDragOver={(e) => { onAllowDrop(e); e.stopPropagation(); }}
                    onDrop={handleDropOnRankingTop}
                    style={{
                        height: 10,
                        marginBottom: 6,
                        border: "2px dashed transparent",
                    }}
                    title="Sleep hier om bovenaan te plaatsen"
                />
                <ol style={{ listStyle: "decimal", paddingLeft: "1.5rem", margin: 0 }}>
                    {ranking.map((item, idx) => (
                        <li
                            key={item.id}
                            onDragOver={(e) => { onAllowDrop(e); e.stopPropagation(); }}
                            onDrop={(e) => handleDropOnRankingItem(e, idx)}
                            style={{ listStyle: "decimal inside" }}
                        >
                            <div
                                draggable
                                onDragStart={(e) =>
                                    onDragStart(e, { itemId: item.id, from: "ranking" })
                                }
                                style={{
                                    margin: "6px 0 10px",
                                    padding: "10px 14px",
                                    background: "#f9f9f9",
                                    border: "1px solid #ddd",
                                    borderRadius: 6,
                                    cursor: "grab",
                                }}
                            >
                                {item.text}
                            </div>
                        </li>
                    ))}
                    {ranking.length === 0 && (
                        <li style={{ color: "#999", padding: "6px 0" }}>
                            (Nog leeg – sleep items hierheen)
                        </li>
                    )}
                </ol>
            </div>

            {/* POOL */}
            <div
                onDragOver={onAllowDrop}
                onDrop={handleDropOnPool}
                style={{
                    margin: "0 auto 12px",
                    padding: 10,
                    border: "2px dashed #ddd",
                    borderRadius: 8,
                    maxWidth: 460,
                    minHeight: 80,
                }}
                title="Pool: items die je nog moet plaatsen"
            >
                {pool.map((item) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, { itemId: item.id, from: "pool" })}
                        style={{
                            padding: 10,
                            margin: "6px 0",
                            background: "#f9f9f9",
                            border: "1px solid #ddd",
                            borderRadius: 6,
                            cursor: "grab",
                        }}
                    >
                        {item.text}
                    </div>
                ))}
                {pool.length === 0 && <div style={{ color: "#999" }}>(Geen items in de pool)</div>}
            </div>

            {/* TRASH */}
            {question.extra && question.extra.length > 0 && (
                <div
                    onDragOver={onAllowDrop}
                    onDrop={handleDropOnTrash}
                    style={{
                        margin: "0 auto 18px",
                        padding: 10,
                        border: "2px dashed red",
                        borderRadius: 8,
                        background: "#ffeaea",
                        color: "#900",
                        fontWeight: "bold",
                        maxWidth: 360,
                        minHeight: 60,
                    }}
                    title="Prullenbak: sleep irrelevante items hierheen"
                >
                    🗑️ Sleep irrelevante items hierheen
                    <div style={{ marginTop: 8, fontWeight: "normal" }}>
                        {trash.map((item) => (
                            <div
                                key={item.id}
                                draggable
                                onDragStart={(e) =>
                                    onDragStart(e, { itemId: item.id, from: "trash" })
                                }
                                style={{
                                    padding: 8,
                                    margin: "6px 0",
                                    background: "#f99",
                                    borderRadius: 4,
                                    cursor: "grab",
                                }}
                            >
                                {item.text}
                            </div>
                        ))}
                        {trash.length === 0 && <div style={{ color: "#b66" }}>(Nog leeg)</div>}
                    </div>
                </div>
            )}

            <button
                onClick={check}
                disabled={pool.length > 0} // knop blokkeren zolang pool niet leeg is
                style={{
                    padding: "0.75rem 1.5rem",
                    background: pool.length > 0 ? "#ccc" : "#646cff", // grijs als disabled
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    cursor: pool.length > 0 ? "not-allowed" : "pointer",
                    opacity: pool.length > 0 ? 0.7 : 1,
                }}
            >
                Bevestigen
            </button>
        </div>
    );
}

export default RankingQuestion;
