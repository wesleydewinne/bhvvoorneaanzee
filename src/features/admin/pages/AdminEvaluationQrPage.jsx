import { useMemo, useState } from "react";
import QRCode from "react-qr-code";
import evaluationService from "@/features/evaluation/services/evaluationService";

export default function AdminEvaluationQrPage() {
    const [trainingId, setTrainingId] = useState("");
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const token = useMemo(() => {
        const match = link?.match(/[?&]t=([^\s]+)/);
        return match?.[1] ?? "";
    }, [link]);

    const handleGenerateQr = async () => {
        if (!trainingId.trim()) {
            setError("Vul eerst een training ID in.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setLink("");

            const generatedLink = await evaluationService.generateQr(trainingId);
            setLink(generatedLink);
        } catch (err) {
            setError(err?.message || "QR genereren is niet gelukt.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyLink = async () => {
        if (!link) return;
        await navigator.clipboard.writeText(link);
        alert("Link gekopieerd.");
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h1 style={styles.title}>Evaluatie QR genereren</h1>
                <p style={styles.subtitle}>
                    Genereer een QR-code voor een training zodat cursisten direct na afloop kunnen scannen en evalueren.
                </p>

                <div style={styles.formRow}>
                    <label htmlFor="trainingId" style={styles.label}>
                        Training ID
                    </label>

                    <input
                        id="trainingId"
                        type="text"
                        value={trainingId}
                        onChange={(e) => setTrainingId(e.target.value)}
                        placeholder="Bijv. 1175340"
                        style={styles.input}
                    />

                    <button
                        onClick={handleGenerateQr}
                        disabled={loading}
                        style={styles.button}
                    >
                        {loading ? "Genereren..." : "Genereer QR"}
                    </button>
                </div>

                {error && <div style={styles.error}>{error}</div>}

                {link && (
                    <div style={styles.resultBlock}>
                        <div style={styles.qrContainer}>
                            <QRCode value={link} size={260} />
                        </div>

                        <div style={styles.linkSection}>
                            <h2 style={styles.sectionTitle}>Evaluatielink</h2>
                            <div style={styles.linkBox}>{link}</div>

                            <div style={styles.buttonRow}>
                                <button onClick={handleCopyLink} style={styles.secondaryButton}>
                                    Kopieer link
                                </button>

                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={styles.secondaryButton}
                                >
                                    Open evaluatie
                                </a>
                            </div>

                            {token && (
                                <p style={styles.tokenInfo}>
                                    Token aanwezig in de link.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
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
        maxWidth: "1100px",
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
    formRow: {
        display: "grid",
        gridTemplateColumns: "140px 1fr 180px",
        gap: "12px",
        alignItems: "center",
        marginBottom: "16px",
    },
    label: {
        fontWeight: 600,
    },
    input: {
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        fontSize: "14px",
    },
    button: {
        padding: "12px 16px",
        borderRadius: "10px",
        border: "none",
        background: "#2563eb",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
    },
    secondaryButton: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 14px",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        background: "#fff",
        color: "#111827",
        textDecoration: "none",
        fontWeight: 600,
        cursor: "pointer",
    },
    error: {
        marginTop: "12px",
        background: "#fee2e2",
        color: "#991b1b",
        border: "1px solid #fecaca",
        borderRadius: "10px",
        padding: "12px",
    },
    resultBlock: {
        marginTop: "24px",
        display: "flex",
        gap: "24px",
        flexWrap: "wrap",
        alignItems: "flex-start",
    },
    qrContainer: {
        background: "#fff",
        padding: "16px",
        borderRadius: "14px",
        border: "1px solid #e5e7eb",
    },
    linkSection: {
        flex: 1,
        minWidth: "280px",
    },
    sectionTitle: {
        marginTop: 0,
        marginBottom: "10px",
    },
    linkBox: {
        padding: "12px",
        borderRadius: "10px",
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        wordBreak: "break-all",
    },
    buttonRow: {
        display: "flex",
        gap: "10px",
        marginTop: "14px",
        flexWrap: "wrap",
    },
    tokenInfo: {
        marginTop: "12px",
        color: "#6b7280",
        fontSize: "13px",
    },
};