import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import evaluationService from "@/features/evaluation/services/evaluationService";

export default function AdminEvaluationDetailPage() {
    const { trainingId } = useParams();

    const [summary, setSummary] = useState(null);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
    }, [trainingId]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const [summaryData, responsesData] = await Promise.all([
                evaluationService.getSummary(trainingId),
                evaluationService.getResponsesByTrainingId(trainingId),
            ]);

            setSummary(summaryData);
            setResponses(responsesData);
        } catch (err) {
            setError(err?.message || "Evaluatiedetail kon niet worden opgehaald.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadCsv = async () => {
        try {
            const blob = await evaluationService.downloadCsv(trainingId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `evaluaties-${trainingId}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(err?.message || "CSV downloaden is niet gelukt.");
        }
    };

    if (loading) return <p>Laden...</p>;

    if (error) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <div style={styles.error}>{error}</div>
                </div>
            </div>
        );
    }

    if (!summary) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.card}>Geen detailgegevens gevonden.</div>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <div style={styles.headerRow}>
                    <div>
                        <h1 style={styles.title}>Evaluatiedetail</h1>
                        <p style={styles.subtitle}>
                            Training {summary.trainingId} · {summary.count} evaluatie(s)
                        </p>
                    </div>

                    <button onClick={handleDownloadCsv} style={styles.secondaryButton}>
                        Download CSV
                    </button>
                </div>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Gemiddelden</h2>

                    <div style={styles.metricGrid}>
                        {getAverageCards(summary.averages).map((item) => (
                            <div key={item.key} style={styles.metricCard}>
                                <div style={styles.metricLabel}>{item.label}</div>
                                <div style={styles.metricValue}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Scores per onderdeel</h2>

                    <div style={styles.barList}>
                        {getBarItems(summary.averages).map((item) => (
                            <BarRow key={item.key} label={item.label} value={item.value} />
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Opmerkingen</h2>

                    {responses.length === 0 && (
                        <div style={styles.emptyState}>Geen opmerkingen gevonden.</div>
                    )}

                    {responses.length > 0 && (
                        <div style={styles.commentsList}>
                            {responses.map((response) => (
                                <div key={response.id} style={styles.commentCard}>
                                    <div style={styles.commentHeader}>
                                        <strong>Evaluatie #{response.id}</strong>
                                        <span style={styles.commentDate}>
                                            {formatDate(response.submittedAt)}
                                        </span>
                                    </div>

                                    {!!response.commentStrong && (
                                        <CommentBlock
                                            title="Sterk onderdeel"
                                            text={response.commentStrong}
                                        />
                                    )}

                                    {!!response.commentImprove && (
                                        <CommentBlock
                                            title="Verbeterpunt"
                                            text={response.commentImprove}
                                        />
                                    )}

                                    {!!response.commentOther && (
                                        <CommentBlock
                                            title="Overig"
                                            text={response.commentOther}
                                        />
                                    )}

                                    {!response.commentStrong &&
                                        !response.commentImprove &&
                                        !response.commentOther && (
                                            <div style={styles.noCommentText}>
                                                Geen opmerkingen ingevuld.
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

function BarRow({ label, value }) {
    const safeValue = typeof value === "number" ? value : 0;
    const width = `${(safeValue / 10) * 100}%`;

    return (
        <div style={styles.barRow}>
            <div style={styles.barLabel}>{label}</div>
            <div style={styles.barTrack}>
                <div style={{ ...styles.barFill, width }} />
            </div>
            <div style={styles.barValue}>{safeValue.toFixed(1)}</div>
        </div>
    );
}

function CommentBlock({ title, text }) {
    return (
        <div style={styles.commentBlock}>
            <div style={styles.commentTitle}>{title}</div>
            <div style={styles.commentText}>{text}</div>
        </div>
    );
}

function getAverageCards(averages = {}) {
    return [
        {
            key: "trainingAverage",
            label: "Gem. training",
            value: calculateAverage([
                averages.trainingValue,
                averages.practiceUse,
                averages.theoryPracticeBalance,
                averages.paceTiming,
                averages.metExpectations,
            ]),
        },
        {
            key: "instructorAverage",
            label: "Gem. instructeur",
            value: calculateAverage([
                averages.instructorClarity,
                averages.instructorGuidance,
                averages.instructorExpertise,
            ]),
        },
        {
            key: "locationAverage",
            label: "Gem. locatie",
            value: calculateAverage([
                averages.locationSuitability,
                averages.locationAccess,
            ]),
        },
        {
            key: "recommend",
            label: "Aanbevelen",
            value:
                typeof averages.recommend === "number"
                    ? averages.recommend.toFixed(1)
                    : "-",
        },
    ];
}

function getBarItems(averages = {}) {
    return [
        { key: "trainingValue", label: "Waarde training", value: averages.trainingValue },
        { key: "practiceUse", label: "Praktisch toepasbaar", value: averages.practiceUse },
        { key: "theoryPracticeBalance", label: "Balans theorie/praktijk", value: averages.theoryPracticeBalance },
        { key: "paceTiming", label: "Tempo / timing", value: averages.paceTiming },
        { key: "metExpectations", label: "Voldeed aan verwachting", value: averages.metExpectations },
        { key: "instructorClarity", label: "Duidelijkheid instructeur", value: averages.instructorClarity },
        { key: "instructorGuidance", label: "Begeleiding instructeur", value: averages.instructorGuidance },
        { key: "instructorExpertise", label: "Deskundigheid instructeur", value: averages.instructorExpertise },
        { key: "locationSuitability", label: "Geschiktheid locatie", value: averages.locationSuitability },
        { key: "locationAccess", label: "Bereikbaarheid locatie", value: averages.locationAccess },
        { key: "recommend", label: "Aanbevelen", value: averages.recommend },
    ];
}

function calculateAverage(values = []) {
    const validValues = values.filter((value) => typeof value === "number");
    if (validValues.length === 0) return "-";

    const total = validValues.reduce((sum, value) => sum + value, 0);
    return (total / validValues.length).toFixed(1);
}

function formatDate(dateString) {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("nl-NL");
}

const styles = {
    wrapper: {
        padding: "24px",
    },
    card: {
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        maxWidth: "1200px",
    },
    headerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "16px",
        flexWrap: "wrap",
    },
    title: {
        margin: 0,
        marginBottom: "8px",
    },
    subtitle: {
        marginTop: 0,
        color: "#6b7280",
    },
    secondaryButton: {
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        background: "#fff",
        color: "#111827",
        fontWeight: 600,
        cursor: "pointer",
    },
    section: {
        marginTop: "28px",
    },
    sectionTitle: {
        marginBottom: "14px",
    },
    metricGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px",
    },
    metricCard: {
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        background: "#f9fafb",
    },
    metricLabel: {
        color: "#6b7280",
        marginBottom: "6px",
    },
    metricValue: {
        fontSize: "24px",
        fontWeight: 700,
    },
    barList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    barRow: {
        display: "grid",
        gridTemplateColumns: "250px 1fr 60px",
        alignItems: "center",
        gap: "12px",
    },
    barLabel: {
        fontWeight: 500,
    },
    barTrack: {
        height: "14px",
        background: "#e5e7eb",
        borderRadius: "999px",
        overflow: "hidden",
    },
    barFill: {
        height: "100%",
        background: "#2563eb",
        borderRadius: "999px",
    },
    barValue: {
        fontWeight: 700,
        textAlign: "right",
    },
    commentsList: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
    },
    commentCard: {
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        background: "#fff",
    },
    commentHeader: {
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
        flexWrap: "wrap",
        marginBottom: "12px",
    },
    commentDate: {
        color: "#6b7280",
        fontSize: "14px",
    },
    commentBlock: {
        marginBottom: "12px",
        padding: "12px",
        borderRadius: "10px",
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
    },
    commentTitle: {
        fontWeight: 700,
        marginBottom: "6px",
    },
    commentText: {
        whiteSpace: "pre-wrap",
        color: "#374151",
    },
    noCommentText: {
        color: "#6b7280",
        fontStyle: "italic",
    },
    emptyState: {
        padding: "16px",
        borderRadius: "10px",
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        color: "#6b7280",
    },
    error: {
        marginTop: "12px",
        background: "#fee2e2",
        color: "#991b1b",
        border: "1px solid #fecaca",
        borderRadius: "10px",
        padding: "12px",
    },
};