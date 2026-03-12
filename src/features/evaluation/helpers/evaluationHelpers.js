const METRIC_LABELS = {
    trainingValue: "Waarde training",
    practiceUse: "Praktisch toepasbaar",
    theoryPracticeBalance: "Balans theorie/praktijk",
    paceTiming: "Tempo / timing",
    metExpectations: "Voldeed aan verwachting",
    instructorClarity: "Duidelijkheid instructeur",
    instructorGuidance: "Begeleiding instructeur",
    instructorExpertise: "Deskundigheid instructeur",
    locationSuitability: "Geschiktheid locatie",
    locationAccess: "Bereikbaarheid locatie",
    recommend: "Aanbevelen",
};

const METRIC_KEYS = [
    "trainingValue",
    "practiceUse",
    "theoryPracticeBalance",
    "paceTiming",
    "metExpectations",
    "instructorClarity",
    "instructorGuidance",
    "instructorExpertise",
    "locationSuitability",
    "locationAccess",
    "recommend",
];

export function formatMetricLabel(key) {
    return METRIC_LABELS[key] || key;
}

export function calculateAverage(values = []) {
    const validValues = values.filter((value) => typeof value === "number" && !Number.isNaN(value));

    if (validValues.length === 0) {
        return "-";
    }

    const total = validValues.reduce((sum, value) => sum + value, 0);
    return (total / validValues.length).toFixed(1);
}

export function calculateTrainingAverage(averages = {}) {
    return calculateAverage([
        averages.trainingValue,
        averages.practiceUse,
        averages.theoryPracticeBalance,
        averages.paceTiming,
        averages.metExpectations,
    ]);
}

export function calculateInstructorAverage(averages = {}) {
    return calculateAverage([
        averages.instructorClarity,
        averages.instructorGuidance,
        averages.instructorExpertise,
    ]);
}

export function calculateLocationAverage(averages = {}) {
    return calculateAverage([
        averages.locationSuitability,
        averages.locationAccess,
    ]);
}

export function getMetricCards(averages = {}) {
    return [
        {
            key: "trainingAverage",
            label: "Gem. training",
            value: calculateTrainingAverage(averages),
        },
        {
            key: "instructorAverage",
            label: "Gem. instructeur",
            value: calculateInstructorAverage(averages),
        },
        {
            key: "locationAverage",
            label: "Gem. locatie",
            value: calculateLocationAverage(averages),
        },
        {
            key: "recommend",
            label: "Aanbevelen",
            value:
                typeof averages.recommend === "number"
                    ? averages.recommend.toFixed(1)
                    : "-",
        },
    ];
}

export function getBarItems(averages = {}) {
    return METRIC_KEYS.map((key) => ({
        key,
        label: formatMetricLabel(key),
        value: averages[key],
    }));
}

export function formatDate(dateString) {
    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleString("nl-NL", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

export function buildCsvFilename(trainingId) {
    return `evaluaties-${trainingId}.csv`;
}