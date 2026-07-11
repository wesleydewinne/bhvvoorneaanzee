import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import locationService from "../services/locationService.js";
import "../styles/Locations.css";

function LocationDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const loadLocation = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await locationService.getById(id);
                setLocation(data);
            } catch (err) {
                console.error("Fout bij ophalen locatie:", err);

                const backendMessage =
                    err?.response?.data?.message ||
                    err?.response?.data?.error ||
                    (typeof err?.response?.data === "string" ? err.response.data : null);

                setError(backendMessage || "De locatie kon niet worden opgehaald.");
            } finally {
                setLoading(false);
            }
        };

        loadLocation();
    }, [id]);

    const handleDelete = async () => {
        if (!location?.id) {
            return;
        }

        const confirmed = window.confirm(
            `Weet je zeker dat je locatie "${location.locationName}" wilt verwijderen?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);
            await locationService.remove(location.id);
            navigate("/admin/locations");
        } catch (err) {
            console.error("Fout bij verwijderen locatie:", err);

            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null);

            alert(backendMessage || "Verwijderen van locatie is mislukt.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <main className="locations-page">
                <div className="locations-page__container">
                    <p>Locatie laden...</p>
                </div>
            </main>
        );
    }

    if (error || !location) {
        return (
            <main className="locations-page">
                <div className="locations-page__container">
                    <p className="form-message form-message--error">
                        {error || "Locatie niet gevonden."}
                    </p>

                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={() => navigate("/admin/locations")}
                    >
                        Terug naar overzicht
                    </button>
                </div>
            </main>
        );
    }

    const companyRelations = Array.isArray(location.companyLocations)
        ? location.companyLocations
        : (Array.isArray(location.companies) ? location.companies : []);
    const additionalInfo = Array.isArray(location.additionalInfo) ? location.additionalInfo : [];

    return (
        <main className="locations-page">
            <div className="locations-page__container">
                <section className="locations-page__header">
                    <div>
                        <h1>Locatie details</h1>
                        <p>Bekijk alle gegevens van deze locatie.</p>
                    </div>

                    <div className="locations-page__header-actions">
                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={() => navigate("/admin/locations")}
                        >
                            Terug
                        </button>

                        <button
                            type="button"
                            className="button"
                            onClick={() => navigate(`/admin/locations/${location.id}/edit`)}
                        >
                            Bewerken
                        </button>

                        {location?.id ? (
                            <button
                                type="button"
                                className="button button--danger"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Verwijderen..." : "Verwijderen"}
                            </button>
                        ) : null}
                    </div>
                </section>

                <section className="location-detail-card">
                    {location.locationImageUrl || location.locationImageKey ? (
                        <img
                            className="location-detail-image"
                            src={location.locationImageUrl || locationService.getPhotoUrl(location.id)}
                            alt={location.locationName}
                        />
                    ) : null}
                    <div className="location-detail-grid">
                        <div>
                            <strong>Locatienaam</strong>
                            <p>{location.locationName || "-"}</p>
                        </div>

                        <div>
                            <strong>Adres</strong>
                            <p>{location.address || "-"}</p>
                        </div>

                        <div>
                            <strong>Postcode</strong>
                            <p>{location.postalCode || "-"}</p>
                        </div>

                        <div>
                            <strong>Plaats</strong>
                            <p>{location.city || "-"}</p>
                        </div>

                        <div>
                            <strong>Telefoon</strong>
                            <p>{location.phone || "-"}</p>
                        </div>

                        <div>
                            <strong>E-mail</strong>
                            <p>{location.email || "-"}</p>
                        </div>

                        <div><strong>Aantal gebouwen</strong><p>{location.numberOfBuildings ?? "-"}</p></div>
                        <div><strong>Verdiepingen op locatie</strong><p>{location.locationFloorCount ?? "-"}</p></div>
                        <div><strong>Verdiepingen per gebouw</strong><p>{location.buildingFloorCount ?? "-"}</p></div>

                        <div className="location-detail-grid__full">
                            <strong>Parkeerinformatie</strong>
                            <p>{location.parkingInfo || "-"}</p>
                        </div>

                        <div className="location-detail-grid__full">
                            <strong>Gekoppelde bedrijven</strong>

                            {companyRelations.length > 0 ? (
                                <ul className="location-company-list">
                                    {companyRelations.map((relation) => {
                                        const company = relation.company ?? relation;
                                        return <li key={relation.id ?? relation.companyId ?? company.id}>
                                            <strong>{relation.companyName ?? company.name ?? `Bedrijf ${relation.companyId ?? company.id}`}</strong>
                                            <span>{[
                                                relation.contactPersonName,
                                                relation.buildingSection,
                                                relation.floor && `Verdieping ${relation.floor}`,
                                                relation.roomNumber && `Ruimte ${relation.roomNumber}`,
                                            ].filter(Boolean).join(" · ")}</span>
                                            <span>{[relation.locationEmail, relation.locationPhone, relation.contactPersonEmail, relation.contactPersonPhone].filter(Boolean).join(" · ")}</span>
                                            <span>{[relation.activeFrom && `Vanaf ${relation.activeFrom}`, relation.activeUntil && `Tot ${relation.activeUntil}`].filter(Boolean).join(" · ")}</span>
                                            <span>{relation.primaryLocation ? "Primaire locatie" : ""}{relation.active === false ? " · Inactief" : ""}</span>
                                            {relation.notes ? <p>{relation.notes}</p> : null}
                                        </li>
                                    })}
                                </ul>
                            ) : (
                                <p>-</p>
                            )}
                        </div>

                        <div className="location-detail-grid__full">
                            <strong>Omschrijving</strong>
                            <p>{location.description || "-"}</p>
                        </div>

                        <div className="location-detail-grid__full">
                            <strong>Aanvullende informatie</strong>
                            {additionalInfo.length ? (
                                <div className="additional-info-list">
                                    {[...additionalInfo].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((info) => (
                                        <article key={info.id ?? `${info.type}-${info.title}`} className={info.important ? "is-important" : ""}>
                                            <div><span>{info.type}</span>{info.important ? <b>Belangrijk</b> : null}</div>
                                            <h3>{info.title}</h3>
                                            <p>{info.content}</p>
                                            {Array.isArray(info.visibleForRoles) && info.visibleForRoles.length ? <small>Zichtbaar voor: {info.visibleForRoles.join(", ")}</small> : null}
                                        </article>
                                    ))}
                                </div>
                            ) : <p>-</p>}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default LocationDetailPage;
