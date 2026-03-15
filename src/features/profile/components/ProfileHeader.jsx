function getInitials(firstName, lastName) {
    const first = firstName?.trim()?.charAt(0) ?? "";
    const last = lastName?.trim()?.charAt(0) ?? "";
    return `${first}${last}`.toUpperCase() || "?";
}

export default function ProfileHeader({ profile }) {
    const initials = getInitials(profile.firstName, profile.lastName);

    return (
        <header className="profile-header">
            <div className="profile-header__avatar">
                {profile.profileImageUrl ? (
                    <img
                        src={profile.profileImageUrl}
                        alt={`${profile.fullName || "Gebruiker"} profielfoto`}
                        className="profile-header__avatar-image"
                    />
                ) : (
                    <div className="profile-header__avatar-fallback">
                        {initials}
                    </div>
                )}
            </div>

            <div className="profile-header__content">
                <h1>Mijn profiel</h1>
                <p className="profile-header__name">{profile.fullName || "-"}</p>
                <p className="profile-header__email">{profile.email || "-"}</p>

                {Array.isArray(profile.globalRoles) && profile.globalRoles.length > 0 && (
                    <div className="profile-header__roles">
                        {profile.globalRoles.map((role) => (
                            <span key={role} className="profile-role-badge">
                                {formatRoleLabel(role)}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}

function formatRoleLabel(role) {
    return String(role)
        .replace("ROLE_", "")
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/^\w/, (char) => char.toUpperCase());
}