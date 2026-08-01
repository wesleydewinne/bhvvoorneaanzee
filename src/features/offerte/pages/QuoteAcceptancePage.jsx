import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "@/api/api.js";
import { formatCurrency, formatDate } from "../helpers/quoteFormatters.js";
import "../styles/QuoteAcceptancePage.css";

export default function QuoteAcceptancePage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";
    const [quote, setQuote] = useState(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            setError("Deze akkoordlink is ongeldig.");
            setLoading(false);
            return;
        }

        api.get("/public/quotes/acceptance", { params: { token } })
            .then((response) => setQuote(response.data))
            .catch((requestError) => setError(
                requestError?.message ||
                "De offerte kon niet worden geopend."
            ))
            .finally(() => setLoading(false));
    }, [token]);

    const confirmAcceptance = async () => {
        setSubmitting(true);
        setError("");

        try {
            const response = await api.post(
                "/public/quotes/acceptance",
                { token, termsAccepted: true }
            );
            setQuote(response.data);
            setCompleted(true);
            setShowConfirmation(false);
        } catch (requestError) {
            setError(
                requestError?.message ||
                "De offerte kon niet worden bevestigd."
            );
            setShowConfirmation(false);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <main className="quote-acceptance-page">Offerte laden...</main>;
    }

    if (error && !quote) {
        return (
            <main className="quote-acceptance-page">
                <section className="quote-acceptance-card">
                    <h1>Offerte niet beschikbaar</h1>
                    <p className="quote-acceptance-error">{error}</p>
                    <a href="mailto:offerte@bhvvoorneaanzee.nl">
                        Neem contact met ons op
                    </a>
                </section>
            </main>
        );
    }

    if (completed || quote?.status === "ACCEPTED") {
        return (
            <main className="quote-acceptance-page">
                <section className="quote-acceptance-card">
                    <p className="quote-acceptance-eyebrow">BHV Voorne aan Zee</p>
                    <h1>Bedankt voor uw akkoord</h1>
                    <p>
                        Offerte <strong>{quote?.quoteNumber}</strong> is
                        definitief bevestigd. Wij nemen contact met u op voor
                        de verdere planning.
                    </p>
                </section>
            </main>
        );
    }

    return (
        <main className="quote-acceptance-page">
            <section className="quote-acceptance-card">
                <p className="quote-acceptance-eyebrow">BHV Voorne aan Zee</p>
                <h1>Offerte bevestigen</h1>

                <dl className="quote-acceptance-summary">
                    <div>
                        <dt>Offertenummer</dt>
                        <dd>{quote.quoteNumber}</dd>
                    </div>
                    <div>
                        <dt>Organisatie</dt>
                        <dd>{quote.companyName}</dd>
                    </div>
                    <div>
                        <dt>Geldig tot</dt>
                        <dd>{formatDate(quote.validUntil)}</dd>
                    </div>
                    <div>
                        <dt>Totaal inclusief btw</dt>
                        <dd>{formatCurrency(quote.totalIncludingVat)}</dd>
                    </div>
                </dl>

                {!quote.canAccept ? (
                    <p className="quote-acceptance-error">
                        Deze offerte kan niet meer digitaal worden bevestigd.
                        Neem contact op via{" "}
                        <a href="mailto:offerte@bhvvoorneaanzee.nl">
                            offerte@bhvvoorneaanzee.nl
                        </a>.
                    </p>
                ) : (
                    <>
                        <label className="quote-acceptance-checkbox">
                            <input
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={(event) =>
                                    setAcceptedTerms(event.target.checked)
                                }
                            />
                            <span>
                                Ik heb de offerte en bijbehorende voorwaarden
                                gelezen en ga hiermee akkoord.
                            </span>
                        </label>

                        <button
                            type="button"
                            className="quote-acceptance-primary"
                            disabled={!acceptedTerms}
                            onClick={() => setShowConfirmation(true)}
                        >
                            Offerte ondertekenen
                        </button>
                    </>
                )}

                {error && (
                    <p className="quote-acceptance-error">{error}</p>
                )}
            </section>

            {showConfirmation && (
                <div className="quote-confirm-overlay" role="presentation">
                    <section
                        className="quote-confirm-dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="quote-confirm-title"
                    >
                        <h2 id="quote-confirm-title">
                            Weet u zeker dat u de offerte wilt ondertekenen?
                        </h2>
                        <p>
                            Na bevestiging wordt uw akkoord definitief
                            opgeslagen.
                        </p>
                        <div className="quote-confirm-actions">
                            <button
                                type="button"
                                className="quote-acceptance-secondary"
                                disabled={submitting}
                                onClick={() => setShowConfirmation(false)}
                            >
                                Annuleren
                            </button>
                            <button
                                type="button"
                                className="quote-acceptance-primary"
                                disabled={submitting}
                                onClick={confirmAcceptance}
                            >
                                {submitting
                                    ? "Bevestigen..."
                                    : "Ja, definitief ondertekenen"}
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}
