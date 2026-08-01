const ADMIN = "ROLE_ADMIN";

export const dashboardNavigation = [
    {
        key: "planning",
        label: "Planning",
        icon: "calendar",
        roles: [ADMIN, "ROLE_TRAINING_MANAGER", "ROLE_TRAINER", "ROLE_SAFETY_MANAGER", "ROLE_TEAM_LEADER"],
        items: [
            { key: "trainings", label: "Trainingen", to: "/admin/trainingen", icon: "trainings" },
            { key: "evaluations", label: "Evaluaties", to: "/admin/evaluations", icon: "evaluations" },
        ],
    },
    {
        key: "relations",
        label: "Relaties",
        icon: "users",
        roles: [ADMIN, "ROLE_TRAINING_MANAGER", "ROLE_SAFETY_MANAGER", "ROLE_LOCATION_MANAGER", "ROLE_BUILDING_OWNER"],
        items: [
            { key: "companies", label: "Bedrijven", to: "/admin/companies", icon: "companies" },
            { key: "locations", label: "Locaties", to: "/admin/locations", icon: "locations" },
            { key: "users", label: "Gebruikers", to: "/admin/users", icon: "users", roles: [ADMIN] },
        ],
    },
    {
        key: "administration",
        label: "Administratie",
        icon: "receipt",
        roles: [ADMIN, "ROLE_FINANCE"],
        items: [
            { key: "quotes", label: "Offertes", to: "/admin/offertes", icon: "quotes" },
            { key: "invoices", label: "Facturen", to: "/admin/invoices", icon: "invoices" },
            { key: "contact", label: "Contact", to: "/admin/contact-berichten", icon: "contact", roles: [ADMIN] },
            { key: "reviews", label: "Reviews", to: "/admin/reviews", icon: "reviews", roles: [ADMIN] },
        ],
    },
    {
        key: "account",
        label: "Account",
        icon: "settings",
        items: [
            { key: "profile", label: "Mijn profiel", to: "/profile", icon: "profile" },
            { key: "security", label: "Beveiliging", to: "/account/beveiliging/2fa", icon: "security" },
        ],
    },
];

export function getVisibleDashboardNavigation(roles) {
    return dashboardNavigation
        .filter((group) => hasAccess(group.roles, roles))
        .map((group) => ({
            ...group,
            items: group.items.filter((item) => hasAccess(item.roles, roles)),
        }))
        .filter((group) => group.items.length > 0);
}

function hasAccess(requiredRoles, roles) {
    return !requiredRoles?.length || requiredRoles.some((role) => roles.includes(role));
}
