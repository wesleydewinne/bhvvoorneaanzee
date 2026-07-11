export const CATEGORY_OPTIONS = [
    { value: "BHV", label: "BHV" },
    { value: "PLOEGLEIDER", label: "BHV Ploegleider" },
    { value: "EHBO", label: "EHBO" },
    { value: "ONTRUIMING", label: "Ontruimingsoefening" },
    { value: "WORKSHOP", label: "Workshop" },
];

export const BHV_TRAINING_TYPE_OPTIONS = [
    {
        value: "BHV_BASIC_2_DAYS",
        label: "BHV Basisopleiding (2 dagen)",
    },
    {
        value: "BHV_BASIC_ELEARNING_1_DAY",
        label: "BHV Basis e-learning + 1 dag praktijk",
    },
    {
        value: "BHV_REFRESHER_1_DAY",
        label: "BHV Herhaling (1 dag)",
    },
    {
        value: "BHV_REFRESHER_ELEARNING_HALF_DAY",
        label: "BHV Herhaling e-learning + 0,5 dag praktijk",
    },
];

export const PLOEGLEIDER_TRAINING_TYPE_OPTIONS = [
    {
        value: "BHV_PLOEGLEIDER_BASIC_2_DAYS",
        label: "BHV Ploegleider Basis (2 dagen)",
    },
    {
        value: "BHV_PLOEGLEIDER_BASIC_ELEARNING_1_DAY",
        label: "BHV Ploegleider Herhaling e-learning + 1 dag",
    },
    {
        value: "BHV_PLOEGLEIDER_ELEARNING_HALF_DAY",
        label: "BHV Ploegleider 0,5 dag praktijk",
    },
];

export const EHBO_TRAINING_TYPE_OPTIONS = [
    {
        value: "EHBO_BASIC_3_DAYS",
        label: "EHBO Basisopleiding (3 dagen)",
    },
    {
        value: "EHBO_BASIC_2_DAYS_ELEARNING",
        label: "EHBO Basis e-learning + 2 dagen",
    },
    {
        value: "EHBO_REFRESHER_1_DAY",
        label: "EHBO Herhaling (1 dag)",
    },
];

export const EVACUATION_PHASE_OPTIONS = [
    {
        value: "EVACUATION_DRILL_PHASE_0",
        label: "Fase 0 - Tabletop",
    },
    {
        value: "EVACUATION_DRILL_PHASE_1",
        label: "Fase 1 - Kleine scenario's",
    },
    {
        value: "EVACUATION_DRILL_PHASE_2",
        label: "Fase 2 - Aangekondigde oefening",
    },
    {
        value: "EVACUATION_DRILL_PHASE_3",
        label: "Fase 3 - Onaangekondigde oefening",
    },
    {
        value: "EVACUATION_DRILL_PHASE_4",
        label: "Fase 4 - Onaangekondigd met meer uitdaging",
    },
];

export const WORKSHOP_TYPE_OPTIONS = [
    {
        value: "WORKSHOP_SMALL_FIRE_EXTINGUISHERS",
        label: "Workshop Kleine Blusmiddelen",
    },
    {
        value: "WORKSHOP_FIRE_ALARM_PANEL_OPERATOR",
        label: "Workshop Bedienaar Brandmeldcentrale",
    },
    {
        value: "WORKSHOP_RADIO_COMMUNICATION",
        label: "Workshop Portofoongebruik",
    },
    {
        value: "WORKSHOP_ADULT_RESUSCITATION",
        label: "Workshop Reanimatie Volwassene",
    },
    {
        value: "WORKSHOP_CHILD_BABY_RESUSCITATION",
        label: "Workshop Reanimatie Kind en Baby",
    },
    {
        value: "WORKSHOP_STOP_THE_BLEEDING",
        label: "Workshop Stop de Bloeding",
    },
    {
        value: "WORKSHOP_WATER_INCIDENTS",
        label: "Workshop Waterongevallen",
    },
    {
        value: "WORKSHOP_CHILD_FIRST_AID_HOME_TRAINING",
        label: "Kinder-EHBO Huiskamertraining",
    },
];

export const STATUS_OPTIONS = [
    { value: "PLANNED", label: "Gepland" },
    { value: "IN_PROGRESS", label: "Bezig" },
    { value: "COMPLETED", label: "Afgerond" },
    { value: "CANCELLED", label: "Geannuleerd" },
];

/*
 * Course participants
 */

export const ATTENDANCE_STATUS_OPTIONS = [
    { value: "ENROLLED", label: "Aangemeld" },
    { value: "PRESENT", label: "Aanwezig" },
    { value: "ABSENT", label: "Afwezig" },
    { value: "PARTIALLY_PRESENT", label: "Gedeeltelijk aanwezig" },
];

