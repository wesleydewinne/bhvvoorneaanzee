import userService from "../services/userService";

export default function UsersTable({ users, onRefresh }) {

    const handleDeactivate = async (id) => {
        if (!window.confirm("Weet je zeker dat je deze gebruiker wilt deactiveren?")) {
            return;
        }

        await userService.deactivate(id);
        onRefresh();
    };

    return (
        <table>
            <thead>
            <tr>
                <th>Naam</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acties</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user => (
                <tr key={user.id}>
                    <td>{user.firstname} {user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.roles?.[0]}</td>
                    <td>
                        <button onClick={() => handleDeactivate(user.id)}>
                            Deactiveer
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
