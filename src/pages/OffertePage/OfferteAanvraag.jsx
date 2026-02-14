import { useState, useEffect } from "react";
import api from "@/api/api";
import PhoneInput from "@/shared/components/form/phoneInput/PhoneInput.jsx";
import { validatePhone } from "@/shared/utils/validatePhone.js";
import "./OfferteAanvraag.css";
import InfoPopup from "@/shared/components/ui/popup/InfoPopup";

export default function OfferteAanvraag() {

    // ========================================
    // STATES
    // ========================================
    const [klant, setKlant] = useState({
        voornaam: "",
        achternaam: "",
        bedrijf: "",
        email: "",
        telefoon: "",
        straat: "",
        huisnummer: "",
        postcode: "",
        plaats: ""
    });

    const [trainings, setTrainings] = useState([
        { trainingType: "", aantal: 1, eigenLocatie: true }
    ]);

    const [trainingOpties, setTrainingOpties] = useState([]);
    const [errors, setErrors] = useState({});
    const [verzonden, setVerzonden] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(true);

    // Overleg-modus
    const [overlegModus, setOverlegModus] = useState(false);
    const [opmerkingen, setOpmerkingen] = useState("");

    // ========================================
    // HELPERS
    // ========================================
    const normalizeNlPhone = (phone) => {
        if (!phone) return "";
        if (/^\d{9}$/.test(phone)) return `0${phone}`;
        return phone;
    };

    // ========================================
    // TRAINING TYPES UIT BACKEND
    // ========================================
    useEffect(() => {
        api.get("/training-types/offer")
            .then(res => setTrainingOpties(res.data))
            .catch(err => console.error("Trainingstypes laden mislukt", err));
    }, []);

    // ========================================
    // HANDLERS
    // ========================================
    const handleKlant = (e) => {
        const { name, value } = e.target;
        setKlant(prev => ({
            ...prev,
            [name]: name === "telefoon" ? normalizeNlPhone(value) : value
        }));
    };

    const handleTraining = (index, e) => {
        const { name, type, value, checked } = e.target;
        setTrainings(prev => {
            const updated = [...prev];
            updated[index][name] = type === "checkbox" ? checked : value;
            return updated;
        });
    };

    const addTraining = () => {
        setTrainings(prev => [
            ...prev,
            { trainingType: "", aantal: 1, eigenLocatie: true }
        ]);
    };

    const removeTraining = (index) => {
        setTrainings(prev => prev.filter((_, i) => i !== index));
    };

    // ========================================
    // VALIDATIE
    // ========================================
    const validate = () => {
        const e = {};

        if (!klant.bedrijf) e.bedrijf = "Bedrijfsnaam verplicht";
        if (!klant.voornaam) e.voornaam = "Voornaam verplicht";
        if (!klant.achternaam) e.achternaam = "Achternaam verplicht";
        if (!klant.email.includes("@")) e.email = "Ongeldig e-mailadres";
        if (!validatePhone(klant.telefoon)) e.telefoon = "Ongeldig telefoonnummer";

        if (!klant.postcode) e.postcode = "Postcode verplicht";
        if (!klant.huisnummer) e.huisnummer = "Huisnummer verplicht";
        if (!klant.straat) e.straat = "Straat verplicht";
        if (!klant.plaats) e.plaats = "Plaats verplicht";

        trainings.forEach((t, i) => {
            if (!t.trainingType) e[`trainingType_${i}`] = "Kies een training";
            if (!t.aantal || Number(t.aantal) < 1) {
                e[`aantal_${i}`] = "Minimaal 1 cursist";
            }
        });

        if (overlegModus && !opmerkingen.trim()) {
            e.opmerkingen = "Geef een korte toelichting of vraag";
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    // ========================================
    // SUBMIT
    // ========================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        const payload = {
            mode: overlegModus ? "OVERLEG" : "OFFERTE",
            customer: {
                firstName: klant.voornaam,
                lastName: klant.achternaam,
                company: klant.bedrijf,
                email: klant.email,
                phone: klant.telefoon,
                address: {
                    street: klant.straat,
                    houseNumber: klant.huisnummer,
                    postalCode: klant.postcode,
                    city: klant.plaats
                }
            },
            trainings: trainings.map(t => ({
                trainingType: t.trainingType,
                participantCount: Number(t.aantal),
                onSite: Boolean(t.eigenLocatie)
            })),
            opmerkingen: overlegModus ? opmerkingen : null
        };

        try {
            await api.post("/quotes", payload);
            setVerzonden(true);
        } catch (err) {
            console.error("Offerte fout:", err);
            alert(
                "Helaas is het versturen mislukt. Stuur een e-mail naar klantenservice@bhvvoorneaanzee.nl."
            );
        } finally {
            setLoading(false);
        }
    };

    // ========================================
    // THANK YOU PAGE
    // ========================================
    if (verzonden) {
        return (
            <div className="container text-center">
                <h2 className="text-success">
                    {overlegModus ? "Bericht verstuurd!" : "Offerte verstuurd!"}
                </h2>
                <p>We nemen zo snel mogelijk contact met je op.</p>
            </div>
        );
    }

    // ========================================
    // FORM
    // ========================================
    return (
        <>
            {showPopup && (
                <InfoPopup
                    title="Pagina nog in ontwikkeling"
                    message="Deze pagina is momenteel nog niet volledig beschikbaar."
                    onClose={() => setShowPopup(false)}
                />
            )}

            <div className="container-narrow">

                {/* GEGEVENS */}
                <div className="offerte-block">
                    <div className="offerte-title">Gegevens</div>

                    <div className="grid grid-2 gap-4">
                        <div className="input-group col-span-2">
                            <label>Naam van je bedrijf of organisatie *</label>
                            <input name="bedrijf" onChange={handleKlant} />
                            {errors.bedrijf && <p className="error-text">{errors.bedrijf}</p>}
                        </div>

                        <div className="input-group">
                            <label>Voornaam *</label>
                            <input name="voornaam" onChange={handleKlant} />
                            {errors.voornaam && <p className="error-text">{errors.voornaam}</p>}
                        </div>

                        <div className="input-group">
                            <label>Achternaam (incl. tussenvoegsel) *</label>
                            <input name="achternaam" onChange={handleKlant} />
                            {errors.achternaam && <p className="error-text">{errors.achternaam}</p>}
                        </div>

                        <div className="col-span-2">
                            <PhoneInput
                                value={klant.telefoon}
                                onChange={(val) =>
                                    setKlant(prev => ({
                                        ...prev,
                                        telefoon: normalizeNlPhone(val)
                                    }))
                                }
                                error={errors.telefoon}
                            />
                        </div>

                        <div className="input-group col-span-2">
                            <label>E-mailadres *</label>
                            <input name="email" type="email" onChange={handleKlant} />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>
                    </div>
                </div>

                {/* LOCATIE VAN DE TRAINING */}
                <div className="offerte-block">
                    <div className="offerte-title">Locatie van de training</div>

                    <div className="grid grid-2 gap-4">
                        <div className="input-group">
                            <label>Postcode *</label>
                            <input name="postcode" onChange={handleKlant} />
                            {errors.postcode && <p className="error-text">{errors.postcode}</p>}
                        </div>

                        <div className="input-group">
                            <label>Huisnummer *</label>
                            <input name="huisnummer" onChange={handleKlant} />
                            {errors.huisnummer && <p className="error-text">{errors.huisnummer}</p>}
                        </div>

                        <div className="input-group col-span-2">
                            <label>Straat *</label>
                            <input name="straat" onChange={handleKlant} />
                            {errors.straat && <p className="error-text">{errors.straat}</p>}
                        </div>

                        <div className="input-group col-span-2">
                            <label>Plaats *</label>
                            <input name="plaats" onChange={handleKlant} />
                            {errors.plaats && <p className="error-text">{errors.plaats}</p>}
                        </div>
                    </div>
                </div>

                {/* TRAININGEN */}
                <div className="offerte-block">
                    <div className="offerte-title">Trainingen</div>

                    {trainings.map((tr, i) => (
                        <div key={i} className="offerte-training-block">
                            <div className="offerte-training-header">
                                Trainingstype {i + 1}
                            </div>

                            <div className="offerte-training-row">
                                <div className="input-group">
                                    <label>Trainingstype</label>
                                    <select
                                        name="trainingType"
                                        value={tr.trainingType}
                                        onChange={(e) => handleTraining(i, e)}
                                    >
                                        <option value="">-- Kies training --</option>
                                        {trainingOpties.map(t => (
                                            <option key={t.code} value={t.code}>
                                                {t.displayName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label>Aantal cursisten</label>
                                    <input
                                        name="aantal"
                                        type="number"
                                        min="1"
                                        value={tr.aantal}
                                        onChange={(e) => handleTraining(i, e)}
                                    />
                                </div>
                            </div>

                            <div className="offerte-training-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="eigenLocatie"
                                        checked={tr.eigenLocatie}
                                        onChange={(e) => handleTraining(i, e)}
                                    />
                                    Training op eigen locatie
                                </label>
                            </div>

                            {trainings.length > 1 && (
                                <span
                                    className="offerte-training-remove"
                                    onClick={() => removeTraining(i)}
                                >
                                    Verwijder training
                                </span>
                            )}
                        </div>
                    ))}

                    <button type="button" className="btn-secondary" onClick={addTraining}>
                        + Training toevoegen
                    </button>
                </div>

                {/* AANVULLENDE INFORMATIE */}
                <div className="offerte-block">
                    <div className="offerte-title">Aanvullende informatie</div>

                    {/* UITLEGTEKST */}
                    <p className="offerte-info-text">
                        {!overlegModus ? (
                            <>
                                Je kunt dit formulier direct gebruiken om een offerte aan te vragen.
                                <br />
                                Heb je nog vragen of wil je eerst overleggen? Klik dan op de knop hieronder.
                            </>
                        ) : (
                            <>
                                Je hebt aangegeven dat je eerst wilt overleggen.
                                <br />
                                Laat hieronder je vraag of toelichting achter, dan nemen wij contact met je op.
                            </>
                        )}
                    </p>

                    {/* TEKSTVELD BIJ OVERLEG */}
                    {overlegModus && (
                        <div className="input-group" style={{ marginTop: "1.5rem" }}>
                            <label>
                                Over welke cursus of dienst wil je graag meer informatie?
                            </label>
                            <textarea
                                rows="4"
                                value={opmerkingen}
                                onChange={(e) => setOpmerkingen(e.target.value)}
                                placeholder="Beschrijf hier je vraag of situatie…"
                            />
                            {errors.opmerkingen && (
                                <p className="error-text">{errors.opmerkingen}</p>
                            )}
                        </div>
                    )}

                    {/* TOGGLE BUTTON */}
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setOverlegModus(prev => !prev)}
                        style={{ marginTop: "1.5rem" }}
                    >
                        {overlegModus
                            ? "Ik wil toch direct een offerte aanvragen"
                            : "Ik wil eerst overleggen of meer informatie"}
                    </button>
                </div>

                <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading
                        ? "Versturen..."
                        : overlegModus
                            ? "Bericht versturen"
                            : "Offerte aanvragen"}
                </button>

            </div>
        </>
    );
}
