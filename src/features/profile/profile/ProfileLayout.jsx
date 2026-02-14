import ProfileHeader from "./ProfileHeader.jsx";
import ProfileEditBlock from "./Blocks/ProfileEditBlock.jsx";
import CertificateBlock from "./Blocks/CertificateBlock.jsx";
import ElearningBlock from "./Blocks/ElearningBlock.jsx";
import AdminBlock from "./Blocks/AdminBlock.jsx";

export default function ProfileLayout({ profile }) {
    return (
        <div className="profile-container">
            <ProfileHeader profile={profile} />

            <div className="profile-grid">

                {profile.permissions?.includes("PROFILE_EDIT") && (
                    <ProfileEditBlock profile={profile} />
                )}

                {profile.permissions?.includes("VIEW_CERTIFICATES") && (
                    <CertificateBlock certificates={profile.certificates || []} />
                )}

                {profile.permissions?.includes("VIEW_ELEARNING") && (
                    <ElearningBlock elearnings={profile.elearnings || []} />
                )}

                {profile.permissions?.includes("ADMIN_PANEL") && (
                    <AdminBlock />
                )}

            </div>
        </div>
    );
}
