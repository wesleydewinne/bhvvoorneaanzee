import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import evaluationService from "@/features/evaluation/services/evaluationService";

export default function AdminEvaluationsOverviewPage() {
    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadSummaries();
    }, []);

    const loadSummaries = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await evaluationService.getAllSummaries();
            setSummaries(data);
        } catch (err) {
            setError(err?.message || "Evaluatie-overzicht kon niet worden opgehaald.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Laden...</p>;

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h1 style={styles.title}>Evaluatie-overzicht</h1>
                <p style={styles.subtitle}>
                    Bekijk per training de gemiddelden en open de detailpagina voor meer inzicht.
                </p>

                {error && <div style={styles.error}>{error}</div>}

                {!error && summaries.length === 0 && (
                    <div style={styles.emptyState}>Er zijn nog geen evaluaties gevonden.</div>
                )}

                {summaries.length > 0 && (
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                <th style={styles.th}>Training ID</th>
                                <th style={styles.th}>Aantal</th>
                                <th style={styles.th}>Gem. training</th>
                                <th style={styles.th}>Aanbevelen</th>
                                <th style={styles.th}>Actie</th>
                            </tr>
                            </thead>
                            <tbody>
                            {summaries.map((item) => {
                                const trainingAverage = calculateTrainingAverage(item.averages);
                                const recommend = item.averages?.recommend ?? "-";

                                return (
                                    <tr key={item.trainingId}>
                                        <td style={styles.td}>{item.trainingId}</td>
                                        <td style={styles.td}>{item.count}</td>
                                        <td style={styles.td}>{trainingAverage}</td>
                                        <td style={styles.td}>{recommend}</td>
                                        <td style={styles.td}>
                                            <Link
                                                to={`/admin/evaluations/${item.trainingId}`}
                                                style={styles.linkButton}
                                            >
                                                Bekijk
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function calculateTrainingAverage(averages = {}) {
    const keys = [
        "trainingValue",
        "practiceUse",
        "theoryPracticeBalance",
        "paceTiming",
        "metExpectations",
    ];

    const values = keys
        .map((key) => averages[key])
        .filter((value) => typeof value === "number");

    if (values.length === 0) return "-";

    const total = values.reduce((sum, value) => sum + value, 0);
    return (total / values.length).toFixed(1);
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
    title: {
        margin: 0,
        marginBottom: "8px",
    },
    subtitle: {
        marginTop: 0,
        color: "#6b7280",
        marginBottom: "24px",
    },
    error: {
        marginTop: "12px",
        background: "#fee2e2",
        color: "#991b1b",
        border: "1px solid #fecaca",
        borderRadius: "10px",
        padding: "12px",
    },
    emptyState: {
        padding: "16px",
        borderRadius: "10px",
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        color: "#6b7280",
    },
    tableWrapper: {
        overflowX: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        textAlign: "left",
        padding: "12px",
        borderBottom: "1px solid #e5e7eb",
        color: "#374151",
    },
    td: {
        padding: "12px",
        borderBottom: "1px solid #f1f5f9",
    },
    linkButton: {
        display: "inline-block",
        padding: "8px 12px",
        borderRadius: "8px",
        background: "#2563eb",
        color: "#fff",
        textDecoration: "none",
        fontWeight: 600,
    },
};