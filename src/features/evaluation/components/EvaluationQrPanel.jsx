export default function EvaluationQrPanel({
                                              qrUrl,
                                              evaluationUrl,
                                              token,
                                              trainingTitle,
                                          }) {
    return (
        <section
            className="evaluation-qr-panel"
            aria-labelledby="evaluation-qr-panel-title"
        >
            <h2 id="evaluation-qr-panel-title">Evaluatie QR-code</h2>

            <p>
                Deel deze QR-code met deelnemers zodat zij direct de evaluatie kunnen openen.
            </p>

            <div className="evaluation-qr-panel__layout">
                <div className="evaluation-qr-panel__meta">
                    {trainingTitle && (
                        <p>
                            <strong>Training:</strong> {trainingTitle}
                        </p>
                    )}

                    {evaluationUrl && (
                        <p className="evaluation-qr-panel__link">
                            <strong>Link:</strong>{" "}
                            <a href={evaluationUrl} target="_blank" rel="noreferrer">
                                Open evaluatieformulier
                            </a>
                        </p>
                    )}

                    {token && (
                        <p className="evaluation-qr-panel__token">
                            <strong>Token:</strong> {token}
                        </p>
                    )}
                </div>

                {qrUrl ? (
                    <figure className="evaluation-qr-panel__figure">
                        <img
                            className="evaluation-qr-panel__image"
                            src={qrUrl}
                            alt="QR-code voor het evaluatieformulier"
                        />
                        <figcaption>
                            Scan de QR-code om het formulier te openen.
                        </figcaption>
                    </figure>
                ) : (
                    <p>Er is nog geen QR-code beschikbaar.</p>
                )}
            </div>
        </section>
    );
}