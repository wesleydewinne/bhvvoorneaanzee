// src/features/contact/components/ContactMessageStatusBadge.jsx
import { getStatusLabel } from "../helpers/contactHelpers.js";

function ContactMessageStatusBadge({ status }) {
    const badgeClass = `contact-status-badge contact-status-badge--${status?.toLowerCase()}`;

    return (
        <span className={badgeClass}>
            {getStatusLabel(status)}
        </span>
    );
}

export default ContactMessageStatusBadge;