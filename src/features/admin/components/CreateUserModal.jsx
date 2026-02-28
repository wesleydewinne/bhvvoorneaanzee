import { useEffect, useState } from "react";
import userService from "../services/userService";
import { useAuthContext } from "@/features/auth/context/AuthContext";

export default function CreateUserModal({ onClose, onCreated }) {

    const { roles: currentUserRoles } = useAuthContext();
    const [roles, setRoles] = useState([]);

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: ""
    });

    useEffect(() => {
        const loadRoles = async () => {
            const data = await userService.getRoles();

            const filtered = data.filter(role => {
                if (role === "ROLE_ADMIN" &&
                    !currentUserRoles.includes("ROLE_ADMIN")) {
                    return false;
                }
                return true;
            });

            setRoles(filtered);

            if (filtered.length > 0) {
                setForm(prev => ({ ...prev, role: filtered[0] }));
            }
        };

        loadRoles();
    }, [currentUserRoles]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await userService.create(form);
        onCreated();
        onClose();
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h3>Nieuwe gebruiker</h3>

                <input
                    placeholder="Voornaam"
                    value={form.firstname}
                    onChange={e => setForm({...form, firstname: e.target.value})}
                />

                <input
                    placeholder="Achternaam"
                    value={form.lastname}
                    onChange={e => setForm({...form, lastname: e.target.value})}
                />

                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                />

                <input
                    type="password"
                    placeholder="Wachtwoord"
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                />

                <select
                    value={form.role}
                    onChange={e => setForm({...form, role: e.target.value})}
                >
                    {roles.map(role => (
                        <option key={role} value={role}>
                            {role.replace("ROLE_", "")}
                        </option>
                    ))}
                </select>

                <button type="submit">Opslaan</button>
                <button type="button" onClick={onClose}>Annuleren</button>
            </form>
        </div>
    );
}
