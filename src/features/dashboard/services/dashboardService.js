import api from "@/api/api.js";
import contactService from "@/features/contact/services/contactService.js";
import companyService from "@/features/companies/services/companyService.js";
import evaluationService from "@/features/evaluation/services/evaluationService.js";
import locationService from "@/features/locations/services/locationService.js";
import quoteService from "@/features/offerte/services/quoteService.js";
import trainingService from "@/features/trainingen/services/trainingService.js";
import { DASHBOARD_PROFILE_TYPES } from "../helpers/dashboardProfiles.js";

function normalizeCollection(responseOrData) {
    const data = responseOrData?.data ?? responseOrData;

    if (Array.isArray(data)) {
        return data;
    }

    if (Array.isArray(data?.content)) {
        return data.content;
    }

    if (Array.isArray(data?.data)) {
        return data.data;
    }

    return [];
}

function normalizeOverview(responseOrData) {
    const data = responseOrData?.data ?? responseOrData ?? {};

    return {
        ...data,
        stats: Array.isArray(data.stats) ? data.stats : [],
        sections: Array.isArray(data.sections) ? data.sections : [],
        actions: Array.isArray(data.actions) ? data.actions : [],
    };
}

function isOpenContactMessage(message) {
    return message?.status !== "AFGEHANDELD";
}

function isOpenQuote(quote) {
    return !["ACCEPTED", "REJECTED", "EXPIRED", "ARCHIVED"].includes(quote?.status);
}

