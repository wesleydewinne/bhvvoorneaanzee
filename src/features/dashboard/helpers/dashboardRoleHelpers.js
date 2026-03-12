export function getNormalizedRoles(user) {
    const normalize = (item) => {
        if (!item) return null;
        if (typeof item === "string") return item;
        return item.name || item.role || item.authority || null;
    };

    const fromRoles = Array.isArray(user?.roles) ? user.roles.map(normalize) : [];
    const fromGlobalRoles = Array.isArray(user?.globalRoles)
        ? user.globalRoles.map(normalize)
        : [];
    const fromAuthorities = Array.isArray(user?.authorities)
        ? user.authorities.map(normalize)
        : [];

    return [...fromRoles, ...fromGlobalRoles, ...fromAuthorities].filter(Boolean);
}

export function hasRole(roles, role) {
    return roles.includes(role);
}