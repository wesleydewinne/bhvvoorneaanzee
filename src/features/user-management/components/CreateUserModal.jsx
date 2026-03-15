import { useEffect, useState } from "react";
import userService from "../services/userService.js";

export default function CreateUserModal({ onClose, onCreated }) {
    const [roles, setRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        phoneNumber: "",
        functionTitle: "",
        companyName: "",
        locationId: "",
        locationRole: "",
    });

    useEffect(() => {
        const loadRoles = async () => {
            try {
                setLoadingRoles(true);
                setError("");

                const data = await userService.getAssignableRoles();
                const safeRoles = Array.isArray(data) ? data : [];

                setRoles(safeRoles);

                if (safeRoles.length > 0) {
                    setFormData((prev) => ({
                        ...prev,
                        role: safeRoles[0],
                    }));
                }
            } catch (err) {
                console.error("Fout bij laden rollen:", err);
                setError("Rollen laden mislukt.");
            } finally {
                setLoadingRoles(false);
            }
        };

        loadRoles();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            await userService.create(formData);

            onCreated?.();
            onClose?.();
        } catch (err) {
            console.error("Fout bij aanmaken gebruiker:", err);

            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null);

            setError(backendMessage || "Aanmaken gebruiker mislukt.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="um-modal-backdrop">
            <div className="um-modal">
                <div className="um-modal__header">
                    <h2>Nieuwe gebruiker</h2>
                    <button type="button" className="um-modal__close" onClick={onClose}>
                        ×
                    </button>
                </div>

                {error && <div className="um-alert um-alert--error">{error}</div>}

                <form className="um-form" onSubmit={handleSubmit}>
                    <div className="um-form__grid">
                        <div className="um-form__field">
                            <label htmlFor="firstName">Voornaam</label>
                            <input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="um-form__field">
                            <label htmlFor="lastName">Achternaam</label>
                            <input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
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
                                required
                            />
                        </div>

                        <div className="um-form__field">
                            <label htmlFor="password">Wachtwoord</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="um-form__field">
                            <label htmlFor="role">Rol</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled={loadingRoles}
                                required
                            >
                                {loadingRoles && <option value="">Rollen laden...</option>}
                                {!loadingRoles &&
                                    roles.map((role) => (
                                        <option key={role} value={role}>
                                            {String(role)
                                                .replace("ROLE_", "")
                                                .toLowerCase()
                                                .replaceAll("_", " ")
                                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                                        </option>
                                    ))}
                            </select>
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
                            <label htmlFor="functionTitle">Functie</label>
                            <input
                                id="functionTitle"
                                name="functionTitle"
                                value={formData.functionTitle}
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
                    </div>

                    <div className="um-form__actions">
                        <button type="submit" className="um-button" disabled={saving}>
                            {saving ? "Opslaan..." : "Gebruiker aanmaken"}
                        </button>

                        <button
                            type="button"
                            className="um-button um-button--secondary"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Annuleren
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}