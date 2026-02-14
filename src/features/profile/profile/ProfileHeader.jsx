export default function ProfileHeader({ profile }) {
    return (
        <div className="profile-header">
            <h1>Mijn profiel</h1>
            <p>
                {profile.firstName} {profile.lastName}
            </p>
            <p className="profile-email">{profile.email}</p>
        </div>
    );
}
