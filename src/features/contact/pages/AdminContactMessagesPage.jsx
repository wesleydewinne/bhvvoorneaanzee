// src/features/contact/pages/AdminContactMessagesPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Archive, Inbox, Mail, RefreshCw, Search } from "lucide-react";
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

    const loadMessages = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await contactService.getAllMessages(false);
            setMessages(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Fout bij ophalen contactberichten:", err);
            setError("Het ophalen van de contactberichten is mislukt.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const filteredMessages = useMemo(() => {
        return filterMessages(messages, searchTerm);
    }, [messages, searchTerm]);

    return (
        <section className="contact-admin-page dashboard-admin-page">
            <section className="dashboard-admin-hero" aria-labelledby="contact-title">
                <div>
                    <p className="dashboard__eyebrow">Inbox</p>
                    <h1 id="contact-title">Contactberichten</h1>
                    <p>Bekijk actieve berichten, zoek op afzender of onderwerp en open het archief.</p>
                </div>

                <div className="dashboard-admin-hero__actions">
                    <button
                        type="button"
                        className="dashboard-admin-button dashboard-admin-button--secondary"
                        onClick={loadMessages}
                        disabled={loading}
                    >
                        <RefreshCw aria-hidden="true" />
                        Berichten ophalen
                    </button>
                    <Link to="/admin/contact-berichten/archief" className="dashboard-admin-button">
                        <Archive aria-hidden="true" />
                        Archief bekijken
                    </Link>
                </div>
            </section>

            <section className="dashboard-admin-stats" aria-label="Contact statistieken">
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon">
                        <Inbox aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : messages.length}</strong>
                    <span>Actieve berichten</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--green">
                        <Search aria-hidden="true" />
                    </span>
                    <strong>{loading ? "..." : filteredMessages.length}</strong>
                    <span>Zichtbaar na filter</span>
                </article>
                <article className="dashboard-admin-stat">
                    <span className="dashboard-admin-stat__icon dashboard-admin-stat__icon--orange">
                        <Mail aria-hidden="true" />
                    </span>
                    <strong>Nieuw</strong>
                    <span>Opvolging nodig</span>
                </article>
            </section>

            <section className="dashboard-admin-panel" aria-label="Contactberichten overzicht">
                <div className="dashboard-admin-panel__header">
                    <div>
                        <h2>Alle actieve berichten</h2>
                        <p>Zoek, open en handel berichten af.</p>
                    </div>
                    <span>{filteredMessages.length} resultaten</span>
                </div>

                <div className="dashboard-admin-search">
                    <ContactSearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                </div>

                {loading && <p className="dashboard__state">Contactberichten laden...</p>}
                {error && <p className="form-error">{error}</p>}

                {!loading && !error && (
                    <ContactMessagesTable messages={filteredMessages} archived={false} />
                )}
            </section>
        </section>
    );
}

export default AdminContactMessagesPage;
