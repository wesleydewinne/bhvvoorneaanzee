export function createEmptyLocationForm() {
    return {
        locationName: "",
        address: "",
        postalCode: "",
        city: "",
        phone: "",
        email: "",
        description: "",
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
    };
}

export function filterLocations(locations, searchTerm) {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return locations;

    return locations.filter((location) => {
        return [
            String(location.id ?? ""),
            location.locationName,
            location.address,
            location.postalCode,
            location.city,
            location.phone,
            location.email,
            location.description,
        ]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(term));
    });
}
