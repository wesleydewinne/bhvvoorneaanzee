import { BadgeCheck, Clock3, Mail, ShieldCheck, UserRound } from "lucide-react";

function getInitials(firstName, lastName) {
    const first = firstName?.trim()?.charAt(0) ?? "";
    const last = lastName?.trim()?.charAt(0) ?? "";
    return `${first}${last}`.toUpperCase() || "?";
}

export default function ProfileHeader({ profile, profilePhotoUrl = "" }) {
    const initials = getInitials(profile.firstName, profile.lastName);
    const photoSrc = profilePhotoUrl || profile.profileImageUrl;
    const primaryRole = Array.isArray(profile.globalRoles) && profile.globalRoles.length > 0
        ? formatRoleLabel(profile.globalRoles[0])
        : "Gebruiker";

    return (
        <header className="profile-header">
            <div className="profile-header__avatar">
                {photoSrc ? (
                    <img
                        src={photoSrc}
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
                <p className="dashboard__eyebrow">Account</p>
                <h1>Mijn profiel</h1>
                <p className="profile-header__name">{profile.fullName || "-"}</p>
                <p className="profile-header__email">
                    <Mail aria-hidden="true" />
                    {profile.email || "-"}
                </p>

                {Array.isArray(profile.globalRoles) && profile.globalRoles.length > 0 && (
                    <div className="profile-header__roles">
                        {profile.globalRoles.map((role) => (
                            <span key={role} className="profile-role-badge">
                                <ShieldCheck aria-hidden="true" />
                                {formatRoleLabel(role)}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="profile-header__stats" aria-label="Profiel samenvatting">
                <article className="profile-mini-stat">
                    <span className="profile-mini-stat__icon">
                        <UserRound aria-hidden="true" />
                    </span>
                    <strong>{primaryRole}</strong>
                    <span>Rol</span>
                </article>
                <article className="profile-mini-stat">
                    <span className="profile-mini-stat__icon profile-mini-stat__icon--green">
                        <BadgeCheck aria-hidden="true" />
                    </span>
                    <strong>{profile.twoFactorEnabled ? "Actief" : "Uit"}</strong>
                    <span>2FA</span>
                </article>
                <article className="profile-mini-stat">
                    <span className="profile-mini-stat__icon profile-mini-stat__icon--orange">
                        <Clock3 aria-hidden="true" />
                    </span>
                    <strong>{formatDate(profile.lastLogin)}</strong>
                    <span>Laatste login</span>
                </article>
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

function formatDate(value) {
    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return String(value);
    }

    return date.toLocaleDateString("nl-NL");
}
