export function hasRole(profile, role) {
    if (!profile || !Array.isArray(profile.globalRoles)) {
        return false;
    }

    return profile.globalRoles.includes(role);
}

export function isAdmin(profile) {
    return hasRole(profile, "ROLE_ADMIN");
}

export function isTrainingManager(profile) {
    return hasRole(profile, "ROLE_TRAINING_MANAGER");
}

export function canViewAdminBlock(profile) {
    return isAdmin(profile) || isTrainingManager(profile);
}

export function hasCertificates(profile) {
    return Array.isArray(profile?.certificates) && profile.certificates.length > 0;
}

export function hasElearnings(profile) {
    return Array.isArray(profile?.elearnings) && profile.elearnings.length > 0;
}