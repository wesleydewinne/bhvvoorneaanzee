import ProfileHeader from "./ProfileHeader.jsx";
import ProfileDetailsCard from "./blocks/ProfileDetailsCard.jsx";
import ChangePasswordCard from "./blocks/ChangePasswordCard.jsx";
import CertificateBlock from "./blocks/CertificateBlock.jsx";
import ElearningBlock from "./blocks/ElearningBlock.jsx";
import AdminBlock from "./blocks/AdminBlock.jsx";
import { canViewAdminBlock } from "../helpers/profileGuards.js";

export default function ProfileLayout({ profile, onProfileUpdated }) {
    return (
        <div className="profile-container">
            <ProfileHeader profile={profile} />

            <div className="profile-content">
                <div className="profile-main-column">
                    <ProfileDetailsCard
                        profile={profile}
                        onProfileUpdated={onProfileUpdated}
                    />
                </div>

                <aside className="profile-side-column">
                    <ChangePasswordCard />
                    <CertificateBlock certificates={profile.certificates} />
                    <ElearningBlock elearnings={profile.elearnings} />
                    {canViewAdminBlock(profile) && <AdminBlock />}
                </aside>
            </div>
        </div>
    );
}