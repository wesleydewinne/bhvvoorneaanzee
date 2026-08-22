import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "@/features/auth/context/AuthContext.jsx";
import userService from "../services/userService.js";
import {
    formatRoleLabel,
    formatStatusLabel,
    getStatusLabel,
} from "../helpers/userFormatters.js";
import "../styles/UserManagement.css";

export default function UserDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { roles: currentUserRoles = [] } = useAuthContext();

    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [privacyPreview, setPrivacyPreview] = useState(null);
    const [privacyConfirmation, setPrivacyConfirmation] = useState("");
    const [privacyLoading, setPrivacyLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        companyId: null,
        companyName: "",
        functionTitle: "",
        nibhvNummer: "",
        oranjeKruisNummer: "",
        enabled: true,
        accountNonLocked: true,
        mustChangePassword: false,
        globalRoles: [],
        locationRoles: [],
        status: "",
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError("");

                const [userData, rolesData] = await Promise.all([
                    userService.getById(id),
                    userService.getAssignableRoles(),
                ]);

                setUser(userData);
                setRoles(Array.isArray(rolesData) ? rolesData : []);
                setFormData(mapUserToForm(userData));
            } catch (err) {
                console.error("Fout bij laden gebruiker:", err);
                setError("Gebruiker laden mislukt.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleRoleToggle = (roleName) => {
        setFormData((prev) => {
            const exists = prev.globalRoles.includes(roleName);

            return {
                ...prev,
                globalRoles: exists
                    ? prev.globalRoles.filter((role) => role !== roleName)
                    : [...prev.globalRoles, roleName],
            };
        });
    };

    const handleStartEdit = () => {
        setSuccessMessage("");
        setError("");
        setFormData(mapUserToForm(user));
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setSuccessMessage("");
        setError("");
        setFormData(mapUserToForm(user));
        setEditing(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccessMessage("");

            const updated = await userService.update(id, formData);
            setUser(updated);
            setFormData(mapUserToForm(updated));
            setSuccessMessage("Gebruiker is bijgewerkt.");
            setEditing(false);
        } catch (err) {
            console.error("Fout bij opslaan gebruiker:", err);

            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null);

            setError(backendMessage || "Opslaan mislukt.");
        } finally {
            setSaving(false);
        }
    };

    const handleActivate = async () => {
        try {
            setSaving(true);
            setError("");
            setSuccessMessage("");

            const updated = await userService.activate(id);
            setUser(updated);
            setFormData(mapUserToForm(updated));
            setSuccessMessage("Gebruiker is geactiveerd.");
        } catch (err) {
            console.error("Fout bij activeren gebruiker:", err);
            setError("Activeren mislukt.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeactivate = async () => {
        try {
            setSaving(true);
            setError("");
            setSuccessMessage("");

            await userService.deactivate(id);
            navigate("/admin/users");
        } catch (err) {
            console.error("Fout bij deactiveren gebruiker:", err);
            setError("Deactiveren mislukt.");
        } finally {
            setSaving(false);
        }
    };

    const handlePrivacyExport = async () => {
        try {
            setPrivacyLoading(true);
            setError("");
            await userService.downloadPrivacyExport(id);
            setSuccessMessage("Het AVG-inzagedossier is gedownload.");
        } catch (err) {
            console.error("Fout bij exporteren persoonsgegevens:", err);
            setError("Het AVG-inzagedossier kon niet worden gemaakt.");
        } finally {
            setPrivacyLoading(false);
        }
    };

    const openPrivacyDeletion = async () => {
        try {
            setPrivacyLoading(true);
            setError("");
            setPrivacyConfirmation("");
            setPrivacyPreview(await userService.getPrivacyDeletionPreview(id));
        } catch (err) {
            console.error("Fout bij laden verwijderpreview:", err);
            setError("De verwijderpreview kon niet worden geladen.");
        } finally {
            setPrivacyLoading(false);
        }
    };

    const handlePrivacyAnonymize = async () => {
        try {
            setPrivacyLoading(true);
            setError("");
            await userService.anonymizePrivacyData(id, privacyConfirmation);
            setPrivacyPreview(null);
            setPrivacyConfirmation("");
            const updated = await userService.getById(id);
            setUser(updated);
            setFormData(mapUserToForm(updated));
            setSuccessMessage("Het verwijderingsverzoek is verwerkt en de gebruiker is geanonimiseerd.");
        } catch (err) {
            console.error("Fout bij anonimiseren persoonsgegevens:", err);
            const message = err?.response?.data?.message || err?.response?.data?.error;
            setError(message || "Het verwijderingsverzoek kon niet worden verwerkt.");
        } finally {
            setPrivacyLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="um-page">
                <div className="um-page__container">
                    <div className="um-panel">
                        <p>Laden...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (!user) {
        return (
            <section className="um-page">
                <div className="um-page__container">
                    <div className="um-alert um-alert--error">
                        Gebruiker niet gevonden.
                    </div>
                </div>
            </section>
        );
    }

    const isAdminUser =
        Array.isArray(user?.globalRoles) &&
        user.globalRoles.includes("ROLE_ADMIN");
    const canManagePrivacy = currentUserRoles.includes("ROLE_ADMIN");
    const isAnonymized = user.email === `deleted+${user.id}@privacy.invalid`;

    const statusLabel = formatStatusLabel(getStatusLabel(user));

    return (
        <section className="um-page">
            <div className="um-page__container">
                <div className="um-page__toolbar">
                    <Link to="/admin/users" className="um-link">
                        ← Terug naar gebruikersbeheer
                    </Link>
                </div>

                <div className="um-page__header">
                    <div>
                        <h1>Gebruiker #{user.id}</h1>
                        <p>
                            {user.firstName} {user.lastName} — {user.email}
                        </p>
                    </div>

                    <div className="um-actions">
                        {canManagePrivacy && !isAnonymized && (
                            <button
                                type="button"
                                className="um-button um-button--secondary"
                                onClick={handlePrivacyExport}
                                disabled={privacyLoading}
                            >
                                Persoonsgegevens exporteren
                            </button>
                        )}

                        {canManagePrivacy && !isAdminUser && !isAnonymized && (
                            <button
                                type="button"
                                className="um-button um-button--danger"
                                onClick={openPrivacyDeletion}
                                disabled={privacyLoading}
                            >
                                Verwijderingsverzoek verwerken
                            </button>
                        )}
                        {!editing && (
                            <button
                                type="button"
                                className="um-button"
                                onClick={handleStartEdit}
                            >
                                Bewerken
                            </button>
                        )}

                        {!isAdminUser && getStatusLabel(user).toUpperCase() === "DISABLED" && (
                            <button
                                type="button"
                                className="um-button"
                                onClick={handleActivate}
                                disabled={saving}
                            >
                                Activeer
                            </button>
                        )}

                        {!isAdminUser && getStatusLabel(user).toUpperCase() !== "DISABLED" && (
                            <button
                                type="button"
                                className="um-button um-button--danger"
                                onClick={handleDeactivate}
                                disabled={saving}
                            >
                                Deactiveer
                            </button>
                        )}
                    </div>
                </div>

                {successMessage && (
                    <div className="um-alert um-alert--success">{successMessage}</div>
                )}

                {error && <div className="um-alert um-alert--error">{error}</div>}

                {privacyPreview && (
                    <div className="um-modal-backdrop" role="presentation">
                        <div className="um-modal um-privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-delete-title">
                            <div className="um-modal__header">
                                <div>
                                    <span className="um-eyebrow">AVG-verwijderingsverzoek</span>
                                    <h2 id="privacy-delete-title">Controleer vóór anonimiseren</h2>
                                </div>
                                <button
                                    type="button"
                                    className="um-modal__close"
                                    onClick={() => setPrivacyPreview(null)}
                                    aria-label="Venster sluiten"
                                    disabled={privacyLoading}
                                >
                                    ×
                                </button>
                            </div>

                            <p>
                                <strong>{privacyPreview.displayName}</strong> ({privacyPreview.email}) kan hierna niet meer inloggen.
                                Deze actie kan niet worden teruggedraaid.
                            </p>

                            <div className="um-privacy-counts">
                                <PrivacyCount label="Trainingen" value={privacyPreview.courseParticipationCount} />
                                <PrivacyCount label="Ontvangen certificaten" value={privacyPreview.receivedCertificateCount} />
                                <PrivacyCount label="Uitgegeven certificaten" value={privacyPreview.issuedCertificateCount} />
                                <PrivacyCount label="Trainingen als instructeur" value={privacyPreview.trainerCourseCount} />
                                <PrivacyCount label="Facturen" value={privacyPreview.invoiceCount} />
                                <PrivacyCount label="Auditregistraties" value={privacyPreview.auditRecordCount} />
                            </div>

                            <div className="um-privacy-columns">
                                <div>
                                    <h3>Wordt verwijderd</h3>
                                    <ul>{privacyPreview.removedData.map((item) => <li key={item}>{item}</li>)}</ul>
                                </div>
                                <div>
                                    <h3>Blijft geanonimiseerd bewaard</h3>
                                    <ul>{privacyPreview.retainedData.map((item) => <li key={item}>{item}</li>)}</ul>
                                </div>
                            </div>

                            <div className="um-form__field">
                                <label htmlFor="privacy-confirm-email">
                                    Typ ter bevestiging het huidige e-mailadres
                                </label>
                                <input
                                    id="privacy-confirm-email"
                                    type="email"
                                    value={privacyConfirmation}
                                    onChange={(event) => setPrivacyConfirmation(event.target.value)}
                                    placeholder={privacyPreview.email}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="um-form__actions um-privacy-modal__actions">
                                <button
                                    type="button"
                                    className="um-button um-button--secondary"
                                    onClick={() => setPrivacyPreview(null)}
                                    disabled={privacyLoading}
                                >
                                    Annuleren
                                </button>
                                <button
                                    type="button"
                                    className="um-button um-button--danger"
                                    onClick={handlePrivacyAnonymize}
                                    disabled={privacyLoading || privacyConfirmation.trim().toLowerCase() !== privacyPreview.email.toLowerCase()}
                                >
                                    {privacyLoading ? "Verwerken..." : "Definitief anonimiseren"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {!editing ? (
                    <div className="um-panel">
                        <div className="um-detail-grid">
                            <DetailRow label="Voornaam" value={user.firstName} />
                            <DetailRow label="Achternaam" value={user.lastName} />
                            <DetailRow label="E-mail" value={user.email} />
                            <DetailRow label="Telefoonnummer" value={user.phoneNumber} />
                            <DetailRow label="Geboortedatum" value={user.dateOfBirth} />
                            <DetailRow label="Bedrijfsnaam" value={user.companyName} />
                            <DetailRow label="Functie" value={user.functionTitle} />
                            <DetailRow label="NIBHV-registratienummer" value={user.nibhvNummer} />
                            <DetailRow label="Oranje Kruis-registratienummer" value={user.oranjeKruisNummer} />
                            <DetailRow label="Status" value={statusLabel} />
                            <DetailRow
                                label="Ingeschakeld"
                                value={user.enabled ? "Ja" : "Nee"}
                            />
                            <DetailRow
                                label="Account niet vergrendeld"
                                value={user.accountNonLocked ? "Ja" : "Nee"}
                            />
                            <DetailRow
                                label="Moet wachtwoord wijzigen"
                                value={user.mustChangePassword ? "Ja" : "Nee"}
                            />
                            <DetailRow
                                label="Globale rollen"
                                value={
                                    Array.isArray(user.globalRoles) && user.globalRoles.length > 0
                                        ? user.globalRoles.map(formatRoleLabel).join(", ")
                                        : "-"
                                }
                            />
                        </div>
                    </div>
                ) : (
                    <form className="um-panel um-form" onSubmit={handleSubmit}>
                        <div className="um-form__grid">
                            <div className="um-form__field">
                                <label htmlFor="firstName">Voornaam</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="um-form__field">
                                <label htmlFor="lastName">Achternaam</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="um-form__field">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="um-form__field">
                                <label htmlFor="phoneNumber">Telefoonnummer</label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="um-form__field">
                                <label htmlFor="dateOfBirth">Geboortedatum</label>
                                <input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="um-form__field">
                                <label htmlFor="companyName">Bedrijfsnaam</label>
                                <input
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="um-form__field">
                                <label htmlFor="functionTitle">Functie</label>
                                <input
                                    id="functionTitle"
                                    name="functionTitle"
                                    value={formData.functionTitle}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="um-form__field">
                                <label htmlFor="nibhvNummer">NIBHV-registratienummer</label>
                                <input
                                    id="nibhvNummer"
                                    name="nibhvNummer"
                                    value={formData.nibhvNummer}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="um-form__field">
                                <label htmlFor="oranjeKruisNummer">Oranje Kruis-registratienummer</label>
                                <input
                                    id="oranjeKruisNummer"
                                    name="oranjeKruisNummer"
                                    value={formData.oranjeKruisNummer}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="um-form__field">
                                <label htmlFor="status">Status</label>
                                <input
                                    id="status"
                                    name="status"
                                    value={formatStatusLabel(formData.status || "UNKNOWN")}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="um-checkbox-group">
                            <label className="um-checkbox">
                                <input
                                    type="checkbox"
                                    name="enabled"
                                    checked={!!formData.enabled}
                                    onChange={handleChange}
                                />
                                Ingeschakeld
                            </label>

                            <label className="um-checkbox">
                                <input
                                    type="checkbox"
                                    name="accountNonLocked"
                                    checked={!!formData.accountNonLocked}
                                    onChange={handleChange}
                                />
                                Account niet vergrendeld
                            </label>

                            <label className="um-checkbox">
                                <input
                                    type="checkbox"
                                    name="mustChangePassword"
                                    checked={!!formData.mustChangePassword}
                                    onChange={handleChange}
                                />
                                Moet wachtwoord wijzigen
                            </label>
                        </div>

                        <div className="um-role-section">
                            <h2>Globale rollen</h2>

                            <div className="um-role-grid">
                                {roles.map((role) => (
                                    <label key={role} className="um-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={formData.globalRoles.includes(role)}
                                            onChange={() => handleRoleToggle(role)}
                                        />
                                        {formatRoleLabel(role)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="um-form__actions">
                            <button type="submit" className="um-button" disabled={saving}>
                                {saving ? "Opslaan..." : "Opslaan"}
                            </button>

                            <button
                                type="button"
                                className="um-button um-button--secondary"
                                onClick={handleCancelEdit}
                                disabled={saving}
                            >
                                Annuleren
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="um-detail-row">
            <span className="um-detail-row__label">{label}</span>
            <span className="um-detail-row__value">{value || "-"}</span>
        </div>
    );
}

function mapUserToForm(user) {
    return {
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        email: user?.email ?? "",
        phoneNumber: user?.phoneNumber ?? "",
        dateOfBirth: user?.dateOfBirth ?? "",
        companyId: user?.companyId ?? null,
        companyName: user?.companyName ?? "",
        functionTitle: user?.functionTitle ?? "",
        nibhvNummer: user?.nibhvNummer ?? "",
        oranjeKruisNummer: user?.oranjeKruisNummer ?? "",
        enabled: typeof user?.enabled === "boolean" ? user.enabled : true,
        accountNonLocked:
            typeof user?.accountNonLocked === "boolean" ? user.accountNonLocked : true,
        mustChangePassword:
            typeof user?.mustChangePassword === "boolean" ? user.mustChangePassword : false,
        globalRoles: Array.isArray(user?.globalRoles) ? user.globalRoles : [],
        locationRoles: Array.isArray(user?.locationRoles) ? user.locationRoles : [],
        status: user?.status ?? "",
    };
}

function PrivacyCount({ label, value }) {
    return (
        <div className="um-privacy-count">
            <strong>{value}</strong>
            <span>{label}</span>
        </div>
    );
}
