export const CHAT_ROUTES = [
    {
        value: "organize",
        label: "Ik wil iets organiseren",
        description: "Een training, workshop of ontruimingsoefening",
    },
    {
        value: "booking",
        label: "Ik heb een bestaande boeking",
        description: "Een vraag stellen of iets wijzigen",
    },
    {
        value: "administration",
        label: "Ik heb een administratieve vraag",
        description: "Over een factuur, betaling of administratie",
    },
    {
        value: "other",
        label: "Ik heb een andere vraag",
        description: "Mijn vraag staat er niet tussen",
    },
];

export const ACTIVITY_OPTIONS = [
    {
        value: "bhv",
        label: "BHV-training",
    },
    {
        value: "ehbo",
        label: "EHBO-training",
    },
    {
        value: "reanimation",
        label: "Reanimatie en AED",
    },
    {
        value: "stop-the-bleed",
        label: "Stop de Bloeding",
    },
    {
        value: "evacuation",
        label: "Ontruimingsoefening",
    },
    {
        value: "workshop",
        label: "Workshop of maatwerk",
    },
    {
        value: "unknown",
        label: "Ik weet het nog niet",
    },
];

const contactQuestions = [
    {
        id: "name",
        type: "text",
        question: "Wat is je naam?",
        placeholder: "Vul je naam in",
        required: true,
        maxLength: 150,
    },
    {
        id: "company",
        type: "text",
        question: "Voor welke organisatie neem je contact op?",
        placeholder: "Naam van de organisatie",
        required: false,
        maxLength: 150,
    },
    {
        id: "email",
        type: "email",
        question: "Op welk e-mailadres kunnen we je bereiken?",
        placeholder: "naam@organisatie.nl",
        required: true,
        maxLength: 160,
    },
    {
        id: "phone",
        type: "tel",
        question: "Wil je ook een telefoonnummer achterlaten?",
        placeholder: "Telefoonnummer, niet verplicht",
        required: false,
        maxLength: 40,
    },
];

const generalActivityQuestions = [
    {
        id: "participants",
        type: "number",
        question: "Om hoeveel deelnemers of aanwezigen gaat het ongeveer?",
        placeholder: "Bijvoorbeeld 12",
        required: true,
    },
    {
        id: "location",
        type: "text",
        question: "In welke plaats of op welke locatie moet dit plaatsvinden?",
        placeholder: "Plaats of locatie",
        required: true,
        maxLength: 200,
    },
    {
        id: "preferredPeriod",
        type: "text",
        question: "Heb je een gewenste datum of periode?",
        placeholder: "Bijvoorbeeld september of week 38",
        required: true,
        maxLength: 200,
    },
];

const trainingQuestions = [
    {
        id: "trainingLevel",
        type: "choice",
        question: "Gaat het om een basis- of herhalingstraining?",
        required: true,
        options: [
            {
                value: "basic",
                label: "Basistraining",
            },
            {
                value: "repeat",
                label: "Herhalingstraining",
            },
            {
                value: "combination",
                label: "Een combinatie",
            },
            {
                value: "unknown",
                label: "Weet ik nog niet",
            },
        ],
    },
];

const evacuationQuestions = [
    {
        id: "organizationType",
        type: "text",
        question: "Voor welk type organisatie of gebouw is de ontruimingsoefening?",
        placeholder: "Bijvoorbeeld kantoor, school of zorginstelling",
        required: true,
        maxLength: 250,
    },
    {
        id: "buildingDetails",
        type: "textarea",
        question: "Kun je kort iets vertellen over het gebouw en het aantal verdiepingen?",
        placeholder: "Beschrijf de locatie en het gebouw",
        required: true,
        maxLength: 1000,
    },
    {
        id: "evacuationPlan",
        type: "choice",
        question: "Is er al een actueel ontruimingsplan?",
        required: true,
        options: [
            {
                value: "yes",
                label: "Ja",
            },
            {
                value: "no",
                label: "Nee",
            },
            {
                value: "unknown",
                label: "Weet ik niet",
            },
        ],
    },
    {
        id: "exerciseSupport",
        type: "choice",
        question: "Welke ondersteuning zoek je bij de ontruimingsoefening?",
        required: true,
        options: [
            {
                value: "guidance",
                label: "Begeleiding",
            },
            {
                value: "evaluation",
                label: "Begeleiding en evaluatie",
            },
            {
                value: "report",
                label: "Begeleiding, evaluatie en verslag",
            },
            {
                value: "advice",
                label: "Ik wil graag advies",
            },
        ],
    },
];

