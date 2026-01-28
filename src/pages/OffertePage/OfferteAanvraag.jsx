import { useState, useEffect } from "react";
import api from "@/api/api";
import PhoneInput from "@/components/phoneInput/PhoneInput.jsx";
import { validatePhone } from "@/helpers/validatePhone.js";
import "./OfferteAanvraag.css";
import InfoPopup from "@/components/ui/InfoPopup";

export default function OfferteAanvraag() {

    // ========================================
    // STATES
    // ========================================
    const [klant, setKlant] = useState({
        voornaam: "",
        tussenvoegsel: "",
        achternaam: "",
        bedrijf: "",
        email: "",
        telefoon: ""
    });

    const [trainings, setTrainings] = useState([
        { trainingType: "", aantal: 1, eigenLocatie: true }
    ]);

    const [trainingOpties, setTrainingOpties] = useState([]);
    const [errors, setErrors] = useState({});
    const [verzonden, setVerzonden] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(true);

    // ========================================
    // TRAINING TYPES UIT BACKEND
    // ========================================
    useEffect(() => {
        api.get("/training-types")
            .then(res => setTrainingOpties(res.data))
            .catch(err => {
                console.error("Trainingstypes laden mislukt", err);
            });
    }, []);

    // ========================================
    // HANDLERS
    // ========================================
    const handleKlant = (e) => {
        setKlant({ ...klant, [e.target.name]: e.target.value });
    };

    const handleTraining = (index, e) => {
        const newTrainings = [...trainings];
        newTrainings[index][e.target.name] =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setTrainings(newTrainings);
    };

    const addTraining = () => {
        setTrainings([
            ...trainings,
            { trainingType: "", aantal: 1, eigenLocatie: true }
        ]);
    };

    const removeTraining = (index) => {
        setTrainings(trainings.filter((_, i) => i !== index));
    };

    // ========================================
    // VALIDATIE
    // ========================================
    const validate = () => {
        const e = {};

        if (!klant.voornaam) e.voornaam = "Voornaam verplicht";
        if (!validatePhone(klant.telefoon)) e.telefoon = "Ongeldig telefoonnummer";
        if (!klant.email.includes("@")) e.email = "Ongeldig e-mailadres";

        trainings.forEach((t, i) => {
            if (!t.trainingType) e[`trainingType_${i}`] = "Kies een training";
            if (t.aantal < 1) e[`aantal_${i}`] = "Minimaal 1 cursist";
        });

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

        try {
            await api.post("/quotes\"", {
                klant,
                trainings
            });

            setVerzonden(true);

        } catch (err) {
            console.error(err);

            alert(
                err.message ||
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
                <h2 className="text-success">Offerte verstuurd!</h2>
                <p>Controleer uw mailbox.</p>
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

                    <div className="input-group">
                        <label>Voornaam</label>
                        <input name="voornaam" onChange={handleKlant} />
                        {errors.voornaam && <p className="error-text">{errors.voornaam}</p>}
                    </div>

                    <div className="input-group">
                        <label>Tussenvoegsel</label>
                        <input name="tussenvoegsel" onChange={handleKlant} />
                    </div>

                    <div className="input-group col-span-2">
                        <label>Achternaam</label>
                        <input name="achternaam" onChange={handleKlant} />
                    </div>

                    <div className="input-group col-span-2">
                        <label>Bedrijf</label>
                        <input name="bedrijf" onChange={handleKlant} />
                    </div>

                    <div className="input-group col-span-2">
                        <label>E-mail</label>
                        <input name="email" type="email" onChange={handleKlant} />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="col-span-2">
                        <PhoneInput
                            value={klant.telefoon}
                            onChange={(val) => setKlant({ ...klant, telefoon: val })}
                            error={errors.telefoon}
                        />
                    </div>

                </div>
            </div>

            {/* TRAININGEN */}
            <div className="offerte-block">
                <div className="offerte-title">Trainingen</div>

                {trainings.map((tr, i) => (
                    <div key={i} className="offerte-training-block">

                        <div className="offerte-training-header">
                            Training #{i + 1}
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
                                            {t.naam}
                                        </option>
                                    ))}
                                </select>
                                {errors[`trainingType_${i}`] &&
                                    <p className="error-text">{errors[`trainingType_${i}`]}</p>}
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
                                {errors[`aantal_${i}`] &&
                                    <p className="error-text">{errors[`aantal_${i}`]}</p>}
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

            {/* VERZENDEN */}
            <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Versturen..." : "Offerte aanvragen"}
            </button>

        </div>
        </>
    );
}
