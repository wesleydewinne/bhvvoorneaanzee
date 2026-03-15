import { formatStatusLabel } from "../helpers/userFormatters.js";

export default function UserStatusBadge({ status }) {
    const normalized = String(status || "UNKNOWN").toUpperCase();

    return (
        <span className={`um-badge um-badge--status um-badge--${normalized.toLowerCase()}`}>
            {formatStatusLabel(normalized)}
        </span>
    );
}