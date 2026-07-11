export function createEmptyCompanyForm() {
    return {
        name: "",
        logoFile: null,
    };
}

export function mapCompanyToForm(company) {
    return {
        name: company?.name ?? "",
        logoFile: null,
    };
}

export function filterCompanies(companies, searchTerm) {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return companies;

    return companies.filter((company) => {
        return [
            String(company.id ?? ""),
            company.name,
        ]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(term));
    });
}

export function getBackendMessage(err, fallbackMessage) {
    return (
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        (typeof err?.response?.data === "string" ? err.response.data : null) ||
        err?.message ||
        fallbackMessage
    );
}
