const today = () => new Date().toISOString().slice(0, 10);

const addDays = (date, days) => {
    const value = new Date(`${date}T12:00:00`);
    value.setDate(value.getDate() + days);
    return value.toISOString().slice(0, 10);
};

export const createTrainingItem = () => ({
    trainingCode: "",
    title: "",
    description: "",
    trainingDuration: "",
    participantCount: 1,
    groupCount: 1,
    executionCount: 1,
    quantity: 1,
    priceUnitLabel: "training",
    unitPriceExcludingVat: 0,
    totalExcludingVat: 0,
    travelCostsByExecution: [0],
});

export const createInitialQuote = () => {
    const quoteDate = today();
    return {
        quoteId: crypto.randomUUID(),
        quoteNumber: `OF-${quoteDate.replaceAll("-", "")}-001`,
        quoteDate,
        validUntil: addDays(quoteDate, 30),
        coverTitle: "Voorstel voor veiligheidstrainingen",
        coverSubtitle: "Praktisch, persoonlijk en afgestemd op uw organisatie",
        personalForeword: "",
        requestSummary: "",
        trainingGoal: "",
        recommendations: "",
        planningNotes: "",
        agreementUrl: "",
        customer: {
            organizationName: "",
            contactPersonName: "",
            greetingName: "",
            streetAndHouseNumber: "",
            postalCode: "",
            city: "",
            country: "Nederland",
            contactEmail: "",
            contactPhone: "",
        },
        trainingLocation: {
            locationName: "",
            streetAndHouseNumber: "",
            postalCode: "",
            city: "",
            country: "Nederland",
            roomOrArea: "",
            accessInstructions: "",
        },
        trainingItems: [createTrainingItem()],
        discount: { code: "", description: "", percentage: 0, amountExcludingVat: 0 },
        vatPercentage: 21,
    };
};

export function inferUnambiguousDuration(training) {
    if (!training) return "";
    if (training.durationInDays > 1) return "MULTI_DAY";
    if (training.durationInDays === 1) return "FULL_DAY";
    if (training.code?.includes("HALF_DAY")) return "HALF_DAY";
    return "";
}

const money = (value) => Math.round((Number(value) || 0) * 100) / 100;
const text = (value) => typeof value === "string" ? value : "";

export function normalizeQuoteForForm(value) {
    const source = value || createInitialQuote();
    const allocations = Array.isArray(source.travelCostAllocations)
        ? source.travelCostAllocations
        : [];

    return {
        ...source,
        coverTitle: text(source.coverTitle),
        coverSubtitle: text(source.coverSubtitle),
        personalForeword: text(source.personalForeword),
        requestSummary: text(source.requestSummary),
        trainingGoal: text(source.trainingGoal),
        planningNotes: text(source.planningNotes),
        agreementUrl: text(source.agreementUrl),
        vatPercentage: source.vatPercentage ?? source.priceSummary?.vatPercentage ?? 21,
        recommendations: Array.isArray(source.recommendations)
            ? source.recommendations.join("\n")
            : source.recommendations || "",
        discount: source.discount || source.discounts?.[0] || {
            code: "",
            description: "",
            percentage: 0,
            amountExcludingVat: 0,
        },
        trainingItems: (source.trainingItems || [createTrainingItem()]).map((item) => {
            const executionCount = Math.max(1, Number(item.executionCount) || 1);
            const matchingAllocations = allocations.filter(
                (allocation) => allocation.trainingCode === item.trainingCode
            );
            return {
                ...item,
                travelCostsByExecution: Array.from({ length: executionCount }, (_, index) => {
                    const allocation = matchingAllocations.find(
                        (candidate) => Number(candidate.executionNumber) === index + 1
                    );
                    return money(allocation?.amountExcludingVat);
                }),
            };
        }),
    };
}

export function buildQuotePayload(form) {
    const trainingItems = form.trainingItems.map(({ travelCostsByExecution: _travel, ...item }) => ({
        ...item,
        participantCount: Number(item.participantCount),
        groupCount: Number(item.groupCount),
        executionCount: Number(item.executionCount),
        quantity: money(item.quantity),
        unitPriceExcludingVat: money(item.unitPriceExcludingVat),
        totalExcludingVat: money(item.totalExcludingVat),
    }));

    const trainingSubtotalExcludingVat = money(
        trainingItems.reduce((sum, item) => sum + item.totalExcludingVat, 0)
    );
    const travelCostsExcludingVat = money(
        form.trainingItems.reduce(
            (sum, item) => sum + (item.travelCostsByExecution || []).reduce(
                (executionSum, amount) => executionSum + money(amount),
                0
            ),
            0
        )
    );
    const discountTotalExcludingVat = money(form.discount.amountExcludingVat);
    const totalExcludingVat = money(
        trainingSubtotalExcludingVat + travelCostsExcludingVat - discountTotalExcludingVat
    );
    const vatPercentage = money(form.vatPercentage);
    const vatAmount = money(totalExcludingVat * (vatPercentage / 100));

    const discounts = discountTotalExcludingVat > 0
        ? [{
            code: form.discount.code || null,
            description: form.discount.description || "Korting",
            percentage: money(form.discount.percentage),
            amountExcludingVat: discountTotalExcludingVat,
        }]
        : [];

    const travelCostAllocations = form.trainingItems.flatMap((item) =>
        (item.travelCostsByExecution || [])
            .map((amount, index) => ({
                trainingCode: item.trainingCode,
                executionNumber: index + 1,
                amountExcludingVat: money(amount),
            }))
            .filter((allocation) => allocation.amountExcludingVat > 0)
    );

    return {
        quoteId: form.quoteId,
        quoteNumber: text(form.quoteNumber).trim(),
        quoteDate: form.quoteDate,
        validUntil: form.validUntil,
        coverTitle: text(form.coverTitle).trim() || null,
        coverSubtitle: text(form.coverSubtitle).trim() || null,
        personalForeword: text(form.personalForeword).trim() || null,
        requestSummary: text(form.requestSummary).trim(),
        trainingGoal: text(form.trainingGoal).trim(),
        recommendations: text(form.recommendations).split("\n").map((line) => line.trim()).filter(Boolean),
        planningNotes: text(form.planningNotes).trim() || null,
        customer: form.customer,
        trainingLocation: form.trainingLocation,
        trainingItems,
        discounts,
        travelCostAllocations,
        priceSummary: {
            trainingSubtotalExcludingVat,
            travelCostsExcludingVat,
            discountTotalExcludingVat,
            totalExcludingVat,
            vatPercentage,
            vatAmount,
            totalIncludingVat: money(totalExcludingVat + vatAmount),
        },
        agreementUrl: text(form.agreementUrl).trim() || null,
    };
}

export function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
}

export const formatCurrency = (value) => new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
}).format(Number(value) || 0);
