// src/features/contact/pages/AdminContactMessagesPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import contactService from "@/features/contact/services/contactService.js";
import ContactMessagesTable from "../components/ContactMessagesTable.jsx";
import ContactSearchBar from "../components/ContactSearchBar.jsx";
import { filterMessages } from "../helpers/contactHelpers.js";
import "../styles/Contact.css";

function AdminContactMessagesPage() {
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMessages = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await contactService.getAllMessages(false);
                setMessages(data);
            } catch (err) {
                console.error("Fout bij ophalen contactberichten:", err);
                setError("Het ophalen van de contactberichten is mislukt.");
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, []);

    const filteredMessages = useMemo(() => {
        return filterMessages(messages, searchTerm);
    }, [messages, searchTerm]);

    return (
        <div className="contact-admin-page">
            <div className="contact-admin-header">
                <div>
                    <h1>Contactberichten</h1>
                    <p>Overzicht van alle actieve contactberichten.</p>
                </div>

                <Link to="/admin/contact-berichten/archief" className="contact-page-link">
                    Bekijk archief
                </Link>
            </div>

            <ContactSearchBar
                value={searchTerm}
                onChange={setSearchTerm}
            />

            {loading && <p>Contactberichten laden...</p>}
            {error && <p className="form-error">{error}</p>}

            {!loading && !error && (
                <ContactMessagesTable messages={filteredMessages} archived={false} />
            )}
        </div>
    );
}

export default AdminContactMessagesPage;