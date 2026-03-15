export function mapProfileResponseToViewModel(data) {
    const firstName = data?.firstName ?? "";
    const lastName = data?.lastName ?? "";
    const globalRoles = Array.isArray(data?.globalRoles) ? data.globalRoles : [];

    return {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim(),
        email: data?.email ?? "",
        phoneNumber: data?.phoneNumber ?? "",
        profileImageUrl: data?.profileImageUrl ?? "",
        dateOfBirth: data?.dateOfBirth ?? "",
        companyName: data?.companyName ?? "",
        functionTitle: data?.functionTitle ?? "",
        nibhvNummer: data?.nibhvNummer ?? "",
        oranjeKruisNummer: data?.oranjeKruisNummer ?? "",
        globalRoles,

        // Voorbereid op toekomstige backend-uitbreiding
        certificates: Array.isArray(data?.certificates) ? data.certificates : [],
        elearnings: Array.isArray(data?.elearnings) ? data.elearnings : [],
    };
}