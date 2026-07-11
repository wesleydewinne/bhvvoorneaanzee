import { useEffect, useMemo, useState } from "react";
import {
    Building2,
    CalendarDays,
    CheckCircle2,
    Clock,
    GraduationCap,
    Plus,
    Save,
    ShieldCheck,
    UserRound,
} from "lucide-react";
import locationService from "@/features/locations/services/locationService.js";
import LocationSearchSelect from "./LocationSearchSelect.jsx";
import {
    buildCreateTrainingPayload,
    buildUpdateTrainingPayload,
    CATEGORY_OPTIONS,
    getTrainingTypeOptionsByCategory,
} from "../helpers/trainingHelpers.js";

function resolveCategoryFromTrainingType(trainingType, fallbackCategory = "BHV") {
    if (!trainingType) return fallbackCategory;

    if (trainingType.startsWith("BHV_PLOEGLEIDER")) {
        return "PLOEGLEIDER";
    }

    if (trainingType.startsWith("BHV_")) {
        return "BHV";
    }

    if (trainingType.startsWith("EHBO_")) {
        return "EHBO";
    }

    if (trainingType.startsWith("EVACUATION_")) {
        return "ONTRUIMING";
    }

    if (trainingType.startsWith("WORKSHOP_")) {
        return "WORKSHOP";
    }

    return fallbackCategory;
}

function getDefaultTrainingType(category) {
    return getTrainingTypeOptionsByCategory(category)[0]?.value || "";
}

const defaultCategory = "BHV";
const defaultTrainingType = getDefaultTrainingType(defaultCategory);

const defaultFormData = {
    companyId: "",
    category: defaultCategory,
    trainingType: defaultTrainingType,
    variant: defaultTrainingType,
    evacuationPhase: "",
    workshopType: "",
    courseDate: "",
    startTime: "",
    endTime: "",
    locationId: "",
    trainerId: "",
    adminOverrideAllowed: false,

    competencyFirstAidEmergency: true,
    competencyFirstAidNonEmergency: true,
    competencyFireFighting: true,
    competencyEvacuation: true,
};

