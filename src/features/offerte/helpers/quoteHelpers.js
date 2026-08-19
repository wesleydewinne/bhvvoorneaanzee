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
  const uniqueSuffix = Date.now().toString().slice(-6);
  const quoteId = crypto.randomUUID();
  return {
    quoteId,
    quoteNumber: `OF-${quoteDate.replaceAll("-", "")}-${uniqueSuffix}`,
    quoteDate,
    validUntil: addDays(quoteDate, 30),
    coverTitle: "Voorstel voor veiligheidstrainingen",
    coverSubtitle: "Praktisch, persoonlijk en afgestemd op uw organisatie",
    personalForeword:
      "Dank voor uw aanvraag. Graag bieden wij u hierbij onze offerte aan.",
    requestSummary: "",
    trainingGoal:
      "De deelnemers trainen het veilig en praktisch handelen tijdens de gekozen training.",
    recommendations:
      "Informeer de deelnemers vooraf over de trainingsdag.\nZorg dat de afgesproken trainingsruimte beschikbaar is.",
    planningNotes: "De definitieve planning stemmen we in overleg met u af.",
    agreementUrl: `https://bhvvoorneaanzee.nl/offerte/akkoord?quoteId=${quoteId}`,
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
      accessInstructions: "",
    },
    trainingItems: [createTrainingItem()],
    discounts: [],
    travelCalculation: { distanceKm: 0, freeKm: 0, ratePerKm: 0 },
    priceSummary: {
      trainingSubtotalExcludingVat: 0,
      travelCostsExcludingVat: 0,
      discountTotalExcludingVat: 0,
      totalExcludingVat: 0,
      vatAmount: 0,
      totalIncludingVat: 0,
    },
    vatPercentage: 21,
  };
};

const money = (value) => Math.round((Number(value) || 0) * 100) / 100;
const text = (value) => (typeof value === "string" ? value : "");

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
    vatPercentage:
      source.vatPercentage ?? source.priceSummary?.vatPercentage ?? 21,
    recommendations: Array.isArray(source.recommendations)
      ? source.recommendations.join("\n")
      : source.recommendations || "",
    discounts: Array.isArray(source.discounts)
      ? source.discounts.map((discount) => ({
          quoteTrainingId:
            discount?.quoteTrainingId || discount?.legacyTrainingId || "",
          code: text(discount?.code) || "OVERIG",
          description: text(discount?.description),
          type:
            discount?.type ||
            (money(discount?.percentage) > 0 ? "PERCENTAGE" : "FIXED_AMOUNT"),
          value:
            discount?.value ??
            (money(discount?.percentage) > 0
              ? money(discount?.percentage)
              : money(discount?.amountExcludingVat)),
          percentage: money(discount?.percentage),
          amountExcludingVat: money(discount?.amountExcludingVat),
        }))
      : source.discount
        ? [{ ...source.discount }]
        : [],
    travelCalculation: source.travelCalculation || {
      distanceKm: 0,
      freeKm: 0,
      ratePerKm: 0,
    },
    trainingItems: (source.trainingItems || [createTrainingItem()]).map(
      (item) => {
        const executionCount = Math.max(1, Number(item.executionCount) || 1);
        const matchingAllocations = allocations.filter(
          (allocation) => allocation.trainingCode === item.trainingCode,
        );
        return {
          ...item,
          travelCostsByExecution: Array.from(
            { length: executionCount },
            (_, index) => {
              const allocation = matchingAllocations.find(
                (candidate) => Number(candidate.executionNumber) === index + 1,
              );
              return money(allocation?.amountExcludingVat);
            },
          ),
        };
      },
    ),
  };
}

export function buildQuotePayload(form) {
  const vatPercentage = Number(form.vatPercentage);
  if (![0, 9, 21].includes(vatPercentage)) {
    throw new Error("Kies een geldig btw-percentage: 0%, 9% of 21%.");
  }

  const discounts = (form.discounts || [])
    .map((discount) => ({
      quoteTrainingId: text(discount.quoteTrainingId).trim() || null,
      code: text(discount.code).trim() || null,
      description: text(discount.description).trim(),
      type: discount.type === "PERCENTAGE" ? "PERCENTAGE" : "FIXED_AMOUNT",
      value: money(discount.value),
      percentage:
        discount.type === "PERCENTAGE" ? money(discount.value) : 0,
      amountExcludingVat:
        discount.type === "FIXED_AMOUNT" ? money(discount.value) : 0,
    }))
    .filter((discount) => discount.value > 0);
  return {
    ...form,
    vatPercentage,
    trainingItems: form.trainingItems.map((item) => ({
      ...item,
      participantCount: Number(item.participantCount),
    })),
    recommendations: text(form.recommendations)
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    discounts,
    travelCalculation: {
      distanceKm: money(form.travelCalculation?.distanceKm),
      freeKm: money(form.travelCalculation?.freeKm),
      ratePerKm: money(form.travelCalculation?.ratePerKm),
    },
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

export const formatCurrency = (value) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value) || 0);
