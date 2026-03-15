export default function ProfileInfoBlock({ profile }) {
    return (
        <section className="profile-card">
            <div className="profile-card__header">
                <h2>Profielgegevens</h2>
            </div>

            <div className="profile-info-list">
                <InfoRow label="Voornaam" value={profile.firstName} />
                <InfoRow label="Achternaam" value={profile.lastName} />
                <InfoRow label="E-mail" value={profile.email} />
                <InfoRow label="Telefoonnummer" value={profile.phoneNumber} />
                <InfoRow label="Geboortedatum" value={profile.dateOfBirth} />
                <InfoRow label="Bedrijfsnaam" value={profile.companyName} />
                <InfoRow label="Functie" value={profile.functionTitle} />
                <InfoRow label="NIBHV nummer" value={profile.nibhvNummer} />
                <InfoRow label="Oranje Kruis nummer" value={profile.oranjeKruisNummer} />
                <InfoRow
                    label="Rollen"
                    value={
                        Array.isArray(profile.globalRoles) && profile.globalRoles.length > 0
                            ? profile.globalRoles.join(", ")
                            : "-"
                    }
                />
            </div>
        </section>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="profile-info-row">
            <span className="profile-info-row__label">{label}</span>
            <span className="profile-info-row__value">{value || "-"}</span>
        </div>
    );
}