export const CATEGORY_OPTIONS = [
    { value: "BHV", label: "BHV" },
    { value: "EHBO", label: "EHBO" },
    { value: "ONTRUIMING", label: "Ontruimingsoefening" },
    { value: "WORKSHOP", label: "Workshop" },
];

export const VARIANT_OPTIONS = [
    { value: "BASIS", label: "Basis" },
    { value: "HERHALING", label: "Herhaling" },
    { value: "BASIS_ELEARNING", label: "Basis e-learning" },
    { value: "HERHALING_ELEARNING", label: "Herhaling e-learning" },
];

export const EVACUATION_PHASE_OPTIONS = [
    { value: "FASE_0_TABLETOP", label: "Fase 0 - Tabletop" },
    { value: "FASE_1_KLEINE_SCENARIOS", label: "Fase 1 - Kleine scenario's" },
    { value: "FASE_2_AANGEKONDIGDE_OEFENING", label: "Fase 2 - Aangekondigde oefening" },
    { value: "FASE_3_ONAANGEKONDIGDE_OEFENING", label: "Fase 3 - Onaangekondigde oefening" },
    {
        value: "FASE_4_ONAANGEKONDIGDE_OEFENING_MET_MEER_UITDAGING",
        label: "Fase 4 - Onaangekondigd met meer uitdaging",
    },
];

export const WORKSHOP_TYPE_OPTIONS = [
    { value: "REANIMATIE_AED", label: "Reanimatie & AED" },
    { value: "STOP_DE_BLOEDING", label: "Stop de Bloeding" },
    { value: "BRAND_BLUSSEN", label: "Brand blussen" },
    { value: "ONTRUIMING_TOOLBOX", label: "Ontruiming toolbox" },
    { value: "EHBO_BASIS", label: "EHBO basis" },
    { value: "EHBO_HERHALING", label: "EHBO herhaling" },
    { value: "BHV_PRAKTIJKMODULE", label: "BHV praktijkmodule" },
];

export const STATUS_OPTIONS = [
    { value: "PLANNED", label: "Gepland" },
    { value: "IN_PROGRESS", label: "Bezig" },
    { value: "COMPLETED", label: "Afgerond" },
    { value: "CANCELLED", label: "Geannuleerd" },
];

export function getCategoryLabel(value) {
    return CATEGORY_OPTIONS.find((option) => option.value === value)?.label || value || "-";
}

export function getVariantLabel(value) {
    return VARIANT_OPTIONS.find((option) => option.value === value)?.label || value || "-";
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
        category: formData.category || null,
        variant:
            formData.category === "BHV" || formData.category === "EHBO"
                ? formData.variant || null
                : null,
        evacuationPhase:
            formData.category === "ONTRUIMING"
                ? formData.evacuationPhase || null
                : null,
        workshopType:
            formData.category === "WORKSHOP"
                ? formData.workshopType || null
                : null,
        courseDate: formData.courseDate || null,
        startTime: formData.startTime || null,
        endTime: formData.endTime || null,
        locationId: toNullableNumber(formData.locationId),
        trainerId: toNullableNumber(formData.trainerId),
    };
}

export function buildUpdateTrainingPayload(formData) {
    return {
        courseDate: formData.courseDate || null,
        startTime: formData.startTime || null,
        endTime: formData.endTime || null,
        locationId: toNullableNumber(formData.locationId),
        evacuationPhase:
            formData.category === "ONTRUIMING"
                ? formData.evacuationPhase || null
                : null,
        workshopType:
            formData.category === "WORKSHOP"
                ? formData.workshopType || null
                : null,
        trainerId: toNullableNumber(formData.trainerId),
        adminOverrideAllowed: Boolean(formData.adminOverrideAllowed),
    };
}