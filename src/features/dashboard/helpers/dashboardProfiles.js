export const DASHBOARD_PROFILE_TYPES = {
    ADMIN: "admin",
    CURSIST: "cursist",
    TRAINER: "trainer",
    OFFICE: "office",
    TRAINING_MANAGER: "training-manager",
    SAFETY_MANAGER: "safety-manager",
    FINANCE: "finance",
    BUILDING_OWNER: "building-owner",
    LOCATION_MANAGER: "location-manager",
    TECHNICIAN: "technician",
    TEAM_LEADER: "team-leader",
    DEFAULT: "default",
};

export const ROLE_LABELS = {
    ROLE_ADMIN: "Beheerder",
    ROLE_FINANCE: "Finance",
    ROLE_TRAINING_MANAGER: "Training manager",
    ROLE_SAFETY_MANAGER: "Safety manager",
    ROLE_TRAINER: "Trainer",
    ROLE_BBMI_TECHNICIAN: "BBMI technicus",
    ROLE_BUILDING_OWNER: "Gebouweigenaar",
    ROLE_LOCATION_MANAGER: "Locatiemanager",
    ROLE_TEAM_LEADER: "Teamleider",
    ROLE_STUDENT: "Cursist",
};

const DASHBOARD_PROFILES = [
    {
        key: "admin",
        type: DASHBOARD_PROFILE_TYPES.ADMIN,
        roles: ["ROLE_ADMIN"],
    },
    {
        key: "finance",
        type: DASHBOARD_PROFILE_TYPES.FINANCE,
        roles: ["ROLE_FINANCE"],
    },
    {
        key: "training-manager",
        type: DASHBOARD_PROFILE_TYPES.TRAINING_MANAGER,
        roles: ["ROLE_TRAINING_MANAGER"],
    },
    {
        key: "trainer",
        type: DASHBOARD_PROFILE_TYPES.TRAINER,
        roles: ["ROLE_TRAINER"],
    },
    {
        key: "safety-manager",
        type: DASHBOARD_PROFILE_TYPES.SAFETY_MANAGER,
        roles: ["ROLE_SAFETY_MANAGER"],
    },
    {
        key: "bbmi-technician",
        type: DASHBOARD_PROFILE_TYPES.TECHNICIAN,
        roles: ["ROLE_BBMI_TECHNICIAN"],
    },
    {
        key: "building-owner",
        type: DASHBOARD_PROFILE_TYPES.BUILDING_OWNER,
        roles: ["ROLE_BUILDING_OWNER"],
    },
    {
        key: "location-manager",
        type: DASHBOARD_PROFILE_TYPES.LOCATION_MANAGER,
        roles: ["ROLE_LOCATION_MANAGER"],
    },
    {
        key: "team-leader",
        type: DASHBOARD_PROFILE_TYPES.TEAM_LEADER,
        roles: ["ROLE_TEAM_LEADER"],
    },
    {
        key: "cursist",
        type: DASHBOARD_PROFILE_TYPES.CURSIST,
        roles: ["ROLE_STUDENT"],
    },
];

export function resolveDashboardProfile(roles) {
    return DASHBOARD_PROFILES.find((profile) =>
        profile.roles.some((role) => roles.includes(role))
    ) ?? {
        key: "default",
        type: DASHBOARD_PROFILE_TYPES.DEFAULT,
        roles: [],
    };
}

export function getRoleLabels(roles) {
    return roles.map((role) => ROLE_LABELS[role] ?? formatRoleLabel(role));
}

export function formatRoleLabel(role) {
    return String(role)
        .replace(/^ROLE_/, "")
        .toLowerCase()
        .split("_")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}