function isUpcomingTraining(training) {
    if (training?.status === "COMPLETED" || training?.status === "CANCELLED") {
        return false;
    }

    if (!training?.courseDate) {
        return true;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const trainingDate = new Date(training.courseDate);

    if (Number.isNaN(trainingDate.getTime())) {
        return true;
    }

    trainingDate.setHours(0, 0, 0, 0);

    return trainingDate >= today;
}

function sortTrainingsByDate(trainings) {
    return [...trainings].sort((a, b) => {
        const dateA = new Date(a?.courseDate || a?.date || a?.startDate || 0).getTime();
        const dateB = new Date(b?.courseDate || b?.date || b?.startDate || 0).getTime();

        return dateA - dateB;
    });
}

function sortByNewest(items) {
    return [...items].sort((a, b) => {
        const dateA = new Date(a?.createdAt || a?.updatedAt || 0).getTime();
        const dateB = new Date(b?.createdAt || b?.updatedAt || 0).getTime();

        return dateB - dateA;
    });
}

async function getAdminOverview() {
    const [trainingsResult, quotesResult, contactResult] = await Promise.allSettled([
        trainingService.getAll(),
        quoteService.getAllQuotes(),
        contactService.getAllMessages(false),
    ]);

    const trainings = trainingsResult.status === "fulfilled"
        ? normalizeCollection(trainingsResult.value)
        : [];
    const quotes = quotesResult.status === "fulfilled"
        ? normalizeCollection(quotesResult.value)
        : [];
    const contactMessages = contactResult.status === "fulfilled"
        ? normalizeCollection(contactResult.value)
        : [];

    const failedSources = [
        trainingsResult.status === "rejected" ? "trainingen" : null,
        quotesResult.status === "rejected" ? "offertes" : null,
        contactResult.status === "rejected" ? "contactberichten" : null,
    ].filter(Boolean);
    const upcomingTrainings = sortTrainingsByDate(trainings.filter(isUpcomingTraining));
    const openQuotes = sortByNewest(quotes.filter(isOpenQuote));
    const openContactMessages = sortByNewest(contactMessages.filter(isOpenContactMessage));

    return {
        upcomingTrainings,
        openQuotes,
        openContactMessages,
        upcomingTrainingCount: upcomingTrainings.length,
        openQuoteCount: openQuotes.length,
        openContactMessageCount: openContactMessages.length,
        failedSources,
    };
}

async function getCursistOverview() {
    const { data, failedSources } = await loadSources({
        "mijn trainingen": async () => (await api.get("/courses/me")).data,
        certificaten: async () => (await api.get("/certificates/me")).data,
    });
    const trainings = sortTrainingsByDate(data["mijn trainingen"]);
    return {
        trainings,
        certificates: data.certificaten,
        elearnings: [],
        upcomingTrainingCount: trainings.filter(isUpcomingTraining).length,
        certificateCount: data.certificaten.length,
        elearningCount: 0,
        failedSources,
    };
}

function toItem(item, type) {
    const titles = {
        training: item.title || item.trainingTypeLabel || item.trainingType,
        evaluation: item.trainingTitle || item.courseName,
        location: item.name || item.locationName,
        company: item.name || item.companyName,
        quote: item.company || item.customerName || item.quoteNumber,
        invoice: item.invoiceNumber,
    };
    const date = item.courseDate || item.startDate || item.createdAt;
    const dateLabel = date && !Number.isNaN(new Date(date).getTime())
        ? new Date(date).toLocaleDateString("nl-NL")
        : null;
    const count = item.participantCount ?? item.responseCount;

    return {
        id: item.id ?? item.trainingId,
        title: titles[type] || "Item",
        description: [dateLabel, item.locationName, item.city, item.status,
            Number.isFinite(count) ? `${count} reacties/deelnemers` : null]
            .filter(Boolean).join(" - ") || "Details beschikbaar",
    };
}

function section(key, title, items, emptyText) {
    return { key, title, count: items.length, items, emptyText };
}

async function loadSources(sources) {
    const entries = Object.entries(sources);
    const results = await Promise.allSettled(entries.map(([, load]) => load()));
    const data = {};
    const failedSources = [];

    results.forEach((result, index) => {
        const key = entries[index][0];
        if (result.status === "fulfilled") {
            data[key] = normalizeCollection(result.value);
        } else {
            data[key] = [];
            failedSources.push(key);
        }
    });
    return { data, failedSources };
}

async function getTrainerOverview() {
    const { data, failedSources } = await loadSources({
        trainingen: trainingService.getAll,
        evaluaties: evaluationService.getAllSummaries,
    });
    const upcomingTrainings = sortTrainingsByDate(data.trainingen.filter(isUpcomingTraining));
    const evaluations = data.evaluaties.map((item) => toItem(item, "evaluation"));

    return {
        upcomingTrainings,
        evaluations,
        actions: [],
        sections: [
            section("upcomingTrainings", "Komende trainingen", upcomingTrainings.map((item) => toItem(item, "training")), "Geen komende trainingen."),
            section("evaluations", "Evaluaties", evaluations, "Nog geen evaluaties."),
        ],
        failedSources,
    };
}

async function getTrainingManagerOverview() {
    const { data, failedSources } = await loadSources({
        trainingen: trainingService.getAll,
        locaties: locationService.getAll,
        bedrijven: companyService.getAll,
    });
    const trainings = sortTrainingsByDate(data.trainingen.filter(isUpcomingTraining));
    return {
        sections: [
            section("trainings", "Komende trainingen", trainings.map((item) => toItem(item, "training")), "Geen komende trainingen."),
            section("locations", "Locaties", data.locaties.map((item) => toItem(item, "location")), "Geen locaties beschikbaar."),
            section("companies", "Bedrijven", data.bedrijven.map((item) => toItem(item, "company")), "Geen bedrijven beschikbaar."),
        ],
        failedSources,
    };
}

async function getSafetyManagerOverview() {
    const { data, failedSources } = await loadSources({
        locaties: locationService.getAll,
        bedrijven: companyService.getAll,
    });
    return {
        sections: [
            section("locations", "Veiligheidslocaties", data.locaties.map((item) => toItem(item, "location")), "Geen locaties beschikbaar."),
            section("companies", "Gekoppelde bedrijven", data.bedrijven.map((item) => toItem(item, "company")), "Geen bedrijven beschikbaar."),
        ],
        failedSources,
    };
}

async function getFinanceOverview() {
    const { data, failedSources } = await loadSources({
        offertes: quoteService.getAllQuotes,
        facturen: async () => (await api.get("/invoices")).data,
    });
    const quotes = sortByNewest(data.offertes.filter(isOpenQuote));
    return {
        sections: [
            section("quotes", "Open offertes", quotes.map((item) => toItem(item, "quote")), "Geen open offertes."),
            section("invoices", "Facturen", data.facturen.map((item) => toItem(item, "invoice")), "Geen facturen beschikbaar."),
        ],
        failedSources,
    };
}

function getUnsupportedOverview(profileType) {
    const sources = {
        [DASHBOARD_PROFILE_TYPES.BUILDING_OWNER]: "gebouwlocaties",
        [DASHBOARD_PROFILE_TYPES.LOCATION_MANAGER]: "toegewezen locaties",
        [DASHBOARD_PROFILE_TYPES.TECHNICIAN]: "BBMI-locaties",
        [DASHBOARD_PROFILE_TYPES.TEAM_LEADER]: "teamgegevens",
    };
    const source = sources[profileType] || "rolgegevens";
    return {
        sections: [section("backend", "Backendkoppeling vereist", [], `Voor ${source} ontbreekt nog een persoonlijk lijst-endpoint in de backend.`)],
        failedSources: [source],
    };
}

function getLocationIds(user) {
    return [...new Set((user?.locationRoles || []).map((role) => role.locationId).filter(Boolean))];
}

async function getLocationRoleOverview(profileType, user) {
    const locationIds = getLocationIds(user);
    if (locationIds.length === 0) return getUnsupportedOverview(profileType);

    const requests = locationIds.map(async (locationId) => {
        if (profileType === DASHBOARD_PROFILE_TYPES.BUILDING_OWNER) {
            return (await api.get(`/building/bbmi/locations/${locationId}/overview`)).data;
        }
        if (profileType === DASHBOARD_PROFILE_TYPES.TECHNICIAN) {
            return (await api.get(`/bbmi/locations/${locationId}/reports`)).data;
        }
        return (await api.get(`/locations/${locationId}`)).data;
    });
    const results = await Promise.allSettled(requests);
    const items = results.flatMap((result, index) => {
        if (result.status !== "fulfilled") return [];
        const value = result.value;
        const reports = Array.isArray(value) ? value : value?.reports;
        return [{
            id: locationIds[index],
            title: value?.locationName || user.locationRoles.find((role) => role.locationId === locationIds[index])?.locationName || `Locatie ${locationIds[index]}`,
            description: Array.isArray(reports) ? `${reports.length} BBMI-rapportages` : (value?.nextControlDate ? `Volgende controle ${value.nextControlDate}` : "Locatiegegevens beschikbaar"),
        }];
    });
    const failedSources = results.some((result) => result.status === "rejected") ? ["locatiegegevens"] : [];
    return { sections: [section("locations", "Mijn locaties", items, "Geen locatiegegevens beschikbaar.")], failedSources };
}

async function getRoleOverview(profileType, user) {
    switch (profileType) {
        case DASHBOARD_PROFILE_TYPES.TRAINER:
            return getTrainerOverview();
        case DASHBOARD_PROFILE_TYPES.TRAINING_MANAGER:
            return getTrainingManagerOverview();
        case DASHBOARD_PROFILE_TYPES.SAFETY_MANAGER:
            return getSafetyManagerOverview();
        case DASHBOARD_PROFILE_TYPES.FINANCE:
            return getFinanceOverview();
        case DASHBOARD_PROFILE_TYPES.BUILDING_OWNER:
        case DASHBOARD_PROFILE_TYPES.LOCATION_MANAGER:
        case DASHBOARD_PROFILE_TYPES.TECHNICIAN:
            return getLocationRoleOverview(profileType, user);
        default:
            return normalizeOverview(getUnsupportedOverview(profileType));
    }
}

const dashboardService = {
    getAdminOverview,
    getCursistOverview,
    getRoleOverview,
};

export default dashboardService;
