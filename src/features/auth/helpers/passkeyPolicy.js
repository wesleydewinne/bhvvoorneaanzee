const PASSKEY_REQUIRED_ROLES = new Set([
    "ROLE_ADMIN",
    "ROLE_FINANCE",
    "ROLE_TRAINING_MANAGER",
    "ROLE_TRAINER",
    "ROLE_SAFETY_MANAGER",
    "ROLE_BBMI_TECHNICIAN",
    "ROLE_TEAM_LEADER",
]);

export function getAuthRoles(user) {
    const normalize = (item) => {
        if (!item) return null;
        if (typeof item === "string") return item;
        return item.name || item.role || item.authority || null;
    };

    const roles = Array.isArray(user?.roles) ? user.roles.map(normalize) : [];
    const globalRoles = Array.isArray(user?.globalRoles)
        ? user.globalRoles.map(normalize)
        : [];
    const authorities = Array.isArray(user?.authorities)
        ? user.authorities.map(normalize)
        : [];

    return [...roles, ...globalRoles, ...authorities].filter(Boolean);
}

export function requiresPasskeyForUser(user) {
    return getAuthRoles(user).some((role) => PASSKEY_REQUIRED_ROLES.has(role));
}

export function getPostLoginPath(user) {
    return requiresPasskeyForUser(user) ? "/account/passkey-aanmaken" : "/dashboard";
}
