export function getDashboardCards({ roles, user, navigate }) {
    const isAdmin = roles.includes("ROLE_ADMIN");
    const isCursist = roles.includes("ROLE_CURSIST");

    if (isAdmin) {
        return [
            {
                key: "trainings",
                title: "Trainingen",
                description:
                    "Beheer trainingen, bekijk details en werk later met planning, type en deelnemers.",
                meta: [
                    "Overzicht van trainingen",
                    "Later uit te breiden met planning en status",
                ],
                actionLabel: "Open trainingen",
                action: () => navigate("/admin/trainingen"),
            },
            {
                key: "users",
                title: "Gebruikers",
                description:
                    "Beheer gebruikersaccounts en bekijk gebruikersgegevens.",
                meta: ["Accounts beheren", "Detailpagina per gebruiker"],
                actionLabel: "Open gebruikers",
                action: () => navigate("/admin/users"),
            },
            {
                key: "locations",
                title: "Locaties",
                description:
                    "Beheer locaties en bekijk beschikbare trainingslocaties.",
                meta: ["Locaties beheren", "Voor trainingen en planning"],
                actionLabel: "Open locaties",
                action: () => navigate("/admin/locations"),
            },
            {
                key: "evaluations",
                title: "Evaluaties",
                description:
                    "Bekijk evaluatieoverzichten, details en reacties per training.",
                meta: ["Overzicht per training", "QR en reacties per evaluatie"],
                actionLabel: "Open evaluaties",
                action: () => navigate("/admin/evaluations"),
            },
            {
                key: "contact",
                title: "Contact",
                description:
                    "Bekijk berichten van het contactformulier en handel ze af.",
                meta: ["Nieuw / in behandeling / afgerond", "Later ook verwijderen"],
                actionLabel: "Open contactberichten",
                action: () => navigate("/admin/contact-berichten"),
            },
            {
                key: "quotes",
                title: "Offertes",
                description:
                    "Bekijk offerteaanvragen en werk ze bij via een duidelijke status.",
                meta: ["Nieuw / in behandeling / afgerond", "Later ook afwijzen"],
                actionLabel: "Open offerteaanvragen",
                action: () => navigate("/admin/quote-requests"),
            },
            {
                key: "profile",
                title: "Profiel",
                description:
                    "Bekijk jouw accountgegevens en persoonlijke informatie.",
                meta: [user?.email ?? "Geen e-mail bekend"],
                actionLabel: "Open profiel",
                action: () => navigate("/profile"),
            },
        ];
    }

    if (isCursist) {
        return [
            {
                key: "my-trainings",
                title: "Mijn trainingen",
                description:
                    "Bekijk jouw trainingen, data en informatie over deelname.",
                meta: ["Eigen planning", "Later certificaten en historie"],
                actionLabel: "Open mijn trainingen",
                action: () => navigate("/my-trainings"),
            },
            {
                key: "profile",
                title: "Profiel",
                description:
                    "Bekijk jouw accountgegevens en persoonlijke informatie.",
                meta: [user?.email ?? "Geen e-mail bekend"],
                actionLabel: "Open profiel",
                action: () => navigate("/profile"),
            },
        ];
    }

    return [
        {
            key: "profile",
            title: "Profiel",
            description:
                "Bekijk jouw accountgegevens en persoonlijke informatie.",
            meta: [user?.email ?? "Geen e-mail bekend"],
            actionLabel: "Open profiel",
            action: () => navigate("/profile"),
        },
    ];
}