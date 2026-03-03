import { useEffect, useState } from "react";
import userService from "../services/userService";
import { useAuthContext } from "@/features/auth/context/AuthContext";

export default function CreateUserModal({ onClose, onCreated }) {
    const { roles: currentUserRoles } = useAuthContext();

    const [roles, setRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: "",
    });

    useEffect(() => {
        const loadRoles = async () => {
            try {
                setLoadingRoles(true);
                setError("");

                const data = await userService.getRoles(); // verwacht bv ["ROLE_STUDENT","ROLE_TRAINING_MANAGER",...]

                const safeCurrentRoles = Array.isArray(currentUserRoles)
                    ? currentUserRoles
                    : [];

                // Alleen ADMIN mag ADMIN toekennen (als die ooit in lijst zit)
                const filtered = (Array.isArray(data) ? data : []).filter((role) => {
                    if (role === "ROLE_ADMIN") {
                        return safeCurrentRoles.includes("ROLE_ADMIN");
                    }
                    return true;
                });

                setRoles(filtered);

                // default select
                if (filtered.length > 0) {
                    setForm((prev) => ({ ...prev, role: filtered[0] }));
                } else {
                    setForm((prev) => ({ ...prev, role: "" }));
                }
            } catch (err) {
                console.error(
                    "LOAD ROLES FAILED:",
                    err?.response?.status,
                    err?.response?.data || err
                );
                setError("Rollen laden mislukt. Check je token/roles of endpoint.");
                setRoles([]);
            } finally {
                setLoadingRoles(false);
            }
        };

        loadRoles();
    }, [currentUserRoles]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            console.log("SUBMIT FORM:", form);

            await userService.create(form);

            onCreated?.();
            onClose?.();
        } catch (err) {
            console.error(
                "CREATE USER FAILED:",
                err?.response?.status,
                err?.response?.data || err
            );

            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null) ||
                `Opslaan mislukt. Status: ${err?.response?.status ?? "?"}`;

            setError(msg);
            alert(msg);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h3>Nieuwe gebruiker</h3>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <input
                    placeholder="Voornaam"
                    value={form.firstname}
                    onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                    required
                />

                <input
                    placeholder="Achternaam"
                    value={form.lastname}
                    onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                    required
                />

                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />

                <input
                    type="password"
                    placeholder="Wachtwoord"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />

                <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    disabled={loadingRoles || roles.length === 0}
                    required
                >
                    {loadingRoles && <option value="">Rollen laden...</option>}

                    {!loadingRoles && roles.length === 0 && (
                        <option value="">Geen rollen beschikbaar</option>
                    )}

                    {!loadingRoles &&
                        roles.map((role) => (
                            <option key={role} value={role}>
                                {formatRoleLabel(role)}
                            </option>
                        ))}
                </select>

                <button type="submit" disabled={saving}>
                    {saving ? "Opslaan..." : "Opslaan"}
                </button>

                <button type="button" onClick={onClose} disabled={saving}>
                    Annuleren
                </button>
            </form>
        </div>
    );
}

function formatRoleLabel(role) {
    // "ROLE_TRAINING_MANAGER" -> "Training manager"
    return role
        .replace("ROLE_", "")
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/^\w/, (c) => c.toUpperCase());
}