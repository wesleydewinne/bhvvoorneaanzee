import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinContactName } from "../helpers/contactName.js";
import quoteService from "../services/quoteService.js";
import "../styles/AdminQuotesPage.css";
import "../styles/AdminQuoteDetailPage.css";

const emptyCustomer = {
    companyName: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    customerReference: "",
};

const emptyTraining = () => ({
    trainingCode: "",
    participantCount: 1,
    internalNote: "",
});

const emptyTrainingLocation = {
    trainingLocationName: "",
    trainingLocationStreet: "",
    trainingLocationHouseNumber: "",
    trainingLocationPostalCode: "",
    trainingLocationCity: "",
    trainingLocationRoom: "",
    trainingLocationAccessInstructions: "",
};

function dateAfterMonths(months) {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toISOString().slice(0, 10);
}

export default function AdminCreateQuotePage() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(emptyCustomer);
    const [trainings, setTrainings] = useState([emptyTraining()]);
    const [trainingLocation, setTrainingLocation] = useState(emptyTrainingLocation);
    const [catalog, setCatalog] = useState([]);
    const [subject, setSubject] = useState("");
    const [introduction, setIntroduction] = useState(
    "Hartelijk dank voor uw aanvraag en uw interesse in de trainingen van BHV Voorne aan Zee. " +
    "Op basis van de door u verstrekte informatie hebben wij deze offerte zorgvuldig samengesteld. " +
    "Hieronder vindt u een overzicht van de voorgestelde training(en), de uitvoering en de bijbehorende kosten. " +
    "Onze trainingen worden op locatie verzorgd en waar mogelijk afgestemd op de werkomgeving en praktijksituatie binnen uw organisatie."
    );
    const [closingText, setClosingText] = useState(
        "Wij vertrouwen erop u hiermee een passend voorstel te hebben gedaan. " +
        "Heeft u vragen over deze offerte of wilt u onderdelen aanpassen, dan bespreken wij dit uiteraard graag met u. " +
        "Wij kijken ernaar uit om uw organisatie te mogen ondersteunen bij het vergroten van de veiligheid, kennis en handelingsvaardigheid van uw medewerkers."
    );
    const [validUntil, setValidUntil] = useState(dateAfterMonths(1));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        quoteService.getTrainingCatalog()
            .then((response) =>
                setCatalog(Array.isArray(response?.data) ? response.data : [])
            )
            .catch(() => setError("De trainingscatalogus kon niet worden geladen."));
    }, []);

    const updateCustomer = (name, value) => {
        setCustomer((current) => ({ ...current, [name]: value }));
    };

    const updateTraining = (index, name, value) => {
        setTrainings((current) => current.map((training, itemIndex) =>
            itemIndex === index ? { ...training, [name]: value } : training
        ));
    };

    const submit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const {
                contactFirstName,
                contactLastName,
                ...customerFields
            } = customer;
            const response = await quoteService.createAdminQuote({
                ...customerFields,
                contactPersonName: joinContactName(
                    contactFirstName,
                    contactLastName
                ),
                customerReference: customer.customerReference.trim() || null,
                contactPhone: customer.contactPhone.trim() || null,
                quoteSubject: subject.trim(),
                introductionText: introduction.trim() || null,
                closingText: closingText.trim() || null,
                validUntil,
                ...trainingLocation,
                trainingLocationName: trainingLocation.trainingLocationName.trim() || null,
                trainingLocationRoom: trainingLocation.trainingLocationRoom.trim() || null,
                trainingLocationAccessInstructions:
                    trainingLocation.trainingLocationAccessInstructions.trim() || null,
                trainings: trainings.map((training) => ({
                    trainingCode: training.trainingCode,
                    participantCount: Number(training.participantCount),
                    internalNote: training.internalNote.trim() || null,
                })),
                captcha: null,
                website: null,
            });

            navigate(`/admin/offertes/${response.data.id}`, { replace: true });
        } catch (requestError) {
            setError(
                requestError?.response?.data?.message ||
                requestError?.response?.data?.error ||
                "De offerte kon niet worden aangemaakt."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="quote-detail-page">
            <div className="quote-detail-header">
                <div>
                    <h1>Nieuwe offerte</h1>
                    <p>Maak een offerte op basis van de actuele trainingscatalogus.</p>
                </div>
                <button
                    type="button"
                    className="quote-back-btn"
                    onClick={() => navigate("/admin/offertes")}
                >
                    Annuleren
                </button>
            </div>

            {error && <p className="quote-feedback quote-feedback-error">{error}</p>}

            <form onSubmit={submit}>
                <section className="quote-detail-card">
                    <h2>Klantgegevens</h2>
                    <div className="quote-detail-grid">
                        {[
                            ["companyName", "Bedrijfsnaam"],
                            ["contactFirstName", "Voornaam"],
                            ["contactLastName", "Achternaam (incl. tussenvoegsel)"],
                            ["contactEmail", "E-mailadres", "email"],
                            ["contactPhone", "Telefoon"],
                            ["street", "Straat"],
                            ["houseNumber", "Huisnummer"],
                            ["postalCode", "Postcode"],
                            ["city", "Plaats"],
                            ["customerReference", "Klantreferentie"],
                        ].map(([name, label, type = "text"]) => (
                            <div key={name}>
                                <label htmlFor={`create-${name}`}>{label}</label>
                                <input
                                    id={`create-${name}`}
                                    type={type}
                                    value={customer[name]}
                                    onChange={(event) =>
                                        updateCustomer(name, event.target.value)
                                    }
                                    required={!["contactPhone", "customerReference"].includes(name)}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="quote-detail-card">
                    <h2>Trainingslocatie</h2>
                    <p>Deze gegevens worden op de offerte en in de PDF gebruikt.</p>
                    <div className="quote-detail-grid">
                        {[
                            ["trainingLocationName", "Locatienaam"],
                            ["trainingLocationStreet", "Straat"],
                            ["trainingLocationHouseNumber", "Huisnummer"],
                            ["trainingLocationPostalCode", "Postcode"],
                            ["trainingLocationCity", "Plaats"],
                            ["trainingLocationRoom", "Ruimte of terrein"],
                        ].map(([name, label]) => (
                            <div key={name}>
                                <label htmlFor={`create-${name}`}>{label}</label>
                                <input
                                    id={`create-${name}`}
                                    value={trainingLocation[name]}
                                    onChange={(event) => setTrainingLocation((current) => ({
                                        ...current,
                                        [name]: event.target.value,
                                    }))}
                                    required={["trainingLocationStreet", "trainingLocationHouseNumber", "trainingLocationPostalCode", "trainingLocationCity"].includes(name)}
                                />
                            </div>
                        ))}
                        <div className="quote-detail-col-span-2">
                            <label htmlFor="create-trainingLocationAccessInstructions">
                                Toegangs- en aanmeldinstructies
                            </label>
                            <textarea
                                id="create-trainingLocationAccessInstructions"
                                rows="3"
                                value={trainingLocation.trainingLocationAccessInstructions}
                                onChange={(event) => setTrainingLocation((current) => ({
                                    ...current,
                                    trainingLocationAccessInstructions: event.target.value,
                                }))}
                            />
                        </div>
                    </div>
                </section>

                <section className="quote-detail-card">
                    <h2>Offertegegevens</h2>
                    <div className="quote-detail-grid">
                        <div className="quote-detail-col-span-2">
                            <label htmlFor="create-subject">Onderwerp</label>
                            <input
                                id="create-subject"
                                value={subject}
                                onChange={(event) => setSubject(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="create-valid-until">Geldig tot</label>
                            <input
                                id="create-valid-until"
                                type="date"
                                value={validUntil}
                                onChange={(event) => setValidUntil(event.target.value)}
                                required
                            />
                        </div>
                        <div className="quote-detail-col-span-2">
                            <label htmlFor="create-introduction">Inleiding</label>
                            <textarea
                                id="create-introduction"
                                rows="4"
                                value={introduction}
                                onChange={(event) => setIntroduction(event.target.value)}
                            />
                        </div>
                        <div className="quote-detail-col-span-2">
                            <label htmlFor="create-closing">Afsluitende tekst</label>
                            <textarea
                                id="create-closing"
                                rows="3"
                                value={closingText}
                                onChange={(event) => setClosingText(event.target.value)}
                            />
                        </div>
                    </div>
                </section>

                <section className="quote-detail-card">
                    <div className="quote-training-header">
                        <div>
                            <h2>Trainingen</h2>
                            <p>Iedere regel gebruikt de actuele backendconfiguratie.</p>
                        </div>
                        <button
                            type="button"
                            className="quote-page-create-btn"
                            onClick={() =>
                                setTrainings((current) => [...current, emptyTraining()])
                            }
                        >
                            Training toevoegen
                        </button>
                    </div>

                    {trainings.map((training, index) => (
                        <div className="quote-detail-grid quote-admin-row" key={index}>
                            <div className="quote-detail-col-span-2">
                                <label>Training</label>
                                <select
                                    value={training.trainingCode}
                                    onChange={(event) =>
                                        updateTraining(index, "trainingCode", event.target.value)
                                    }
                                    required
                                >
                                    <option value="">Kies een training</option>
                                    {catalog.map((item) => (
                                        <option key={item.trainingConfigurationId} value={item.code}>
                                            {item.name} — € {item.sellingPrice}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Deelnemers</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={training.participantCount}
                                    onChange={(event) =>
                                        updateTraining(
                                            index,
                                            "participantCount",
                                            event.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label>Interne notitie</label>
                                <input
                                    value={training.internalNote}
                                    onChange={(event) =>
                                        updateTraining(index, "internalNote", event.target.value)
                                    }
                                />
                            </div>
                            {trainings.length > 1 && (
                                <button
                                    type="button"
                                    className="quote-btn quote-btn-danger"
                                    onClick={() =>
                                        setTrainings((current) =>
                                            current.filter((_, itemIndex) => itemIndex !== index)
                                        )
                                    }
                                >
                                    Training verwijderen
                                </button>
                            )}
                        </div>
                    ))}
                </section>

                <div className="quote-detail-actions">
                    <button
                        type="submit"
                        className="quote-btn quote-btn-primary"
                        disabled={saving}
                    >
                        {saving ? "Offerte opslaan..." : "Offerte aanmaken"}
                    </button>
                </div>
            </form>
        </section>
    );
}
