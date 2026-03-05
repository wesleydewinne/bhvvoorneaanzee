import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import evaluationService from "@/features/evaluation/services/evaluationService";

function groupBySection(questions = []) {
    return questions.reduce((acc, question) => {
        if (!acc[question.section]) {
            acc[question.section] = [];
        }
        acc[question.section].push(question);
        return acc;
    }, {});
}

function ScoreSlider({ value, onChange }) {
    const safeValue = value ?? 0;

    return (
        <div style={styles.sliderWrapper}>
            <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={safeValue}
                onChange={(e) => onChange(Number(e.target.value))}
                style={styles.slider}
            />
            <span style={styles.scoreValue}>{safeValue.toFixed(1)}</span>
        </div>
    );
}

export default function EvaluationPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("t");

    const [loading, setLoading] = useState(true);
    const [context, setContext] = useState(null);
    const [answers, setAnswers] = useState({});
    const [comments, setComments] = useState({
        commentStrong: "",
        commentImprove: "",
        commentOther: "",
    });
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const groupedQuestions = useMemo(
        () => groupBySection(context?.questions || []),
        [context]
    );

    useEffect(() => {
        const loadContext = async () => {
            if (!token) {
                setError("Geen geldige evaluatielink gevonden.");
                setLoading(false);
                return;
            }

            try {
                const data = await evaluationService.getContext(token);
                setContext(data);
            } catch (err) {
                setError(err?.message || "Evaluatie kon niet worden geladen.");
            } finally {
                setLoading(false);
            }
        };

        loadContext();
    }, [token]);

    const updateAnswer = (key, value) => {
        setAnswers((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const getMissingQuestions = () => {
        const questions = context?.questions || [];
        return questions.filter((q) => answers[q.key] === undefined || answers[q.key] === null);
    };

    const handleSubmit = async () => {
        setError("");

        const missingQuestions = getMissingQuestions();
        if (missingQuestions.length > 0) {
            setError(`Je hebt nog ${missingQuestions.length} vraag(en) niet ingevuld.`);
            return;
        }

        try {
            await evaluationService.submitEvaluation({
                token,
                answers,
                comments,
            });

            setSubmitted(true);
        } catch (err) {
            setError(err?.message || "Versturen van de evaluatie is niet gelukt.");
        }
    };

    if (loading) {
        return (
            <div style={styles.page}>
                <div style={styles.card}>Laden...</div>
            </div>
        );
    }

    if (error && !context) {
        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h2>Oeps</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!context) {
        return (
            <div style={styles.page}>
                <div style={styles.card}>Geen evaluatie gevonden.</div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h2>Bedankt voor je evaluatie</h2>
                    <p>Je feedback is succesvol verstuurd.</p>
                </div>
            </div>
        );
    }

    if (context.status === "INVALID") {
        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h2>Ongeldige link</h2>
                    <p>Deze evaluatielink is niet geldig.</p>
                </div>
            </div>
        );
    }

    if (context.status === "EXPIRED") {
        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h2>Link verlopen</h2>
                    <p>Deze evaluatielink is verlopen.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.pageTitle}>Evaluatie</h1>
                <p style={styles.pageSubtitle}>{context.trainingTitle}</p>

                {Object.entries(groupedQuestions).map(([section, questions]) => (
                    <section key={section} style={styles.section}>
                        <div style={styles.sectionHeader}>{section}</div>
                        <div style={styles.sectionBody}>
                            {questions.map((question) => (
                                <div key={question.key} style={styles.questionRow}>
                                    <div style={styles.questionText}>{question.label}</div>
                                    <ScoreSlider
                                        value={answers[question.key]}
                                        onChange={(value) => updateAnswer(question.key, value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                <section style={styles.section}>
                    <div style={styles.sectionHeader}>Opmerkingen (optioneel)</div>
                    <div style={styles.sectionBody}>
                        <CommentField
                            label="Wat was het sterkste onderdeel?"
                            value={comments.commentStrong}
                            onChange={(value) =>
                                setComments((prev) => ({ ...prev, commentStrong: value }))
                            }
                        />

                        <CommentField
                            label="Wat zou je volgende keer anders willen zien?"
                            value={comments.commentImprove}
                            onChange={(value) =>
                                setComments((prev) => ({ ...prev, commentImprove: value }))
                            }
                        />

                        <CommentField
                            label="Overige opmerkingen"
                            value={comments.commentOther}
                            onChange={(value) =>
                                setComments((prev) => ({ ...prev, commentOther: value }))
                            }
                        />
                    </div>
                </section>

                {error && <div style={styles.errorBox}>{error}</div>}

                <div style={styles.submitRow}>
                    <button style={styles.submitButton} onClick={handleSubmit}>
                        Versturen
                    </button>
                </div>
            </div>
        </div>
    );
}

function CommentField({ label, value, onChange }) {
    return (
        <div style={styles.commentField}>
            <label style={styles.commentLabel}>{label}</label>
            <textarea
                rows={4}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={2000}
                style={styles.textarea}
                placeholder="Typ hier je antwoord..."
            />
            <div style={styles.counter}>{value.length}/2000</div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "24px",
        display: "flex",
        justifyContent: "center",
    },
    card: {
        width: "100%",
        maxWidth: "1000px",
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        padding: "24px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    },
    pageTitle: {
        marginTop: 0,
        marginBottom: "8px",
    },
    pageSubtitle: {
        marginTop: 0,
        color: "#6b7280",
        marginBottom: "24px",
    },
    section: {
        marginTop: "18px",
        borderRadius: "14px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
    },
    sectionHeader: {
        background: "#dbeafe",
        padding: "12px 16px",
        fontWeight: 700,
    },
    sectionBody: {
        padding: "16px",
        background: "#f8fbff",
    },
    questionRow: {
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        gap: "16px",
        padding: "12px 0",
        alignItems: "center",
        borderBottom: "1px solid #e5e7eb",
    },
    questionText: {
        fontSize: "15px",
        lineHeight: 1.5,
    },
    sliderWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    slider: {
        width: "240px",
    },
    scoreValue: {
        minWidth: "44px",
        fontWeight: 700,
    },
    commentField: {
        marginBottom: "16px",
    },
    commentLabel: {
        display: "block",
        fontWeight: 600,
        marginBottom: "8px",
    },
    textarea: {
        width: "100%",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        padding: "12px",
        fontSize: "14px",
        resize: "vertical",
    },
    counter: {
        marginTop: "4px",
        fontSize: "12px",
        color: "#6b7280",
    },
    errorBox: {
        marginTop: "16px",
        background: "#fee2e2",
        color: "#991b1b",
        border: "1px solid #fecaca",
        borderRadius: "10px",
        padding: "12px",
    },
    submitRow: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "20px",
    },
    submitButton: {
        padding: "12px 20px",
        borderRadius: "10px",
        border: "none",
        background: "#2563eb",
        color: "#fff",
        fontWeight: 700,
        cursor: "pointer",
    },
};