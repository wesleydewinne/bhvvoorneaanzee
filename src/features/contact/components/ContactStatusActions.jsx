// src/features/contact/components/ContactStatusActions.jsx
import { STATUS_OPTIONS } from "../helpers/contactHelpers.js";

function ContactStatusActions({ currentStatus, loading, onChangeStatus }) {
    return (
        <div className="contact-status-actions">
            {STATUS_OPTIONS.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={option.value === currentStatus ? "is-active" : ""}
                    onClick={() => onChangeStatus(option.value)}
                    disabled={loading || option.value === currentStatus}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export default ContactStatusActions;