import { useEffect, useState } from "react";
import evaluationService from "../services/evaluationService";
import "../styles/evaluationPage.css";

const initialForm = {
    trainingValue: "",
    practiceUse: "",
    theoryPracticeBalance: "",
    paceTiming: "",
    metExpectations: "",
    instructorClarity: "",
    instructorGuidance: "",
    instructorExpertise: "",
    locationSuitability: "",
    locationAccess: "",
    recommend: "",
    commentStrong: "",
    commentImprove: "",
    commentOther: "",
    token: "",
};

export default function EvaluationPage() {
    const [formData, setFormData] = useState(initialForm);
    const [context, setContext] = useState(null);
    const [loadingContext, setLoadingContext] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadContext() {
            try {
                setLoadingContext(true);
                setErrorMessage("");

                const searchParams = new URLSearchParams(window.location.search);
                const token = searchParams.get("t") || "";

                if (!token) {
                    setErrorMessage("Geen geldig evaluatietoken gevonden.");
                    return;
                }

                const contextData = await evaluationService.getContext(token);

                setContext(contextData);
                setFormData((prev) => ({
                    ...prev,
                    token,
                }));
            } catch (err) {
                console.error(err);
                setErrorMessage("Het laden van de evaluatiecontext is mislukt.");
            } finally {
                setLoadingContext(false);
            }
        }

        loadContext();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSubmitting(true);
            setErrorMessage("");
            setSuccessMessage("");

            await evaluationService.submitEvaluation({
                ...formData,
                trainingValue: Number(formData.trainingValue),
                practiceUse: Number(formData.practiceUse),
                theoryPracticeBalance: Number(formData.theoryPracticeBalance),
                paceTiming: Number(formData.paceTiming),
                metExpectations: Number(formData.metExpectations),
                instructorClarity: Number(formData.instructorClarity),
                instructorGuidance: Number(formData.instructorGuidance),
                instructorExpertise: Number(formData.instructorExpertise),
                locationSuitability: Number(formData.locationSuitability),
                locationAccess: Number(formData.locationAccess),
                recommend: Number(formData.recommend),
            });

            setSubmitted(true);
            setSuccessMessage("Bedankt! Je evaluatie is succesvol verzonden.");
        } catch (err) {
            console.error(err);
            setErrorMessage("Het versturen van de evaluatie is mislukt.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="evaluation-page">
            <div className="evaluation-page__container">
                <header className="evaluation-page__header">
                    <h1>Training evalueren</h1>
                    <p className="evaluation-page__intro">
                        Vul hieronder jouw evaluatie van de training in.
                    </p>
                </header>

                {loadingContext && (
                    <div className="evaluation-page__message">
                        <p>Gegevens laden...</p>
                    </div>
                )}

                {errorMessage && (
                    <div className="evaluation-page__message evaluation-page__message--error">
                        <p>{errorMessage}</p>
                    </div>
                )}

                {successMessage && (
                    <div className="evaluation-page__message evaluation-page__message--success">
                        <p>{successMessage}</p>
                    </div>
                )}

                {!loadingContext && !errorMessage && (
                    <>
                        <section
                            className="evaluation-context"
                            aria-labelledby="evaluation-context-title"
                        >
                            <h2 id="evaluation-context-title">Trainingsgegevens</h2>

                            <div className="evaluation-context__list">
                                <div className="evaluation-context__item">
                                    <p>
                                        <strong>Training:</strong> {context?.trainingTitle ?? "-"}
                                    </p>
                                </div>

                                <div className="evaluation-context__item">
                                    <p>
                                        <strong>Locatie:</strong> {context?.locationName ?? "-"}
                                    </p>
                                </div>

                                <div className="evaluation-context__item">
                                    <p>
                                        <strong>Datum:</strong> {context?.trainingDate ?? "-"}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {!submitted && (
                            <section
                                className="evaluation-form-section"
                                aria-labelledby="evaluation-form-title"
                            >
                                <h2 id="evaluation-form-title">Evaluatieformulier</h2>

                                <form className="evaluation-form" onSubmit={handleSubmit}>
                                    <fieldset>
                                        <legend>Training</legend>

                                        <div className="evaluation-form__group evaluation-form__group--two-columns">
                                            <div className="evaluation-form__field">
                                                <label htmlFor="trainingValue">Waarde training</label>
                                                <input
                                                    id="trainingValue"
                                                    name="trainingValue"
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={formData.trainingValue}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="evaluation-form__field">
                                                <label htmlFor="practiceUse">Praktisch toepasbaar</label>
                                                <input
                                                    id="practiceUse"
                                                    name="practiceUse"
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={formData.practiceUse}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="evaluation-form__field">
                                                <label htmlFor="theoryPracticeBalance">
                                                    Balans theorie / praktijk
                                                </label>
                                                <input
                                                    id="theoryPracticeBalance"
                                                    name="theoryPracticeBalance"
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={formData.theoryPracticeBalance}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="evaluation-form__field">
                                                <label htmlFor="paceTiming">Tempo / timing</label>
                                                <input
                                                    id="paceTiming"
                                                    name="paceTiming"
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={formData.paceTiming}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="evaluation-form__field">
                                                <label htmlFor="metExpectations">
                                                    Voldeed aan verwachting
                                                </label>
                                                <input
                                                    id="metExpectations"
                                                    name="metExpectations"
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={formData.metExpectations}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <legend>Instructeur</legend>

                                        <div className="evaluation-form__group evaluation-form__group--two-columns">
                                            <div className="evaluation-form__field">
                                                <label htmlFor="instructorClarity">
                                                    Duidelijkheid instructeur
                                                </label>
                                                <input
                                                    id="instructorClarity"
                                                    name="instructorClarity"
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={formData.instructorClarity}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="evaluation-form__field">
                                                <label htmlFor="instructorGuidance">
                                                    Begeleiding instructeur
                                                </label>
                                                <input
                                                    id="instructorGuidance"
                                                    name="instructorGuidance"
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={formData.instructorGuidance}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="evaluation-form__field">
                                                <label htmlFor="instructorExpertise">
                                                    Deskundigheid instructeur
                                                </label>
                                                <input
                                                    id="instructorExpertise"
                                                    name="instructorExpertise"
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={formData.instructorExpertise}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <legend>Locatie</legend>

                                        <div className="evaluation-form__group evaluation-form__group--two-columns">
                                            <div className="evaluation-form__field">
                                                <label htmlFor="locationSuitability">
                                                    Geschiktheid locatie
                                                </label>
                                                <input
                                                    id="locationSuitability"
                                                    name="locationSuitability"
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={formData.locationSuitability}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="evaluation-form__field">
                                                <label htmlFor="locationAccess">
                                                    Bereikbaarheid locatie
                                                </label>
                                                <input
                                                    id="locationAccess"
                                                    name="locationAccess"
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={formData.locationAccess}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <legend>Algemeen</legend>

                                        <div className="evaluation-form__group">
                                            <div className="evaluation-form__field">
                                                <label htmlFor="recommend">
                                                    Zou je deze training aanbevelen?
                                                </label>
                                                <input
                                                    id="recommend"
                                                    name="recommend"
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={formData.recommend}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <p className="evaluation-form__hint">
                                                    Geef een score van 1 tot en met 5.
                                                </p>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <legend>Opmerkingen</legend>

                                        <div className="evaluation-form__group">
                                            <div className="evaluation-form__field">
                                                <label htmlFor="commentStrong">Wat vond je sterk?</label>
                                                <textarea
                                                    id="commentStrong"
                                                    name="commentStrong"
                                                    rows="4"
                                                    value={formData.commentStrong}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="evaluation-form__field">
                                                <label htmlFor="commentImprove">Wat kan beter?</label>
                                                <textarea
                                                    id="commentImprove"
                                                    name="commentImprove"
                                                    rows="4"
                                                    value={formData.commentImprove}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="evaluation-form__field">
                                                <label htmlFor="commentOther">Overige opmerkingen</label>
                                                <textarea
                                                    id="commentOther"
                                                    name="commentOther"
                                                    rows="4"
                                                    value={formData.commentOther}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div className="evaluation-form__actions">
                                        <button
                                            className="evaluation-form__submit"
                                            type="submit"
                                            disabled={submitting}
                                        >
                                            {submitting ? "Bezig met verzenden..." : "Evaluatie versturen"}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}