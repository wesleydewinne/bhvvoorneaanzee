// src/features/contact/pages/ArchivedContactMessagesPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import contactService from "@/features/contact/services/contactService.js";
import ContactMessagesTable from "../components/ContactMessagesTable.jsx";
import ContactSearchBar from "../components/ContactSearchBar.jsx";
import { filterMessages, sortArchivedMessagesByArchivedDate } from "../helpers/contactHelpers.js";
import "../styles/Contact.css";

function ArchivedContactMessagesPage() {
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadArchivedMessages = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await contactService.getAllMessages(true);
                setMessages(sortArchivedMessagesByArchivedDate(data));
            } catch (err) {
                console.error("Fout bij ophalen archiefberichten:", err);
                setError("Het ophalen van het archief is mislukt.");
            } finally {
                setLoading(false);
            }
        };

        loadArchivedMessages();
    }, []);

    const filteredMessages = useMemo(() => {
        return filterMessages(messages, searchTerm);
    }, [messages, searchTerm]);

    return (
        <div className="contact-admin-page">
            <div className="contact-admin-header">
                <div>
                    <h1>Archief contactberichten</h1>
                    <p>Overzicht van afgehandelde en gearchiveerde berichten.</p>
                </div>

                <Link to="/admin/contact-berichten" className="contact-page-link">
                    Actieve berichten
                </Link>
            </div>

            <ContactSearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Zoek in het archief"
            />

            {loading && <p>Archief laden...</p>}
            {error && <p className="form-error">{error}</p>}

            {!loading && !error && (
                <ContactMessagesTable messages={filteredMessages} archived />
            )}
        </div>
    );
}

export default ArchivedContactMessagesPage;