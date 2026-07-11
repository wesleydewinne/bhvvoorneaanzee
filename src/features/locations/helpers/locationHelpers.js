export function createEmptyLocationForm() {
    return {
        locationName: "",
        address: "",
        postalCode: "",
        city: "",
        phone: "",
        email: "",
        locationImageUrl: "",
        description: "",
        numberOfBuildings: "",
        locationFloorCount: "",
        buildingFloorCount: "",
        parkingInfo: "",
        locationImageFile: null,
        additionalInfo: [],
        companyLocations: [],
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
        locationImageUrl: location?.locationImageUrl ?? "",
        description: location?.description ?? "",
        numberOfBuildings: location?.numberOfBuildings ?? "",
        locationFloorCount: location?.locationFloorCount ?? "",
        buildingFloorCount: location?.buildingFloorCount ?? "",
        parkingInfo: location?.parkingInfo ?? "",
        locationImageFile: null,
        additionalInfo: Array.isArray(location?.additionalInfo)
            ? location.additionalInfo.map(({ id, ...info }) => ({ ...info, _id: id }))
            : [],
        companyLocations: Array.isArray(location?.companyLocations)
            ? location.companyLocations.map(({ id, company, ...relation }) => ({
                ...relation,
                _id: id,
                companyId: String(company?.id ?? relation.companyId ?? ""),
                primaryLocation: Boolean(relation.primaryLocation),
                active: relation.active !== false,
            }))
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
