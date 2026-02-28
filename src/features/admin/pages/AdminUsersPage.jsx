import { useEffect, useState } from "react";
import userService from "../services/userService";
import UsersTable from "../components/UsersTable";
import CreateUserModal from "../components/CreateUserModal";

export default function AdminUsersPage() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await userService.getAll();
            setUsers(data);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Laden...</p>;

    return (
        <div>
            <h2>Gebruikersbeheer</h2>

            <button onClick={() => setShowModal(true)}>
                + Nieuwe gebruiker
            </button>

            <UsersTable users={users} onRefresh={loadUsers} />

            {showModal && (
                <CreateUserModal
                    onClose={() => setShowModal(false)}
                    onCreated={loadUsers}
                />
            )}
        </div>
    );
}
