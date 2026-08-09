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
    if (typeof user?.requiresPasskeySetup === "boolean") {
        return user.requiresPasskeySetup;
    }
    // Alleen de backend bepaalt of passkey-onboarding verplicht is. Een
    // ontbrekend veld mag gebruikers niet opsluiten in de registratieroute.
    return false;
}

export function getPostLoginPath(user) {
    return getRequiredSecurityPath(user) || "/dashboard";
}

export function getRequiredSecurityPath(user) {
    switch (user?.securityOnboardingAction) {
        case "PASSKEY_SETUP":
            return "/account/passkey-aanmaken";
        case "PASSWORD_CHANGE":
            return "/account/wachtwoord-wijzigen";
        case "READY":
            return null;
        default:
            if (requiresPasskeyForUser(user)) return "/account/passkey-aanmaken";
            if (user?.mustChangePassword) return "/account/wachtwoord-wijzigen";
            return null;
    }
}
