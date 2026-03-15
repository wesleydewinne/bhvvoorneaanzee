export function getFullName(user) {
    const first = (user?.firstName ?? user?.firstname ?? "").trim();
    const last = (user?.lastName ?? user?.lastname ?? "").trim();
    const fullName = `${first} ${last}`.trim();

    return fullName || "-";
}

export function formatRoleLabel(role) {
    return String(role)
        .replace("ROLE_", "")
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getRolesArray(user) {
    const roles = user?.globalRoles ?? user?.roles ?? [];
    return Array.isArray(roles) ? roles : [];
}

export function getRolesLabel(user) {
    const roles = getRolesArray(user);

    if (roles.length === 0) {
        return "-";
    }

    return roles.map(formatRoleLabel).join(", ");
}

export function getPrimaryRoleLabel(user) {
    const roles = getRolesArray(user);

    if (roles.length === 0) {
        return "-";
    }

    return formatRoleLabel(roles[0]);
}

export function isUserDisabled(user) {
    if (user?.status) {
        return String(user.status).toUpperCase() === "DISABLED";
    }

    if (typeof user?.enabled === "boolean") {
        return user.enabled === false;
    }

    return false;
}

export function getStatusLabel(user) {
    if (user?.status) {
        return String(user.status).toUpperCase();
    }

    if (typeof user?.enabled === "boolean") {
        return user.enabled ? "ACTIVE" : "DISABLED";
    }

    return "UNKNOWN";
}

export function formatStatusLabel(status) {
    return String(status).toUpperCase();
}