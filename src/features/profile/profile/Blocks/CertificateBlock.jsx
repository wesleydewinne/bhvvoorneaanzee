export default function CertificateBlock({ certificates }) {
    return (
        <div className="profile-card">
            <h3>Mijn certificaten</h3>

            {certificates.length === 0 && (
                <p>Geen certificaten beschikbaar</p>
            )}

            {certificates.map(cert => (
                <div key={cert.certificateNumber} className="certificate-item">
                    <p><strong>{cert.trainingType}</strong></p>
                    <p>Geldig tot: {cert.validUntil}</p>
                    <button
                        onClick={() =>
                            window.open(
                                `/api/certificates/${cert.certificateNumber}/pdf`,
                                "_blank"
                            )
                        }
                    >
                        Download PDF
                    </button>
                </div>
            ))}
        </div>
    );
}
