import ProfileHeader from "./ProfileHeader.jsx";
import ProfileDetailsCard from "./blocks/ProfileDetailsCard.jsx";
import ProfilePhotoCard from "./blocks/ProfilePhotoCard.jsx";
import ChangePasswordCard from "./blocks/ChangePasswordCard.jsx";
import CertificateBlock from "./blocks/CertificateBlock.jsx";
import ElearningBlock from "./blocks/ElearningBlock.jsx";
import AdminBlock from "./blocks/AdminBlock.jsx";
import { canViewAdminBlock } from "../helpers/profileGuards.js";

export default function ProfileLayout({
    profile,
    profilePhotoUrl = "",
    onProfileUpdated,
    onPhotoUploaded,
}) {
    return (
        <div className="profile-container">
            <ProfileHeader profile={profile} profilePhotoUrl={profilePhotoUrl} />

            <div className="profile-content">
                <div className="profile-main-column">
                    <ProfileDetailsCard
                        profile={profile}
                        onProfileUpdated={onProfileUpdated}
                    />
                </div>

                <aside className="profile-side-column">
                    <ProfilePhotoCard
                        profile={profile}
                        profilePhotoUrl={profilePhotoUrl}
                        onPhotoUploaded={onPhotoUploaded}
                    />
                    <ChangePasswordCard />
                    <CertificateBlock certificates={profile.certificates} />
                    <ElearningBlock elearnings={profile.elearnings} />
                    {canViewAdminBlock(profile) && <AdminBlock />}
                </aside>
            </div>
        </div>
    );
}