const explanationQuestion = {
    id: "request",
    type: "textarea",
    question: "Wil je kort toelichten wat je precies zoekt of wilt bereiken?",
    placeholder: "Vertel ons kort wat je nodig hebt",
    required: true,
    maxLength: 1500,
};

const additionalInformationQuestion = {
    id: "additionalInformation",
    type: "textarea",
    question: "Wil je nog aanvullende informatie meegeven?",
    placeholder: "Dit is niet verplicht",
    required: false,
    maxLength: 1500,
};

const routeQuestions = {
    booking: [
        {
            id: "reference",
            type: "text",
            question: "Heb je een boekings- of trainingsnummer?",
            placeholder: "Niet verplicht",
            required: false,
            maxLength: 80,
        },
        {
            id: "bookingActivity",
            type: "text",
            question: "Over welke training, workshop of oefening gaat het?",
            placeholder: "Omschrijf de activiteit",
            required: true,
            maxLength: 250,
        },
        {
            id: "request",
            type: "textarea",
            question: "Wat wil je wijzigen of navragen?",
            placeholder: "Beschrijf je vraag of wijziging",
            required: true,
            maxLength: 1500,
        },
    ],

    administration: [
        {
            id: "reference",
            type: "text",
            question: "Heb je een factuur-, boekings- of referentienummer?",
            placeholder: "Niet verplicht",
            required: false,
            maxLength: 80,
        },
        {
            id: "request",
            type: "textarea",
            question: "Waar gaat je administratieve vraag over?",
            placeholder: "Beschrijf je vraag",
            required: true,
            maxLength: 1500,
        },
    ],

    other: [
        {
            id: "request",
            type: "textarea",
            question: "Waarmee kunnen we je helpen?",
            placeholder: "Stel hier je vraag",
            required: true,
            maxLength: 1500,
        },
    ],
};

export function getQuestions(route, answers = {}) {
    if (route === "organize") {
        const activityQuestion = {
            id: "activity",
            type: "choice",
            question: "Wat wil je organiseren?",
            required: true,
            options: ACTIVITY_OPTIONS,
        };

        let activitySpecificQuestions = [];

        if (answers.activity === "evacuation") {
            activitySpecificQuestions = evacuationQuestions;
        } else if (
            ["bhv", "ehbo", "reanimation", "stop-the-bleed"].includes(
                answers.activity
            )
        ) {
            activitySpecificQuestions = trainingQuestions;
        }

        return [
            activityQuestion,
            ...activitySpecificQuestions,
            ...generalActivityQuestions,
            explanationQuestion,
            additionalInformationQuestion,
            ...contactQuestions,
        ];
    }

    return [
        ...(routeQuestions[route] ?? routeQuestions.other),
        additionalInformationQuestion,
        ...contactQuestions,
    ];
}

export function getRouteLabel(routeValue) {
    return (
        CHAT_ROUTES.find((route) => route.value === routeValue)?.label ??
        routeValue
    );
}

export function getAnswerLabel(question, answerValue) {
    if (question.type !== "choice") {
        return String(answerValue ?? "");
    }

    return (
        question.options?.find((option) => option.value === answerValue)
            ?.label ?? String(answerValue ?? "")
    );
}