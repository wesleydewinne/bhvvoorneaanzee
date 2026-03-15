// src/features/contact/pages/ContactMessageDetailPage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import contactService from "@/features/contact/services/contactService.js";
import ContactMessageStatusBadge from "../components/ContactMessageStatusBadge.jsx";
import ContactStatusActions from "../components/ContactStatusActions.jsx";
import { formatDateTime } from "../helpers/contactHelpers.js";
import "../styles/Contact.css";

function ContactMessageDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const loadMessage = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await contactService.getMessageById(id);
                setMessage(data);
            } catch (err) {
                console.error("Fout bij ophalen contactbericht:", err);
                setError("Het contactbericht kon niet worden geladen.");
            } finally {
                setLoading(false);
            }
        };

        loadMessage();
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        try {
            setStatusLoading(true);
            setError("");
            setSuccessMessage("");

            const updatedMessage = await contactService.updateMessageStatus(id, newStatus);
            setMessage(updatedMessage);
            setSuccessMessage("Status succesvol bijgewerkt.");
        } catch (err) {
            console.error("Fout bij updaten status:", err);
            setError("Het aanpassen van de status is mislukt.");
        } finally {
            setStatusLoading(false);
        }
    };

    if (loading) {
        return <div className="contact-admin-page"><p>Contactbericht laden...</p></div>;
    }

    if (error && !message) {
        return (
            <div className="contact-admin-page">
                <p className="form-error">{error}</p>
                <button type="button" onClick={() => navigate(-1)} className="contact-secondary-button">
                    Terug
                </button>
            </div>
        );
    }

    return (
        <div className="contact-admin-page">
            <div className="contact-detail-header">
                <div>
                    <h1>Contactbericht #{message.id}</h1>
                    <p>Bekijk de details en pas de status aan.</p>
                </div>

                <div className="contact-detail-links">
                    <Link to="/admin/contact-berichten" className="contact-page-link">
                        Actieve berichten
                    </Link>
                    <Link to="/admin/contact-berichten/archief" className="contact-page-link">
                        Archief
                    </Link>
                </div>
            </div>

            {error && <p className="form-error">{error}</p>}
            {successMessage && <p className="form-success">{successMessage}</p>}

            <div className="contact-detail-card">
                <div className="contact-detail-row">
                    <strong>Status</strong>
                    <ContactMessageStatusBadge status={message.status} />
                </div>

                <div className="contact-detail-row">
                    <strong>Naam</strong>
                    <span>{message.naam}</span>
                </div>

                <div className="contact-detail-row">
                    <strong>E-mailadres</strong>
                    <span>{message.email}</span>
                </div>

                <div className="contact-detail-row">
                    <strong>Ontvangen op</strong>
                    <span>{formatDateTime(message.createdAt)}</span>
                </div>

                <div className="contact-detail-row">
                    <strong>Laatst bijgewerkt</strong>
                    <span>{formatDateTime(message.updatedAt)}</span>
                </div>

                <div className="contact-detail-row">
                    <strong>Afgerond op</strong>
                    <span>{formatDateTime(message.archivedAt)}</span>
                </div>

                <div className="contact-detail-message">
                    <strong>Bericht</strong>
                    <p>{message.bericht}</p>
                </div>

                <div className="contact-detail-actions">
                    <h2>Status aanpassen</h2>

                    <ContactStatusActions
                        currentStatus={message.status}
                        loading={statusLoading}
                        onChangeStatus={handleStatusChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default ContactMessageDetailPage;