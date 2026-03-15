export default function CertificateBlock({ certificates = [] }) {
    return (
        <section className="profile-card">
            <div className="profile-card__header">
                <h2>Mijn certificaten</h2>
            </div>

            {certificates.length === 0 ? (
                <p>Er zijn momenteel geen certificaten beschikbaar.</p>
            ) : (
                <div className="profile-list">
                    {certificates.map((certificate) => (
                        <article
                            key={certificate.certificateNumber}
                            className="profile-list-item"
                        >
                            <div>
                                <p className="profile-list-item__title">
                                    {certificate.trainingType || "-"}
                                </p>
                                <p>Geldig tot: {certificate.validUntil || "-"}</p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}