import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuoteDetailMetaCard from "../components/QuoteDetailMetaCard.jsx";
import QuoteDetailCustomerCard from "../components/QuoteDetailCustomerCard.jsx";
import QuoteDetailTrainingCard from "../components/QuoteDetailTrainingCard.jsx";
import QuoteDetailNotesCard from "../components/QuoteDetailNotesCard.jsx";
import QuoteDetailActions from "../components/QuoteDetailActions.jsx";
import useQuoteDetail from "../hooks/useQuoteDetail.js";
import { formatCurrency } from "../helpers/quoteFormatters.js";
import "../styles/AdminQuoteDetailPage.css";

function toSafeNumber(value) {
    if (value === "" || value === null || value === undefined) {
        return 0;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
}

function roundCurrency(value) {
    return Math.round(value * 100) / 100;
}

function calculateTrainingSummary(trainings = [], formState = null, pricingTrainingIndex = null) {
    return trainings.reduce(
        (acc, training, index) => {
            const isActivePricingTraining = pricingTrainingIndex === index;

            const priceBeforeDiscount = isActivePricingTraining
                ? toSafeNumber(formState?.priceBeforeDiscount)
                : toSafeNumber(training?.priceBeforeDiscount ?? training?.totalPrice ?? 0);

            const discountAmount = isActivePricingTraining
                ? toSafeNumber(formState?.discountAmount)
                : toSafeNumber(training?.discountAmount);

            const travelSurcharge = isActivePricingTraining
                ? toSafeNumber(formState?.travelSurcharge)
                : toSafeNumber(training?.travelSurcharge);

            const totalPrice = isActivePricingTraining
                ? Math.max(
                    roundCurrency(priceBeforeDiscount - discountAmount + travelSurcharge),
                    0
                )
                : toSafeNumber(training?.totalPriceAfterDiscount ?? training?.totalPrice);

            const extraReturnKm = toSafeNumber(training?.extraReturnKm);

            acc.priceBeforeDiscount += priceBeforeDiscount;
            acc.discountAmount += discountAmount;
            acc.travelSurcharge += travelSurcharge;
            acc.totalPrice += totalPrice;
            acc.totalExtraKm += extraReturnKm;

            return acc;
        },
        {
            priceBeforeDiscount: 0,
            discountAmount: 0,
            travelSurcharge: 0,
            totalPrice: 0,
            totalExtraKm: 0
        }
    );
}

export default function AdminQuoteDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        quote,
        formState,
        trainingOptions,
        loading,
        saving,
        patchSaving,
        archiving,
        error,
        successMessage,
        statusChanged,
        pricingTrainingIndex,
        editingParticipantsIndex,
        participantDraft,
        updateField,
        handleStartEditPricing,
        handleDoneEditingPricing,
        handleCancelEditingPricing,
        handleStartEditParticipants,
        handleParticipantDraftChange,
        handleSaveParticipants,
        handleCancelEditParticipants,
        handleAddTraining,
        handleRemoveTraining,
        saveQuote,
        saveStatus,
        archiveQuote
    } = useQuoteDetail(id);

    const trainings = quote?.trainings ?? [];

    const calculatedSummary = useMemo(() => {
        return calculateTrainingSummary(trainings, formState, pricingTrainingIndex);
    }, [trainings, formState, pricingTrainingIndex]);

    const handleArchive = async () => {
        const confirmed = window.confirm(
            "Weet je zeker dat je deze offerte wilt archiveren?"
        );

        if (!confirmed) {
            return;
        }

        const archived = await archiveQuote();

        if (archived) {
            navigate("/admin/offertes");
        }
    };

    const handleDownloadQuote = () => {
        window.alert(
            "De downloadfunctie wordt later gekoppeld aan de backend. Het blok staat nu alvast op de juiste plek."
        );
    };

    const handleSaveQuote = async () => {
        return await saveQuote();
    };

    const handleSaveStatus = async () => {
        return await saveStatus();
    };

    if (loading) {
        return <div className="quote-detail-page">Offertedetail laden...</div>;
    }

    if (error && !quote) {
        return (
            <div className="quote-detail-page quote-feedback quote-feedback-error">
                {error}
            </div>
        );
    }

    if (!quote || !formState) {
        return <div className="quote-detail-page">Offerte niet gevonden.</div>;
    }

    return (
        <div className="quote-detail-page">
            <div className="quote-detail-header">
                <div>
                    <h1>Offerte {quote.quoteNumber}</h1>
                    <p>Beheer en werk de offerte verder af.</p>
                </div>

                <button
                    type="button"
                    className="quote-back-btn"
                    onClick={() => navigate("/admin/offertes")}
                >
                    Terug naar overzicht
                </button>
            </div>

            <div className="quote-detail-layout">
                <QuoteDetailMetaCard
                    quote={quote}
                    formState={formState}
                    onFieldChange={updateField}
                    onSaveStatus={handleSaveStatus}
                    patchSaving={patchSaving}
                    statusChanged={statusChanged}
                />

                <QuoteDetailCustomerCard quote={quote} />

                <QuoteDetailTrainingCard
                    trainings={trainings}
                    trainingOptions={trainingOptions}
                    formState={formState}
                    editingParticipantsIndex={editingParticipantsIndex}
                    participantDraft={participantDraft}
                    pricingTrainingIndex={pricingTrainingIndex}
                    onAddTraining={handleAddTraining}
                    onStartEditParticipants={handleStartEditParticipants}
                    onParticipantDraftChange={handleParticipantDraftChange}
                    onSaveParticipants={handleSaveParticipants}
                    onCancelEditParticipants={handleCancelEditParticipants}
                    onStartEditPricing={handleStartEditPricing}
                    onDoneEditingPricing={handleDoneEditingPricing}
                    onCancelEditingPricing={handleCancelEditingPricing}
                    onFieldChange={updateField}
                    onRemoveTraining={handleRemoveTraining}
                />

                <QuoteDetailNotesCard
                    formState={formState}
                    onFieldChange={updateField}
                />
            </div>

            <div className="quote-bottom-layout">
                <section className="quote-detail-card">
                    <h2>Prijs en berekening</h2>

                    <div className="quote-pricing-summary">
                        <div>
                            <span>Prijs vóór korting</span>
                            <strong>
                                {formatCurrency(calculatedSummary.priceBeforeDiscount)}
                            </strong>
                        </div>

                        <div>
                            <span>Berekend kortingsbedrag</span>
                            <strong>
                                {formatCurrency(calculatedSummary.discountAmount)}
                            </strong>
                        </div>

                        <div>
                            <span>Totale extra retour-km</span>
                            <strong>{calculatedSummary.totalExtraKm.toFixed(2)} km</strong>
                        </div>

                        <div>
                            <span>Totale reiskosten</span>
                            <strong>
                                {formatCurrency(calculatedSummary.travelSurcharge)}
                            </strong>
                        </div>

                        <div>
                            <span>Berekend eindtotaal</span>
                            <strong>
                                {formatCurrency(calculatedSummary.totalPrice)}
                            </strong>
                        </div>
                    </div>
                </section>

                <section className="quote-detail-card">
                    <h2>Offerte downloaden</h2>

                    <p className="quote-download-text">
                        Download hier straks eenvoudig de actuele offerte of een losse versie
                        voor controle en verzending.
                    </p>

                    <div className="quote-download-actions">
                        <button
                            type="button"
                            className="quote-btn quote-btn-primary"
                            onClick={handleDownloadQuote}
                        >
                            Offerte downloaden
                        </button>

                        <div className="quote-download-note">
                            <strong>Later uit te breiden</strong>
                            <p>
                                Bijvoorbeeld met aparte downloads voor prijsopbouw,
                                trainingsoverzicht of definitieve offerte-pdf.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {error && <div className="quote-feedback quote-feedback-error">{error}</div>}
            {successMessage && (
                <div className="quote-feedback quote-feedback-success">
                    {successMessage}
                </div>
            )}

            <QuoteDetailActions
                saving={saving}
                archiving={archiving}
                onSave={handleSaveQuote}
                onArchive={handleArchive}
            />
        </div>
    );
}