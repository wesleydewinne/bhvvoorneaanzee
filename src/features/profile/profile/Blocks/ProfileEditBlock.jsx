import { useState } from "react";
import profileService from "@/features/profile/services/profileService.js";

export default function ProfileEditBlock({ profile }) {
    const [formData, setFormData] = useState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await profileService.updateProfile(formData);
        alert("Profiel bijgewerkt");
    };

    return (
        <div className="profile-card">
            <h3>Gegevens wijzigen</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <button type="submit">Opslaan</button>
            </form>
        </div>
    );
}
