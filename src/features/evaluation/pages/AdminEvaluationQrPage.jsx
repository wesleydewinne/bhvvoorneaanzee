import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EvaluationQrPanel from "../components/EvaluationQrPanel";
import evaluationService from "../services/evaluationService";
import "../styles/adminEvaluationQr.css";

async function extractErrorMessage(err, fallbackMessage) {
    const responseData = err?.response?.data;

    if (responseData instanceof Blob) {
        try {
            const text = await responseData.text();
            return text || fallbackMessage;
        } catch {
            return fallbackMessage;
        }
    }

    if (typeof responseData === "string" && responseData.trim()) {
        return responseData;
    }

    if (responseData?.message) {
        return responseData.message;
    }

    if (err?.message) {
        return err.message;
    }

    return fallbackMessage;
}

export default function AdminEvaluationQrPage() {
    const { trainingId } = useParams();

    const [qrData, setQrData] = useState(null);
    const [qrImageUrl, setQrImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let objectUrl = "";

        async function loadQr() {
            try {
                setLoading(true);
                setError("");

                const data = await evaluationService.generateQr(trainingId);
                setQrData(data);

                const imageUrl = await evaluationService.getQrPngUrl(trainingId);
                objectUrl = imageUrl;
                setQrImageUrl(imageUrl);
            } catch (err) {
                console.error("QR fout:", err);
                console.error("Status:", err?.response?.status);
                console.error("Response data:", err?.response?.data);

                const message = await extractErrorMessage(
                    err,
                    "Het ophalen van de QR-code is mislukt."
                );

                setError(message);
            } finally {
                setLoading(false);
            }
        }

        loadQr();

        return () => {
            if (objectUrl) {
                window.URL.revokeObjectURL(objectUrl);
            }
        };
    }, [trainingId]);

    return (
        <main className="admin-evaluation-qr-page">
            <div className="admin-evaluation-qr-page__container">
                <header className="admin-evaluation-qr-page__header">
                    <h1>QR-code evaluatie</h1>
                    <p className="admin-evaluation-qr-page__intro">
                        Genereer en deel de QR-code voor deze training.
                    </p>
                </header>

                {loading && (
                    <div className="admin-evaluation-qr-page__message">
                        <p>QR-code laden...</p>
                    </div>
                )}

                {error && (
                    <div className="admin-evaluation-qr-page__message admin-evaluation-qr-page__message--error">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <EvaluationQrPanel
                        qrUrl={qrImageUrl}
                        evaluationUrl={qrData?.evaluationUrl}
                        token={qrData?.token}
                        trainingTitle={qrData?.trainingTitle}
                    />
                )}
            </div>
        </main>
    );
}