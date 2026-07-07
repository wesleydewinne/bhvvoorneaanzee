export function createEmptyLocationForm() {
    return {
        locationName: "",
        address: "",
        postalCode: "",
        city: "",
        phone: "",
        email: "",
        description: "",
        companyIds: [],
    };
}

export function mapLocationToForm(location) {
    return {
        locationName: location?.locationName ?? "",
        address: location?.address ?? "",
        postalCode: location?.postalCode ?? "",
        city: location?.city ?? "",
        phone: location?.phone ?? "",
        email: location?.email ?? "",
        description: location?.description ?? "",
        companyIds: Array.isArray(location?.companies)
            ? location.companies.map((company) => String(company.id))
            : [],
    };
}

export function formatLocationCompanies(location) {
    if (!Array.isArray(location?.companies) || location.companies.length === 0) {
        return "-";
    }

    return location.companies
        .map((company) => company.name)
        .filter(Boolean)
        .join(", ");
}

export function filterLocations(locations, searchTerm) {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return locations;

    return locations.filter((location) => {
        const companiesText = Array.isArray(location.companies)
            ? location.companies.map((company) => company.name).join(" ")
            : "";

        return [
            String(location.id ?? ""),
            location.locationName,
            location.address,
            location.postalCode,
            location.city,
            location.phone,
            location.email,
            location.description,
            companiesText,
        ]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(term));
    });
}