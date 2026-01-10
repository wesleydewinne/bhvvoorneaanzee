import { useState } from "react";
import PhoneInput from "@/components/phoneInput/PhoneInput.jsx";
import { validatePhone } from "@/helpers/validatePhone.js";
import "./OfferteAanvraag.css";

export default function OfferteAanvraag() {

    // ========================================
    // MOCK TRAININGEN (tijdelijk)
    // ========================================
    const mockTrainingOpties = [
        { id: 1, code: "BHV_BASIS", naam: "BHV Basis" },
        { id: 2, code: "BHV_HERHALING", naam: "BHV Herhaling" },
        { id: 3, code: "BHV_PLOEGLEIDER", naam: "BHV Ploegleider" },
        { id: 4, code: "EHBO", naam: "EHBO" },
        { id: 5, code: "ONTRUIMING", naam: "Ontruimingsoefening" }
    ];

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

    const [trainingOpties] = useState(mockTrainingOpties);
    const [errors, setErrors] = useState({});
    const [verzonden, setVerzonden] = useState(false);

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
    // MOCK SUBMIT
    // ========================================
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log("Offerte (mock):", { klant, trainings });
        setVerzonden(true);
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
        <div className="container-narrow">

            {/* BLOK — GEGEVENS */}
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

            {/* BLOK — TRAININGEN */}
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
                                        <option key={t.id} value={t.code}>
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

            {/* VERZEND BUTTON */}
            <button className="btn-primary" onClick={handleSubmit}>
                Offerte aanvragen
            </button>

        </div>
    );
}