export const RESULT_STATUS_OPTIONS = [
    { value: "PENDING", label: "Nog niet beoordeeld" },
    { value: "PASSED", label: "Geslaagd" },
    { value: "FAILED", label: "Niet geslaagd" },
];

export function getTrainingTypeOptionsByCategory(category) {
    if (category === "BHV") {
        return BHV_TRAINING_TYPE_OPTIONS;
    }

    if (category === "PLOEGLEIDER") {
        return PLOEGLEIDER_TRAINING_TYPE_OPTIONS;
    }

    if (category === "EHBO") {
        return EHBO_TRAINING_TYPE_OPTIONS;
    }

    if (category === "ONTRUIMING") {
        return EVACUATION_PHASE_OPTIONS;
    }

    if (category === "WORKSHOP") {
        return WORKSHOP_TYPE_OPTIONS;
    }

    return [];
}

export function resolveTrainingType(formData) {
    if (formData.category === "BHV") {
        return formData.variant || null;
    }

    if (formData.category === "PLOEGLEIDER") {
        return formData.variant || null;
    }

    if (formData.category === "EHBO") {
        return formData.variant || null;
    }

    if (formData.category === "ONTRUIMING") {
        return formData.evacuationPhase || null;
    }

    if (formData.category === "WORKSHOP") {
        return formData.workshopType || null;
    }

    return formData.trainingType || null;
}

export function getCategoryLabel(value) {
    return CATEGORY_OPTIONS.find((option) => option.value === value)?.label || value || "-";
}

export function getTrainingTypeLabel(value) {
    const allTrainingTypes = [
        ...BHV_TRAINING_TYPE_OPTIONS,
        ...PLOEGLEIDER_TRAINING_TYPE_OPTIONS,
        ...EHBO_TRAINING_TYPE_OPTIONS,
        ...EVACUATION_PHASE_OPTIONS,
        ...WORKSHOP_TYPE_OPTIONS,
    ];

    return allTrainingTypes.find((option) => option.value === value)?.label || value || "-";
}

export function getVariantLabel(value) {
    return getTrainingTypeLabel(value);
}

export function getEvacuationPhaseLabel(value) {
    return EVACUATION_PHASE_OPTIONS.find((option) => option.value === value)?.label || value || "-";
}

export function getWorkshopTypeLabel(value) {
    return WORKSHOP_TYPE_OPTIONS.find((option) => option.value === value)?.label || value || "-";
}

export function getStatusLabel(value) {
    return STATUS_OPTIONS.find((option) => option.value === value)?.label || value || "-";
}

export function getAttendanceStatusLabel(value) {
    return ATTENDANCE_STATUS_OPTIONS.find((option) => option.value === value)?.label || value || "-";
}

export function getResultStatusLabel(value) {
    return RESULT_STATUS_OPTIONS.find((option) => option.value === value)?.label || value || "-";
}

export function formatDate(value) {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString("nl-NL");
}

export function formatTime(value) {
    if (!value) return "-";
    return value.slice(0, 5);
}

export function toNullableNumber(value) {
    if (value === "" || value === null || value === undefined) {
        return null;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
}

export function buildCreateTrainingPayload(formData) {
    return {
        trainingType: resolveTrainingType(formData),
        courseDate: formData.courseDate || null,
        startTime: formData.startTime || null,
        endTime: formData.endTime || null,
        locationId: toNullableNumber(formData.locationId),
        companyId: toNullableNumber(formData.companyId),
        trainerId: toNullableNumber(formData.trainerId),

        competencyFirstAidEmergency: Boolean(formData.competencyFirstAidEmergency),
        competencyFirstAidNonEmergency: Boolean(formData.competencyFirstAidNonEmergency),
        competencyFireFighting: Boolean(formData.competencyFireFighting),
        competencyEvacuation: Boolean(formData.competencyEvacuation),
    };
}

export function buildUpdateTrainingPayload(formData) {
    return {
        courseDate: formData.courseDate || null,
        startTime: formData.startTime || null,
        endTime: formData.endTime || null,
        locationId: toNullableNumber(formData.locationId),
        companyId: toNullableNumber(formData.companyId),
        trainerId: toNullableNumber(formData.trainerId),

        competencyFirstAidEmergency: Boolean(formData.competencyFirstAidEmergency),
        competencyFirstAidNonEmergency: Boolean(formData.competencyFirstAidNonEmergency),
        competencyFireFighting: Boolean(formData.competencyFireFighting),
        competencyEvacuation: Boolean(formData.competencyEvacuation),

        adminOverrideAllowed: Boolean(formData.adminOverrideAllowed),
    };
}
