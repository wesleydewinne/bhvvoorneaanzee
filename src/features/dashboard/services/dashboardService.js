import contactService from "@/features/contact/services/contactService.js";
import quoteService from "@/features/offerte/services/quoteService.js";
import trainingService from "@/features/trainingen/services/trainingService.js";

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
    return {
        trainings: [],
        certificates: [],
        elearnings: [],
        upcomingTrainingCount: 0,
        certificateCount: 0,
        elearningCount: 0,
        failedSources: [],
    };
}

async function getRoleOverview(profileType) {
    void profileType;
    return normalizeOverview({});
}

const dashboardService = {
    getAdminOverview,
    getCursistOverview,
    getRoleOverview,
};

export default dashboardService;
