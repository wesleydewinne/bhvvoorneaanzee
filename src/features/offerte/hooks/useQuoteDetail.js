import useQuoteDetailData from "./useQuoteDetailData.js";
import useQuoteDetailForm from "./useQuoteDetailForm.js";
import useQuoteDetailTrainings from "./useQuoteDetailTrainings.js";
import useQuoteDetailActions from "./useQuoteDetailActions.js";

export default function useQuoteDetail(id) {
    const {
        quote,
        setQuote,
        trainingOptions,
        loading,
        error,
        setError,
        loadQuote
    } = useQuoteDetailData(id);

    const {
        formState,
        setFormState,
        updateField
    } = useQuoteDetailForm(quote);

    const trainings = useQuoteDetailTrainings({
        setFormState,
        setError
    });

    const actions = useQuoteDetailActions({
        id,
        quote,
        formState,
        setQuote,
        setFormState,
        loadQuote,
        setError
    });

    const handleAddTraining = async (trainingType) => {
        return actions.addTraining(trainingType, trainingOptions);
    };

    const handleRemoveTraining = async (indexToRemove) => {
        const saved = await actions.removeTraining(indexToRemove);

        if (saved) {
            if (trainings.pricingTrainingIndex === indexToRemove) {
                trainings.resetPricingEditState();
            }

            if (trainings.editingParticipantsIndex === indexToRemove) {
                trainings.resetParticipantEditState();
            }
        }

        return saved;
    };

    const handleDoneEditingPricing = async () => {
        const saved = await actions.updateTrainingPricing(
            trainings.pricingTrainingIndex,
            formState
        );

        if (saved) {
            trainings.resetPricingEditState();
        }

        return saved;
    };

    const handleSaveParticipants = async (index) => {
        const saved = await actions.updateTrainingParticipants(
            index,
            trainings.participantDraft
        );

        if (saved) {
            trainings.resetParticipantEditState();
        }

        return saved;
    };

    const statusChanged = Boolean(
        quote &&
        formState &&
        formState.status !== quote.status
    );

    return {
        quote,
        formState,
        trainingOptions,
        loading,
        saving: actions.saving,
        patchSaving: actions.patchSaving,
        archiving: actions.archiving,
        error,
        successMessage: actions.successMessage,
        statusChanged,

        pricingTrainingIndex: trainings.pricingTrainingIndex,
        editingParticipantsIndex: trainings.editingParticipantsIndex,
        participantDraft: trainings.participantDraft,

        updateField,

        handleStartEditPricing: trainings.handleStartEditPricing,
        handleDoneEditingPricing,
        handleCancelEditingPricing: trainings.handleCancelEditingPricing,

        handleStartEditParticipants: trainings.handleStartEditParticipants,
        handleParticipantDraftChange: trainings.handleParticipantDraftChange,
        handleSaveParticipants,
        handleCancelEditParticipants: trainings.handleCancelEditParticipants,

        handleAddTraining,
        handleRemoveTraining,

        saveQuote: actions.saveQuote,
        saveStatus: actions.saveStatus,
        archiveQuote: actions.archiveQuote,
        refresh: loadQuote
    };
}