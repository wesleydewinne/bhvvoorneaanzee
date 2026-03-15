import { formatRoleLabel } from "../helpers/userFormatters.js";

export default function UserRoleBadge({ role }) {
    return <span className="um-badge um-badge--role">{formatRoleLabel(role)}</span>;
}