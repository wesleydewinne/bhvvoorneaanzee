import { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable.jsx";
import CreateUserModal from "../components/CreateUserModal.jsx";
import UserSearchBar from "../components/UserSearchBar.jsx";
import userService from "../services/userService.js";
import "../styles/UserManagement.css";

export default function UsersManagementPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [error, setError] = useState("");

    const loadUsers = async (searchValue = search) => {
        try {
            setLoading(true);
            setError("");

            const data = await userService.getAll({ search: searchValue });
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Fout bij laden gebruikers:", err);
            setError("Gebruikers laden mislukt.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleSearch = async (value) => {
        setSearch(value);
        await loadUsers(value);
    };

    const filteredUsers = users.filter((user) => {
        if (statusFilter === "ALL") {
            return true;
        }

        const status = user?.status
            ? String(user.status).toUpperCase()
            : typeof user?.enabled === "boolean"
                ? (user.enabled ? "ACTIVE" : "DISABLED")
                : "UNKNOWN";

        return status === statusFilter;
    });

    return (
        <section className="um-page">
            <div className="um-page__container">
                <div className="um-page__header">
                    <div>
                        <h1>Gebruikersbeheer</h1>
                        <p>Beheer gebruikers, rollen en accountstatussen.</p>
                    </div>

                    <button
                        type="button"
                        className="um-button"
                        onClick={() => setShowModal(true)}
                    >
                        + Nieuwe gebruiker
                    </button>
                </div>

                <UserSearchBar onSearch={handleSearch} initialValue={search} />

                {error && <div className="um-alert um-alert--error">{error}</div>}

                {loading ? (
                    <div className="um-panel">
                        <p>Laden...</p>
                    </div>
                ) : (
                    <UsersTable
                        users={filteredUsers}
                        statusFilter={statusFilter}
                        onStatusFilterChange={setStatusFilter}
                    />
                )}

                {showModal && (
                    <CreateUserModal
                        onClose={() => setShowModal(false)}
                        onCreated={() => loadUsers(search)}
                    />
                )}
            </div>
        </section>
    );
}