function TrainingForm({
                          initialValues = null,
                          mode = "create",
                          onSubmit,
                          loading = false,
                          error = "",
                      }) {
    const [formData, setFormData] = useState(defaultFormData);
    const [locations, setLocations] = useState([]);
    const [locationsLoading, setLocationsLoading] = useState(true);
    const [locationsError, setLocationsError] = useState("");

    useEffect(() => {
        if (!initialValues) {
            setFormData(defaultFormData);
            return;
        }

        const initialTrainingType = initialValues.trainingType || "";
        const initialCategory = resolveCategoryFromTrainingType(
            initialTrainingType,
            initialValues.category || "BHV"
        );

        setFormData({
            companyId: initialValues.companyId ? String(initialValues.companyId) : "",
            category: initialCategory,
            trainingType: initialTrainingType || getDefaultTrainingType(initialCategory),

            variant:
                initialCategory === "BHV" ||
                initialCategory === "PLOEGLEIDER" ||
                initialCategory === "EHBO"
                    ? initialTrainingType || getDefaultTrainingType(initialCategory)
                    : "",

            evacuationPhase:
                initialCategory === "ONTRUIMING"
                    ? initialTrainingType || getDefaultTrainingType(initialCategory)
                    : "",

            workshopType:
                initialCategory === "WORKSHOP"
                    ? initialTrainingType || getDefaultTrainingType(initialCategory)
                    : "",

            courseDate: initialValues.courseDate || "",
            startTime: initialValues.startTime ? initialValues.startTime.slice(0, 5) : "",
            endTime: initialValues.endTime ? initialValues.endTime.slice(0, 5) : "",
            locationId: initialValues.locationId ? String(initialValues.locationId) : "",
            trainerId: initialValues.trainerId ? String(initialValues.trainerId) : "",
            adminOverrideAllowed: Boolean(initialValues.adminOverrideAllowed),

            competencyFirstAidEmergency: Boolean(initialValues.competencyFirstAidEmergency),
            competencyFirstAidNonEmergency: Boolean(initialValues.competencyFirstAidNonEmergency),
            competencyFireFighting: Boolean(initialValues.competencyFireFighting),
            competencyEvacuation: Boolean(initialValues.competencyEvacuation),
        });
    }, [initialValues]);

    useEffect(() => {
        const loadLocations = async () => {
            try {
                setLocationsLoading(true);
                setLocationsError("");

                const data = await locationService.getAll();
                setLocations(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Fout bij ophalen locaties:", err);

                const backendMessage =
                    err?.response?.data?.message ||
                    err?.response?.data?.error ||
                    (typeof err?.response?.data === "string" ? err.response.data : null);

                setLocationsError(
                    backendMessage || err?.message || "Kon locaties niet ophalen."
                );
                setLocations([]);
            } finally {
                setLocationsLoading(false);
            }
        };

        loadLocations();
    }, []);

    const selectedLocation = useMemo(() => {
        if (!formData.locationId) {
            return null;
        }

        return (
            locations.find(
                (location) => String(location.id) === String(formData.locationId)
            ) || null
        );
    }, [locations, formData.locationId]);

    const linkedCompanies = useMemo(() => {
        if (!selectedLocation || !Array.isArray(selectedLocation.companies)) {
            return [];
        }

        return selectedLocation.companies;
    }, [selectedLocation]);

    useEffect(() => {
        if (!selectedLocation) {
            setFormData((prev) => ({
                ...prev,
                companyId: "",
            }));
            return;
        }

        if (linkedCompanies.length === 1) {
            setFormData((prev) => ({
                ...prev,
                companyId: String(linkedCompanies[0].id),
            }));
            return;
        }

        const selectedCompanyStillExists = linkedCompanies.some(
            (company) => String(company.id) === String(formData.companyId)
        );

        if (!selectedCompanyStillExists) {
            setFormData((prev) => ({
                ...prev,
                companyId: "",
            }));
        }
    }, [selectedLocation, linkedCompanies, formData.companyId]);

    const trainingTypeOptions = useMemo(() => {
        return getTrainingTypeOptionsByCategory(formData.category);
    }, [formData.category]);

    const selectedTrainingTypeValue = useMemo(() => {
        if (
            formData.category === "BHV" ||
            formData.category === "PLOEGLEIDER" ||
            formData.category === "EHBO"
        ) {
            return formData.variant;
        }

        if (formData.category === "ONTRUIMING") {
            return formData.evacuationPhase;
        }

        if (formData.category === "WORKSHOP") {
            return formData.workshopType;
        }

        return formData.trainingType;
    }, [
        formData.category,
        formData.variant,
        formData.evacuationPhase,
        formData.workshopType,
        formData.trainingType,
    ]);

    const getTrainingTypeLabel = () => {
        if (formData.category === "ONTRUIMING") {
            return "Fase ontruiming";
        }

        if (formData.category === "WORKSHOP") {
            return "Workshop type";
        }

        return "Trainingstype";
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleCategoryChange = (event) => {
        const nextCategory = event.target.value;
        const nextTrainingType = getDefaultTrainingType(nextCategory);

        setFormData((prev) => ({
            ...prev,
            category: nextCategory,
            trainingType: nextTrainingType,
            variant:
                nextCategory === "BHV" ||
                nextCategory === "PLOEGLEIDER" ||
                nextCategory === "EHBO"
                    ? nextTrainingType
                    : "",
            evacuationPhase:
                nextCategory === "ONTRUIMING" ? nextTrainingType : "",
            workshopType:
                nextCategory === "WORKSHOP" ? nextTrainingType : "",
        }));
    };

    const handleTrainingTypeChange = (event) => {
        const nextTrainingType = event.target.value;

        setFormData((prev) => ({
            ...prev,
            trainingType: nextTrainingType,

            variant:
                prev.category === "BHV" ||
                prev.category === "PLOEGLEIDER" ||
                prev.category === "EHBO"
                    ? nextTrainingType
                    : "",

            evacuationPhase:
                prev.category === "ONTRUIMING" ? nextTrainingType : "",

            workshopType:
                prev.category === "WORKSHOP" ? nextTrainingType : "",
        }));
    };

    const handleLocationChange = (locationId) => {
        setFormData((prev) => ({
            ...prev,
            locationId,
            companyId: "",
        }));
    };

    const handleSelectLocation = (location) => {
        const companies = Array.isArray(location?.companies) ? location.companies : [];

        setFormData((prev) => ({
            ...prev,
            locationId: location?.id ? String(location.id) : "",
            companyId: companies.length === 1 ? String(companies[0].id) : "",
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload =
            mode === "edit"
                ? buildUpdateTrainingPayload(formData)
                : buildCreateTrainingPayload(formData);

        console.log("Training payload:", JSON.stringify(payload, null, 2));

        onSubmit?.(payload);
    };

    return (
        <form className="training-form" onSubmit={handleSubmit}>
            {error && <p className="training-form__error">{error}</p>}

            <div className="training-form__grid">
                <div className="training-form__field">
                    <label htmlFor="category">
                        <ShieldCheck aria-hidden="true" />
                        Categorie
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        disabled={mode === "edit"}
                    >
                        {CATEGORY_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="training-form__field">
                    <label htmlFor="trainingType">
                        <GraduationCap aria-hidden="true" />
                        {getTrainingTypeLabel()}
                    </label>
                    <select
                        id="trainingType"
                        name="trainingType"
                        value={selectedTrainingTypeValue}
                        onChange={handleTrainingTypeChange}
                        disabled={mode === "edit"}
                        required
                    >
                        <option value="">Kies trainingstype</option>

                        {trainingTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="training-form__field">
                    <label htmlFor="courseDate">
                        <CalendarDays aria-hidden="true" />
                        Datum
                    </label>
                    <input
                        id="courseDate"
                        name="courseDate"
                        type="date"
                        value={formData.courseDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="training-form__field">
                    <label htmlFor="startTime">
                        <Clock aria-hidden="true" />
                        Starttijd
                    </label>
                    <input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleChange}
                    />
                </div>

                <div className="training-form__field">
                    <label htmlFor="endTime">
                        <Clock aria-hidden="true" />
                        Eindtijd
                    </label>
                    <input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleChange}
                    />
                </div>

                <LocationSearchSelect
                    locations={locations}
                    value={formData.locationId}
                    onChange={handleLocationChange}
                    onSelectLocation={handleSelectLocation}
                    required
                    disabled={loading || locationsLoading}
                    error={locationsError}
                />

                <div className="training-form__field">
                    <label htmlFor="companyId">
                        <Building2 aria-hidden="true" />
                        Bedrijf
                    </label>

                    <select
                        id="companyId"
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleChange}
                        required
                        disabled={
                            loading ||
                            locationsLoading ||
                            !selectedLocation ||
                            linkedCompanies.length === 0
                        }
                    >
                        <option value="">
                            {!selectedLocation
                                ? "Kies eerst een locatie"
                                : linkedCompanies.length === 0
                                    ? "Geen bedrijven gekoppeld"
                                    : "Kies bedrijf"}
                        </option>

                        {linkedCompanies.map((company) => (
                            <option key={company.id} value={String(company.id)}>
                                {company.name}
                            </option>
                        ))}
                    </select>

                    {selectedLocation && linkedCompanies.length === 1 && (
                        <small className="training-form__hint">
                            Automatisch gekozen: {linkedCompanies[0].name}
                        </small>
                    )}

                    {selectedLocation && linkedCompanies.length > 1 && (
                        <small className="training-form__hint">
                            Deze locatie heeft meerdere bedrijven. Kies het juiste bedrijf.
                        </small>
                    )}

                    {selectedLocation && linkedCompanies.length === 0 && (
                        <small className="training-form__field-error">
                            Deze locatie heeft nog geen gekoppeld bedrijf. Koppel eerst een
                            bedrijf aan deze locatie.
                        </small>
                    )}
                </div>

                <div className="training-form__field">
                    <label htmlFor="trainerId">
                        <UserRound aria-hidden="true" />
                        Trainer ID
                    </label>
                    <input
                        id="trainerId"
                        name="trainerId"
                        type="number"
                        min="1"
                        value={formData.trainerId}
                        onChange={handleChange}
                        placeholder="Optioneel"
                    />
                    <small className="training-form__hint">
                        Trainer mag leeg blijven.
                    </small>
                </div>

                <div className="training-form__field training-form__field--checkbox">
                    <label htmlFor="competencyFirstAidEmergency">
                        <input
                            id="competencyFirstAidEmergency"
                            name="competencyFirstAidEmergency"
                            type="checkbox"
                            checked={formData.competencyFirstAidEmergency}
                            onChange={handleChange}
                        />
                        <CheckCircle2 aria-hidden="true" />
                        Levensreddend handelen spoed
                    </label>
                </div>

                <div className="training-form__field training-form__field--checkbox">
                    <label htmlFor="competencyFirstAidNonEmergency">
                        <input
                            id="competencyFirstAidNonEmergency"
                            name="competencyFirstAidNonEmergency"
                            type="checkbox"
                            checked={formData.competencyFirstAidNonEmergency}
                            onChange={handleChange}
                        />
                        <CheckCircle2 aria-hidden="true" />
                        Eerste hulp niet-spoed
                    </label>
                </div>

                <div className="training-form__field training-form__field--checkbox">
                    <label htmlFor="competencyFireFighting">
                        <input
                            id="competencyFireFighting"
                            name="competencyFireFighting"
                            type="checkbox"
                            checked={formData.competencyFireFighting}
                            onChange={handleChange}
                        />
                        <CheckCircle2 aria-hidden="true" />
                        Brandbestrijding
                    </label>
                </div>

                <div className="training-form__field training-form__field--checkbox">
                    <label htmlFor="competencyEvacuation">
                        <input
                            id="competencyEvacuation"
                            name="competencyEvacuation"
                            type="checkbox"
                            checked={formData.competencyEvacuation}
                            onChange={handleChange}
                        />
                        <CheckCircle2 aria-hidden="true" />
                        Ontruiming
                    </label>
                </div>

                {mode === "edit" && (
                    <div className="training-form__field training-form__field--checkbox">
                        <label htmlFor="adminOverrideAllowed">
                            <input
                                id="adminOverrideAllowed"
                                name="adminOverrideAllowed"
                                type="checkbox"
                                checked={formData.adminOverrideAllowed}
                                onChange={handleChange}
                            />
                            <CheckCircle2 aria-hidden="true" />
                            Admin override toegestaan
                        </label>
                    </div>
                )}
            </div>

            <div className="training-form__actions">
                <button
                    type="submit"
                    disabled={
                        loading ||
                        locationsLoading ||
                        !formData.locationId ||
                        !formData.companyId ||
                        !selectedTrainingTypeValue
                    }
                >
                    {mode === "edit" ? <Save aria-hidden="true" /> : <Plus aria-hidden="true" />}
                    {loading
                        ? "Opslaan..."
                        : mode === "edit"
                            ? "Training opslaan"
                            : "Training aanmaken"}
                </button>
            </div>
        </form>
    );
}

export default TrainingForm;
