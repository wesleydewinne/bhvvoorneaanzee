import { useEffect, useState } from "react";
import { RefreshCw, Search, UserPlus, Users } from "lucide-react";
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
        <section className="um-page dashboard-admin-page">
            <section className="dashboard-admin-hero" aria-labelledby="users-title">
                <div>
                    <p className="dashboard__eyebrow">Accounts</p>
                    <h1 id="users-title">Gebruikersbeheer</h1>
                    <p>Beheer gebruikers, rollen en accountstatussen vanuit een centraal overzicht.</p>
                </div>

                <div className="dashboard-admin-hero__actions">
                    <button
                        type="button"
                        className="dashboard-admin-button dashboard-admin-button--secondary"
                        onClick={() => loadUsers(search)}
                        disabled={loading}
                    >
                        <RefreshCw aria-hidden="true" />
                        Gebruikers ophalen
                    </button>
                    <button
                        type="button"
                        className="dashboard-admin-button"
                        onClick={() => setShowModal(true)}
                    >
                        <UserPlus aria-hidden="true" />
                        Gebruiker toevoegen
                    </button>
                </div>
            </section>

            <section className="dashboard-admin-stats" aria-label="Gebruiker statistieken">
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon">
                        <Users aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : users.length}</strong>
                    <span>Alle gebruikers</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--green">
                        <Search aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : filteredUsers.length}</strong>
                    <span>Zichtbaar na filter</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--orange">
                        <UserPlus aria-hidden="true" />
                    </span>
                    <strong>Nieuw</strong>
                    <span>Snel aanmaken</span>
                </article>
            </section>

            <section className="dashboard-admin-panel" aria-label="Gebruikers zoeken en beheren">
                <div className="dashboard-admin-panel__header">
                    <div>
                        <h2>Alle gebruikers</h2>
                        <p>Zoek gebruikers en filter op accountstatus.</p>
                    </div>
                    <span>{filteredUsers.length} resultaten</span>
                </div>

                <div className="dashboard-admin-search">
                    <UserSearchBar onSearch={handleSearch} initialValue={search} />
                </div>

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
            </section>

            {showModal && (
                <CreateUserModal
                    onClose={() => setShowModal(false)}
                    onCreated={() => loadUsers(search)}
                />
            )}
        </section>
    );
}
