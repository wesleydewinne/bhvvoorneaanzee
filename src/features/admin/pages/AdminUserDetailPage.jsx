import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/api";

export default function AdminUserDetailPage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await api.get(`/users/${id}`);
            setUser(res.data);
        })();
    }, [id]);

    if (!user) return <p>Laden...</p>;

    return (
        <div>
            <h1>Gebruiker #{id}</h1>
            <p><b>Naam:</b> {user.firstName} {user.lastName}</p>
            <p><b>Email:</b> {user.email}</p>

            {/* Hier straks edit form + save via PUT /users/{id} */}
        </div>
    );
}