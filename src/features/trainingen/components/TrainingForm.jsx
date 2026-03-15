import { useEffect, useState } from "react";
import locationService from "@/features/locations/services/locationService.js";
import LocationSearchSelect from "./LocationSearchSelect.jsx";
import {
    buildCreateTrainingPayload,
    buildUpdateTrainingPayload,
    CATEGORY_OPTIONS,
    EVACUATION_PHASE_OPTIONS,
    VARIANT_OPTIONS,
    WORKSHOP_TYPE_OPTIONS,
} from "../helpers/trainingHelpers.js";

const defaultFormData = {
    category: "BHV",
    variant: "BASIS",
    evacuationPhase: "",
    workshopType: "",
    courseDate: "",
    startTime: "",
    endTime: "",
    locationId: "",
    trainerId: "",
    adminOverrideAllowed: false,
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

        setFormData({
            category: initialValues.category || "BHV",
            variant: initialValues.variant || "BASIS",
            evacuationPhase: initialValues.evacuationPhase || "",
            workshopType: initialValues.workshopType || "",
            courseDate: initialValues.courseDate || "",
            startTime: initialValues.startTime ? initialValues.startTime.slice(0, 5) : "",
            endTime: initialValues.endTime ? initialValues.endTime.slice(0, 5) : "",
            locationId: initialValues.locationId ? String(initialValues.locationId) : "",
            trainerId: initialValues.trainerId ? String(initialValues.trainerId) : "",
            adminOverrideAllowed: Boolean(initialValues.adminOverrideAllowed),
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

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleCategoryChange = (event) => {
        const nextCategory = event.target.value;

        setFormData((prev) => {
            const nextFormData = {
                ...prev,
                category: nextCategory,
                variant: "",
                evacuationPhase: "",
                workshopType: "",
            };

            if (nextCategory === "BHV" || nextCategory === "EHBO") {
                nextFormData.variant =
                    prev.category === nextCategory && prev.variant ? prev.variant : "BASIS";
            }

            if (nextCategory === "ONTRUIMING") {
                nextFormData.evacuationPhase =
                    prev.category === "ONTRUIMING" ? prev.evacuationPhase : "";
            }

            if (nextCategory === "WORKSHOP") {
                nextFormData.workshopType =
                    prev.category === "WORKSHOP" ? prev.workshopType : "";
            }

            return nextFormData;
        });
    };

    const handleLocationChange = (locationId) => {
        setFormData((prev) => ({
            ...prev,
            locationId,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload =
            mode === "edit"
                ? buildUpdateTrainingPayload(formData)
                : buildCreateTrainingPayload(formData);

        onSubmit?.(payload);
    };

    const showVariant = formData.category === "BHV" || formData.category === "EHBO";
    const showEvacuationPhase = formData.category === "ONTRUIMING";
    const showWorkshopType = formData.category === "WORKSHOP";

    return (
        <form className="training-form" onSubmit={handleSubmit}>
            {error && <p className="training-form__error">{error}</p>}

            <div className="training-form__grid">
                <div className="training-form__field">
                    <label htmlFor="category">Categorie</label>
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

                {showVariant && (
                    <div className="training-form__field">
                        <label htmlFor="variant">Variant</label>
                        <select
                            id="variant"
                            name="variant"
                            value={formData.variant}
                            onChange={handleChange}
                            disabled={mode === "edit"}
                        >
                            <option value="">Kies variant</option>
                            {VARIANT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {showEvacuationPhase && (
                    <div className="training-form__field">
                        <label htmlFor="evacuationPhase">Fase ontruiming</label>
                        <select
                            id="evacuationPhase"
                            name="evacuationPhase"
                            value={formData.evacuationPhase}
                            onChange={handleChange}
                        >
                            <option value="">Kies fase</option>
                            {EVACUATION_PHASE_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {showWorkshopType && (
                    <div className="training-form__field">
                        <label htmlFor="workshopType">Workshop type</label>
                        <select
                            id="workshopType"
                            name="workshopType"
                            value={formData.workshopType}
                            onChange={handleChange}
                        >
                            <option value="">Kies workshop</option>
                            {WORKSHOP_TYPE_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="training-form__field">
                    <label htmlFor="courseDate">Datum</label>
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
                    <label htmlFor="startTime">Starttijd</label>
                    <input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleChange}
                    />
                </div>

                <div className="training-form__field">
                    <label htmlFor="endTime">Eindtijd</label>
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
                    required
                    disabled={loading || locationsLoading}
                    error={locationsError}
                />

                <div className="training-form__field">
                    <label htmlFor="trainerId">Trainer ID</label>
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
                            Admin override toegestaan
                        </label>
                    </div>
                )}
            </div>

            <div className="training-form__actions">
                <button type="submit" disabled={loading || locationsLoading}>
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