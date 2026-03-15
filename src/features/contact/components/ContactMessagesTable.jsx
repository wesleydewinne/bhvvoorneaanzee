// src/features/contact/components/ContactMessagesTable.jsx
import { Link } from "react-router-dom";
import ContactMessageStatusBadge from "./ContactMessageStatusBadge.jsx";
import { formatDateTime } from "../helpers/contactHelpers.js";

function ContactMessagesTable({ messages, archived = false }) {
    if (!messages.length) {
        return (
            <div className="contact-empty-state">
                <p>Geen berichten gevonden.</p>
            </div>
        );
    }

    return (
        <div className="contact-table-wrapper">
            <table className="contact-table">
                <thead>
                <tr>
                    <th>Naam</th>
                    <th>E-mailadres</th>
                    <th>Status</th>
                    <th>Ontvangen op</th>
                    {archived && <th>Afgerond op</th>}
                    <th>Acties</th>
                </tr>
                </thead>

                <tbody>
                {messages.map((message) => (
                    <tr key={message.id}>
                        <td>{message.naam}</td>
                        <td>{message.email}</td>
                        <td>
                            <ContactMessageStatusBadge status={message.status} />
                        </td>
                        <td>{formatDateTime(message.createdAt)}</td>
                        {archived && <td>{formatDateTime(message.archivedAt)}</td>}
                        <td>
                            <Link
                                to={`/admin/contact-berichten/${message.id}`}
                                className="contact-table-link"
                            >
                                Bekijken
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ContactMessagesTable;