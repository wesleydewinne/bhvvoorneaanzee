import { useNavigate } from "react-router-dom";
import { Building2, Eye, Mail, MapPin, Pencil, Phone, Trash2 } from "lucide-react";
import { formatLocationCompanies } from "../helpers/locationHelpers.js";

function LocationsTable({ locations, onDelete }) {
    const navigate = useNavigate();

    if (!locations.length) {
        return (
            <div className="locations-empty">
                <p>Geen locaties gevonden.</p>
            </div>
        );
    }

    return (
        <div className="locations-grid">
            {locations.map((location) => (
                <article key={location.id} className="location-overview-card">
                    <div className="location-overview-card__header">
                        <span className="location-overview-card__icon"><MapPin aria-hidden="true" /></span>
                        <div>
                            <h3>{location.locationName || "Naamloze locatie"}</h3>
                            <small>Locatie #{location.id}</small>
                        </div>
                    </div>

                    <dl className="location-overview-card__details">
                        <div><MapPin aria-hidden="true" /><dt>Adres</dt><dd>{[location.address, location.postalCode, location.city].filter(Boolean).join(", ") || "Niet ingevuld"}</dd></div>
                        <div><Building2 aria-hidden="true" /><dt>Bedrijven</dt><dd>{formatLocationCompanies(location)}</dd></div>
                        <div><Phone aria-hidden="true" /><dt>Telefoon</dt><dd>{location.phone || "Niet ingevuld"}</dd></div>
                        <div><Mail aria-hidden="true" /><dt>E-mail</dt><dd>{location.email || "Niet ingevuld"}</dd></div>
                    </dl>

                    <div className="location-overview-card__actions">
                                <button
                                    type="button"
                                    className="icon-action-button"
                                    onClick={() => navigate(`/admin/locations/${location.id}`)}
                                    aria-label={`Bekijk locatie ${location.locationName}`}
                                    title="Bekijken"
                                >
                                    <Eye aria-hidden="true" />
                                </button>

                                <button
                                    type="button"
                                    className="icon-action-button"
                                    onClick={() => navigate(`/admin/locations/${location.id}/edit`)}
                                    aria-label={`Bewerk locatie ${location.locationName}`}
                                    title="Bewerken"
                                >
                                    <Pencil aria-hidden="true" />
                                </button>

                                {onDelete ? (
                                    <button
                                        type="button"
                                        className="icon-action-button icon-action-button--danger"
                                        onClick={() => onDelete(location)}
                                        aria-label={`Verwijder locatie ${location.locationName}`}
                                        title="Verwijderen"
                                    >
                                        <Trash2 aria-hidden="true" />
                                    </button>
                                ) : null}
                    </div>
                </article>
            ))}
        </div>
    );
}

export default LocationsTable;
