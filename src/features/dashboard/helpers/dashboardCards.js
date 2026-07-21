import { DASHBOARD_PROFILE_TYPES } from "./dashboardProfiles.js";

export function getDashboardCards({ dashboardProfile, user, navigate }) {
    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.ADMIN) {
        return [
            {
                key: "trainings",
                iconKey: "calendar",
                tone: "primary",
                label: "Planning",
                title: "Trainingen",
                description:
                    "Beheer trainingen, bekijk details, deelnemers, planning en status.",
                meta: [
                    "Overzicht van trainingen",
                    "Beheer planning, locaties en deelnemers",
                ],
                actionLabel: "Open trainingen",
                action: () => navigate("/admin/trainingen"),
            },
            {
                key: "companies",
                iconKey: "briefcase-business",
                tone: "blue",
                label: "Relaties",
                title: "Bedrijven",
                description:
                    "Beheer bedrijven die gekoppeld kunnen worden aan locaties en trainingen.",
                meta: [
                    "Bedrijven aanmaken en beheren",
                    "Te koppelen aan trainingslocaties",
                ],
                actionLabel: "Open bedrijven",
                action: () => navigate("/admin/companies"),
            },
            {
                key: "locations",
                iconKey: "map-pin",
                tone: "green",
                label: "Locaties",
                title: "Locaties",
                description:
                    "Beheer locaties en koppel beschikbare bedrijven aan trainingslocaties.",
                meta: [
                    "Locaties beheren",
                    "Bedrijven koppelen aan locaties",
                ],
                actionLabel: "Open locaties",
                action: () => navigate("/admin/locations"),
            },
            {
                key: "evaluations",
                iconKey: "clipboard-check",
                tone: "purple",
                label: "Kwaliteit",
                title: "Evaluaties",
                description:
                    "Bekijk evaluatieoverzichten, details en reacties per training.",
                meta: ["Overzicht per training", "QR en reacties per evaluatie"],
                actionLabel: "Open evaluaties",
                action: () => navigate("/admin/evaluations"),
            },
            {
                key: "contact",
                iconKey: "inbox",
                tone: "orange",
                label: "Inbox",
                title: "Contact",
                description:
                    "Bekijk berichten van het contactformulier en handel ze af.",
                meta: ["Nieuw / in behandeling / afgerond", "Contactberichten beheren"],
                actionLabel: "Open contactberichten",
                action: () => navigate("/admin/contact-berichten"),
            },
            {
                key: "quotes",
                iconKey: "file-text",
                tone: "yellow",
                label: "Sales",
                title: "Offertes",
                description:
                    "Bekijk offerteaanvragen en werk ze bij via een duidelijke status.",
                meta: ["Nieuw / in behandeling / afgerond", "Offerteaanvragen beheren"],
                actionLabel: "Open offerteaanvragen",
                action: () => navigate("/admin/offertes"),
            },
            {
                key: "reviews",
                iconKey: "star",
                tone: "green",
                label: "Reputatie",
                title: "Reviews",
                description:
                    "Beheer Google reviews, ververs gegevens en controleer zichtbaarheid.",
                meta: ["Google reviews verversen", "Reviews beheren"],
                actionLabel: "Open reviews",
                action: () => navigate("/admin/reviews"),
            },
            {
                key: "users",
                iconKey: "users",
                tone: "blue",
                label: "Accounts",
                title: "Gebruikers",
                description:
                    "Beheer gebruikersaccounts en bekijk gebruikersgegevens.",
                meta: ["Accounts beheren", "Detailpagina per gebruiker"],
                actionLabel: "Open gebruikers",
                action: () => navigate("/admin/users"),
            },
            {
                key: "invoices",
                iconKey: "receipt",
                tone: "neutral",
                label: "Finance",
                title: "Facturen",
                description:
                    "Upload facturen, zoek een factuur op ID en download PDF-bestanden.",
                meta: ["Uploaden", "Status en PDF opvragen"],
                actionLabel: "Open facturen",
                action: () => navigate("/admin/invoices"),
            },
            {
                key: "profile",
                tone: "neutral",
                label: "Account",
                title: "Profiel",
                description:
                    "Bekijk jouw accountgegevens en persoonlijke informatie.",
                meta: [user?.email ?? "Geen e-mail bekend"],
                actionLabel: "Open profiel",
                action: () => navigate("/profile"),
            },
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.CURSIST) {
        return [
            {
                key: "my-trainings",
                iconKey: "graduation-cap",
                tone: "primary",
                label: "Trainingen",
                title: "Mijn trainingen",
                description:
                    "Bekijk straks je geplande trainingen, aanwezigheid en status op een vaste plek.",
                meta: ["Gekoppeld aan mijn trainingen", "Voor cursisten"],
                actionLabel: "Bekijk profiel",
                action: () => navigate("/profile"),
            },
            {
                key: "certificates",
                iconKey: "award",
                tone: "green",
                label: "Bewijs",
                title: "Certificaten",
                description:
                    "Certificaten en geldigheid kunnen hier later direct zichtbaar worden gemaakt.",
                meta: ["Certificaten volgen later", "Geldigheid per training"],
                actionLabel: "Bekijk profiel",
                action: () => navigate("/profile"),
            },
            {
                key: "elearning",
                iconKey: "book-open",
                tone: "blue",
                label: "Online",
                title: "E-learning",
                description:
                    "Een startpunt voor online modules, voortgang en openstaande onderdelen.",
                meta: ["Modules volgen later", "Voortgang per cursist"],
                actionLabel: "Bekijk profiel",
                action: () => navigate("/profile"),
            },
            {
                key: "profile",
                tone: "neutral",
                label: "Account",
                title: "Profiel",
                description:
                    "Werk je gegevens, wachtwoord en profielfoto bij.",
                meta: [user?.email ?? "Geen e-mail bekend"],
                actionLabel: "Open profiel",
                action: () => navigate("/profile"),
            },
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TRAINER) {
        return [
            {
                key: "trainer-planning",
                iconKey: "calendar",
                tone: "primary",
                label: "Planning",
                title: "Mijn trainingen",
                description:
                    "Bekijk trainingen waar jij als trainer aan gekoppeld bent.",
                meta: ["Trainerplanning", "Deelnemers en locaties volgen"],
                actionLabel: "Open trainingen",
                action: () => navigate("/admin/trainingen"),
            },
            {
                key: "trainer-evaluations",
                iconKey: "clipboard-check",
                tone: "purple",
                label: "Kwaliteit",
                title: "Evaluaties",
                description:
                    "Bekijk evaluaties van trainingen die door jou verzorgd zijn.",
                meta: ["Resultaten per training", "Feedback opvolgen"],
                actionLabel: "Open evaluaties",
                action: () => navigate("/admin/evaluations"),
            },
            createProfileCard(user, navigate),
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.OFFICE) {
        return [
            {
                key: "office-quotes",
                iconKey: "file-text",
                tone: "yellow",
                label: "Sales",
                title: "Offertes",
                description:
                    "Volg offerteaanvragen op en bewaak de status.",
                meta: ["Open aanvragen", "Statusbeheer"],
                actionLabel: "Open offertes",
                action: () => navigate("/admin/offertes"),
            },
            {
                key: "office-contact",
                iconKey: "inbox",
                tone: "orange",
                label: "Inbox",
                title: "Contact",
                description:
                    "Bekijk contactberichten en handel ze af.",
                meta: ["Actieve berichten", "Archief beschikbaar"],
                actionLabel: "Open contactberichten",
                action: () => navigate("/admin/contact-berichten"),
            },
            {
                key: "office-companies",
                iconKey: "briefcase-business",
                tone: "blue",
                label: "Relaties",
                title: "Bedrijven",
                description:
                    "Beheer bedrijven, relaties en gekoppelde locaties.",
                meta: ["Bedrijven beheren", "Relatiebeheer"],
                actionLabel: "Open bedrijven",
                action: () => navigate("/admin/companies"),
            },
            createProfileCard(user, navigate),
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TRAINING_MANAGER) {
        return [
            {
                key: "training-manager-planning",
                iconKey: "calendar",
                tone: "primary",
                label: "Planning",
                title: "Trainingen beheren",
                description:
                    "Bewaak de trainingsplanning, trainers, locaties en openstaande acties.",
                meta: ["Trainingsoverzicht", "Planning en bezetting"],
                actionLabel: "Open trainingen",
                action: () => navigate("/admin/trainingen"),
            },
            {
                key: "training-manager-evaluations",
                iconKey: "clipboard-check",
                tone: "purple",
                label: "Kwaliteit",
                title: "Evaluaties",
                description:
                    "Bekijk resultaten en feedback om kwaliteit van trainingen te volgen.",
                meta: ["Evaluaties per training", "Kwaliteitsopvolging"],
                actionLabel: "Open evaluaties",
                action: () => navigate("/admin/evaluations"),
            },
            {
                key: "training-manager-locations",
                iconKey: "map-pin",
                tone: "green",
                label: "Locaties",
                title: "Trainingslocaties",
                description:
                    "Controleer locaties die nodig zijn voor planning en uitvoering.",
                meta: ["Locatiegegevens", "Bedrijfskoppelingen"],
                actionLabel: "Open locaties",
                action: () => navigate("/admin/locations"),
            },
            createProfileCard(user, navigate),
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.SAFETY_MANAGER) {
        return [
            {
                key: "safety-locations",
                iconKey: "map-pin",
                tone: "green",
                label: "Veiligheid",
                title: "Locaties en risico's",
                description:
                    "Bekijk locaties, veiligheidsacties en aandachtspunten voor opvolging.",
                meta: ["Locatieoverzicht", "Acties en controles"],
                actionLabel: "Open locaties",
                action: () => navigate("/admin/locations"),
            },
            {
                key: "safety-trainingen",
                iconKey: "graduation-cap",
                tone: "primary",
                label: "Trainingen",
                title: "Veiligheidstrainingen",
                description:
                    "Volg trainingen die belangrijk zijn voor veiligheid en naleving.",
                meta: ["Planning", "Deelnemers en status"],
                actionLabel: "Open trainingen",
                action: () => navigate("/admin/trainingen"),
            },
            {
                key: "safety-reports",
                iconKey: "shield-check",
                tone: "orange",
                label: "Rapportage",
                title: "Rapportages",
                description:
                    "Een startpunt voor rapportages en veiligheidschecks zodra de API beschikbaar is.",
                meta: ["API volgt", "Veiligheidsopvolging"],
                actionLabel: "Open profiel",
                action: () => navigate("/profile"),
            },
            createProfileCard(user, navigate),
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.FINANCE) {
        return [
            {
                key: "finance-quotes",
                iconKey: "file-text",
                tone: "yellow",
                label: "Finance",
                title: "Offertes",
                description:
                    "Bekijk offerteaanvragen en financiele opvolging.",
                meta: ["Open aanvragen", "Prijsafspraken"],
                actionLabel: "Open offertes",
                action: () => navigate("/admin/offertes"),
            },
            {
                key: "finance-companies",
                iconKey: "briefcase-business",
                tone: "blue",
                label: "Relaties",
                title: "Bedrijven",
                description:
                    "Bekijk bedrijfsgegevens die nodig zijn voor administratie.",
                meta: ["Bedrijven", "Facturatiegegevens"],
                actionLabel: "Open bedrijven",
                action: () => navigate("/admin/companies"),
            },
            {
                key: "finance-invoices",
                iconKey: "receipt",
                tone: "neutral",
                label: "Facturen",
                title: "Factuurbeheer",
                description:
                    "Upload facturen, controleer status en download PDF-bestanden.",
                meta: ["Factuur-ID zoeken", "PDF downloaden"],
                actionLabel: "Open facturen",
                action: () => navigate("/admin/invoices"),
            },
            createProfileCard(user, navigate),
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.BUILDING_OWNER) {
        return [
            {
                key: "building-locations",
                iconKey: "map-pin",
                tone: "green",
                label: "Gebouw",
                title: "Locaties",
                description:
                    "Bekijk locaties, gebouwinformatie en gekoppelde trainingen.",
                meta: ["Gebouwbeheer", "Locatiegegevens"],
                actionLabel: "Open locaties",
                action: () => navigate("/admin/locations"),
            },
            {
                key: "building-safety",
                iconKey: "shield-check",
                tone: "orange",
                label: "Veiligheid",
                title: "Veiligheidsopvolging",
                description:
                    "Bekijk acties rond veiligheid, ontruiming en rapportages.",
                meta: ["Rapportages volgen", "Acties volgen"],
                actionLabel: "Open profiel",
                action: () => navigate("/profile"),
            },
            createProfileCard(user, navigate),
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.LOCATION_MANAGER) {
        return [
            {
                key: "location-trainings",
                iconKey: "calendar",
                tone: "primary",
                label: "Locatie",
                title: "Trainingen op locatie",
                description:
                    "Bekijk trainingen en planning voor jouw locatie.",
                meta: ["Planning", "Deelnemers volgen"],
                actionLabel: "Open trainingen",
                action: () => navigate("/admin/trainingen"),
            },
            {
                key: "location-details",
                iconKey: "map-pin",
                tone: "green",
                label: "Beheer",
                title: "Locatiegegevens",
                description:
                    "Controleer locatiegegevens en gekoppelde bedrijven.",
                meta: ["Locatiebeheer", "Bedrijfskoppeling"],
                actionLabel: "Open locaties",
                action: () => navigate("/admin/locations"),
            },
            createProfileCard(user, navigate),
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TECHNICIAN) {
        return [
            {
                key: "technician-locations",
                iconKey: "map-pin",
                tone: "green",
                label: "BBMI",
                title: "Technische locaties",
                description:
                    "Bekijk locaties en technische opvolging voor BBMI.",
                meta: ["Technische controle", "Locaties"],
                actionLabel: "Open locaties",
                action: () => navigate("/admin/locations"),
            },
            {
                key: "technician-reports",
                iconKey: "wrench",
                tone: "orange",
                label: "Controle",
                title: "Rapportages",
                description:
                    "Een startpunt voor technische rapportages zodra de API beschikbaar is.",
                meta: ["API volgt", "Technische opvolging"],
                actionLabel: "Open profiel",
                action: () => navigate("/profile"),
            },
            createProfileCard(user, navigate),
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TEAM_LEADER) {
        return [
            {
                key: "team-planning",
                iconKey: "users",
                tone: "primary",
                label: "Team",
                title: "Teamplanning",
                description:
                    "Bekijk trainingen, cursisten en acties voor jouw team.",
                meta: ["Teamoverzicht", "Planning"],
                actionLabel: "Open trainingen",
                action: () => navigate("/admin/trainingen"),
            },
            {
                key: "team-evaluations",
                iconKey: "clipboard-check",
                tone: "purple",
                label: "Kwaliteit",
                title: "Evaluaties",
                description:
                    "Volg resultaten en feedback binnen jouw team.",
                meta: ["Evaluaties", "Opvolging"],
                actionLabel: "Open evaluaties",
                action: () => navigate("/admin/evaluations"),
            },
            createProfileCard(user, navigate),
        ];
    }

    return [
        createProfileCard(user, navigate),
    ];
}

export function getDashboardQuickActions({ dashboardProfile, navigate }) {
    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.ADMIN) {
        return [
            {
                key: "new-training",
                iconKey: "calendar",
                label: "Nieuwe training",
                helper: "Plan direct een training in.",
                action: () => navigate("/admin/trainingen/new"),
            },
            {
                key: "quotes",
                label: "Offertes opvolgen",
                helper: "Bekijk nieuwe aanvragen.",
                action: () => navigate("/admin/offertes"),
            },
            {
                key: "messages",
                label: "Contactberichten",
                helper: "Handel open berichten af.",
                action: () => navigate("/admin/contact-berichten"),
            },
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TRAINER) {
        return [
            {
                key: "trainer-planning",
                iconKey: "calendar",
                label: "Trainingen openen",
                helper: "Bekijk jouw planning en details.",
                action: () => navigate("/admin/trainingen"),
            },
            {
                key: "trainer-profile",
                iconKey: "settings",
                label: "Profiel bijwerken",
                helper: "Controleer je gegevens en foto.",
                action: () => navigate("/profile"),
            },
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.OFFICE) {
        return [
            {
                key: "quotes",
                label: "Offertes opvolgen",
                helper: "Bekijk open aanvragen.",
                action: () => navigate("/admin/offertes"),
            },
            {
                key: "messages",
                label: "Contactberichten",
                helper: "Handel open berichten af.",
                action: () => navigate("/admin/contact-berichten"),
            },
            {
                key: "companies",
                iconKey: "briefcase-business",
                label: "Bedrijven beheren",
                helper: "Open relatiebeheer.",
                action: () => navigate("/admin/companies"),
            },
            {
                key: "invoices",
                label: "Facturen",
                helper: "Upload of zoek facturen.",
                action: () => navigate("/admin/invoices"),
            },
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TRAINING_MANAGER) {
        return [
            {
                key: "trainingen",
                label: "Trainingen openen",
                helper: "Bekijk planning en bezetting.",
                action: () => navigate("/admin/trainingen"),
            },
            {
                key: "evaluaties",
                iconKey: "clipboard-check",
                label: "Evaluaties",
                helper: "Bekijk feedback en resultaten.",
                action: () => navigate("/admin/evaluations"),
            },
            {
                key: "locaties",
                iconKey: "map-pin",
                label: "Locaties",
                helper: "Controleer trainingslocaties.",
                action: () => navigate("/admin/locations"),
            },
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.SAFETY_MANAGER) {
        return [
            {
                key: "locaties",
                iconKey: "map-pin",
                label: "Locaties openen",
                helper: "Bekijk veiligheidsinformatie.",
                action: () => navigate("/admin/locations"),
            },
            {
                key: "trainingen",
                label: "Trainingen openen",
                helper: "Volg veiligheidstrainingen.",
                action: () => navigate("/admin/trainingen"),
            },
            {
                key: "profile",
                label: "Profiel bijwerken",
                helper: "Controleer je gegevens.",
                action: () => navigate("/profile"),
            },
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.FINANCE) {
        return [
            {
                key: "quotes",
                iconKey: "file-text",
                label: "Offertes openen",
                helper: "Bekijk open aanvragen.",
                action: () => navigate("/admin/offertes"),
            },
            {
                key: "companies",
                iconKey: "briefcase-business",
                label: "Bedrijven",
                helper: "Bekijk relatiegegevens.",
                action: () => navigate("/admin/companies"),
            },
            {
                key: "invoices",
                label: "Facturen",
                helper: "Open factuurbeheer.",
                action: () => navigate("/admin/invoices"),
            },
        ];
    }

    if (
        dashboardProfile.type === DASHBOARD_PROFILE_TYPES.BUILDING_OWNER ||
        dashboardProfile.type === DASHBOARD_PROFILE_TYPES.LOCATION_MANAGER ||
        dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TECHNICIAN
    ) {
        return [
            {
                key: "locations",
                iconKey: "map-pin",
                label: "Locaties openen",
                helper: "Bekijk locatiegegevens.",
                action: () => navigate("/admin/locations"),
            },
            {
                key: "profile",
                label: "Profiel bijwerken",
                helper: "Controleer je gegevens.",
                action: () => navigate("/profile"),
            },
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TEAM_LEADER) {
        return [
            {
                key: "team-trainingen",
                iconKey: "calendar",
                label: "Trainingen openen",
                helper: "Bekijk teamplanning.",
                action: () => navigate("/admin/trainingen"),
            },
            {
                key: "team-evaluaties",
                iconKey: "clipboard-check",
                label: "Evaluaties",
                helper: "Bekijk feedback en resultaten.",
                action: () => navigate("/admin/evaluations"),
            },
        ];
    }

    return [
        {
            key: "profile",
            label: "Profiel bijwerken",
            helper: "Controleer je gegevens en foto.",
            action: () => navigate("/profile"),
        },
        {
            key: "security",
            label: "2FA beheren",
            helper: "Verbeter je accountbeveiliging.",
            action: () => navigate("/account/beveiliging/2fa"),
        },
    ];
}

export function getDashboardStats({
    dashboardProfile,
    user,
    overview,
    overviewLoading,
    cursistOverview,
    cursistOverviewLoading,
    roleOverview,
    roleOverviewLoading,
}) {
    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.ADMIN) {
        return [
            {
                key: "planning",
                iconKey: "calendar",
                value: overviewLoading
                    ? "Laden..."
                    : formatCount(overview?.upcomingTrainingCount),
                label: "Geplande trainingen",
            },
            {
                key: "follow-up",
                iconKey: "file-text",
                value: overviewLoading
                    ? "Laden..."
                    : formatCount(overview?.openQuoteCount),
                label: "Open offertes",
            },
            {
                key: "quality",
                iconKey: "mail",
                value: overviewLoading
                    ? "Laden..."
                    : formatCount(overview?.openContactMessageCount),
                label: "Open contactberichten",
            },
        ];
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TRAINER) {
        return getRoleStatsOrFallback(roleOverview, roleOverviewLoading, [
            { key: "trainer", value: "Trainer", label: "Dashboardtype" },
            { key: "planning", value: "-", label: "Mijn trainingen" },
            { key: "evaluations", value: "-", label: "Evaluaties" },
        ]);
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.OFFICE) {
        return getRoleStatsOrFallback(roleOverview, roleOverviewLoading, [
            { key: "office", value: "Kantoor", label: "Dashboardtype" },
            { key: "quotes", value: "-", label: "Open offertes" },
            { key: "messages", value: "-", label: "Contactberichten" },
        ]);
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TRAINING_MANAGER) {
        return getRoleStatsOrFallback(
            roleOverview,
            roleOverviewLoading,
            createRoleStats("Training manager", "Trainingen", "Evaluaties")
        );
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.SAFETY_MANAGER) {
        return getRoleStatsOrFallback(
            roleOverview,
            roleOverviewLoading,
            createRoleStats("Safety manager", "Locaties", "Acties")
        );
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.FINANCE) {
        return getRoleStatsOrFallback(
            roleOverview,
            roleOverviewLoading,
            createRoleStats("Finance", "Open offertes", "Bedrijven")
        );
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.BUILDING_OWNER) {
        return getRoleStatsOrFallback(
            roleOverview,
            roleOverviewLoading,
            createRoleStats("Gebouw", "Locaties", "Rapportages")
        );
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.LOCATION_MANAGER) {
        return getRoleStatsOrFallback(
            roleOverview,
            roleOverviewLoading,
            createRoleStats("Locatie", "Trainingen", "Acties")
        );
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TECHNICIAN) {
        return getRoleStatsOrFallback(
            roleOverview,
            roleOverviewLoading,
            createRoleStats("Techniek", "Locaties", "Rapportages")
        );
    }

    if (dashboardProfile.type === DASHBOARD_PROFILE_TYPES.TEAM_LEADER) {
        return getRoleStatsOrFallback(
            roleOverview,
            roleOverviewLoading,
            createRoleStats("Teamleider", "Teamplanning", "Evaluaties")
        );
    }

    return [
        {
            key: "account",
            value: user?.email ? "Actief" : "Aanvullen",
            label: "Accountstatus",
        },
        {
            key: "training",
            value: cursistOverviewLoading
                ? "Laden..."
                : formatCount(cursistOverview?.upcomingTrainingCount),
            label: "Geplande trainingen",
        },
        {
            key: "certificate",
            value: cursistOverviewLoading
                ? "Laden..."
                : formatCount(cursistOverview?.certificateCount),
            label: "Certificaten",
        },
    ];
}

function getRoleStatsOrFallback(roleOverview, loading, fallbackStats) {
    if (loading) {
        return fallbackStats.map((stat) => ({
            ...stat,
            value: stat.key === "type" ? stat.value : "Laden...",
        }));
    }

    if (Array.isArray(roleOverview?.stats) && roleOverview.stats.length > 0) {
        return roleOverview.stats.slice(0, 3).map((stat, index) => ({
            key: stat.key ?? `role-stat-${index}`,
            value: stat.value ?? "-",
            label: stat.label ?? "Overzicht",
        }));
    }

    return fallbackStats;
}

function createRoleStats(typeLabel, secondLabel, thirdLabel) {
    return [
        {
            key: "type",
            value: typeLabel,
            label: "Dashboardtype",
        },
        {
            key: "secondary",
            value: "-",
            label: secondLabel,
        },
        {
            key: "tertiary",
            value: "-",
            label: thirdLabel,
        },
    ];
}

function createProfileCard(user, navigate) {
    return {
        key: "profile",
        tone: "neutral",
        label: "Account",
        title: "Profiel",
        description:
            "Bekijk jouw accountgegevens en persoonlijke informatie.",
        meta: [user?.email ?? "Geen e-mail bekend"],
        actionLabel: "Open profiel",
        action: () => navigate("/profile"),
    };
}

function formatCount(value) {
    return Number.isFinite(value) ? String(value) : "-";
}
