import { useState } from "react";
import axios from "axios";
import PhoneInput from "@/components/phoneInput/PhoneInput.jsx";
import { validatePhone } from "@/helpers/validatePhone.js";
import "./OfferteAanvraag.css";

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
        telefoon: "",
        postcode: "",
        huisnummer: "",
        straat: "",
        plaats: "",
    });

    const [trainings, setTrainings] = useState([
        { trainingType: "", aantal: 1, eigenLocatie: false }
    ]);

    const [errors, setErrors] = useState({});
    const [verzonden, setVerzonden] = useState(false);

    // ========================================
    // HANDLE KLANTGEGEVENS
    // ========================================
    const handleKlant = (e) => {
        setKlant({ ...klant, [e.target.name]: e.target.value });
    };

    // ========================================
    // TRAININGFUNCTIES (ontbraken bij jou!)
    // ========================================
    const handleTraining = (index, e) => {
        const newTrainings = [...trainings];
        newTrainings[index][e.target.name] =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setTrainings(newTrainings);
    };

    const addTraining = () => {
        setTrainings([
            ...trainings,
            { trainingType: "", aantal: 1, eigenLocatie: false }
        ]);
    };

    const removeTraining = (index) => {
        setTrainings(trainings.filter((_, i) => i !== index));
    };

    // ========================================
    // ADRES LOOKUP
    // ========================================
    const fetchAdres = async () => {
        if (!klant.postcode || !klant.huisnummer) return;

        try {
            const res = await axios.get("/api/lookup/postcode", {
                params: { pc: klant.postcode, hn: klant.huisnummer }
            });

            setKlant({
                ...klant,
                straat: res.data.straat,
                plaats: res.data.plaats
            });

            setErrors((prev) => {
                const e = { ...prev };
                delete e.adres;
                return e;
            });

        } catch (err) {
            console.error("Adres lookup mislukt:", err);

            setKlant({ ...klant, straat: "", plaats: "" });

            setErrors((prev) => ({
                ...prev,
                adres: "Adres niet gevonden. Controleer postcode + huisnummer."
            }));
        }
    };

    // ========================================
    // VALIDATIE
    // ========================================
    const validate = () => {
        const e = {};

        if (!klant.voornaam) e.voornaam = "Voornaam verplicht";

        if (!validatePhone(klant.telefoon)) e.telefoon = "Ongeldig telefoonnummer";

        if (!klant.email.includes("@")) e.email = "Ongeldig e-mailadres";

        if (!/^[1-9][0-9]{3}[A-Z]{2}$/.test(klant.postcode.toUpperCase()))
            e.postcode = "Postcode in formaat 1234AB";

        if (!klant.huisnummer) e.huisnummer = "Huisnummer verplicht";

        if (!klant.straat || !klant.plaats)
            e.adres = "Adres niet gevonden";

        // Training validatie
        trainings.forEach((t, i) => {
            if (!t.trainingType) e[`trainingType_${i}`] = "Kies een training";
            if (t.aantal < 1) e[`aantal_${i}`] = "Minimaal 1 deelnemer";
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

        await axios.post("/api/offertes/maak", { klant, trainings });

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

            {/* BLOK 1 — GEGEVENS */}
            <div className="offerte-block">
                <div className="offerte-title">Gegevens</div>

                <div className="grid grid-2 gap-4">

                    {/* Voornaam */}
                    <div className="input-group">
                        <label>Voornaam</label>
                        <input name="voornaam" onChange={handleKlant} />
                        {errors.voornaam && <p className="error-text">{errors.voornaam}</p>}
                    </div>

                    {/* Tussenvoegsel */}
                    <div className="input-group">
                        <label>Tussenvoegsel</label>
                        <input name="tussenvoegsel" onChange={handleKlant} />
                    </div>

                    {/* Achternaam */}
                    <div className="input-group col-span-2">
                        <label>Achternaam</label>
                        <input name="achternaam" onChange={handleKlant} />
                    </div>

                    {/* Bedrijf */}
                    <div className="input-group col-span-2">
                        <label>Bedrijf</label>
                        <input name="bedrijf" onChange={handleKlant} />
                    </div>

                    {/* Email */}
                    <div className="input-group col-span-2">
                        <label>E-mail</label>
                        <input name="email" type="email" onChange={handleKlant} />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    {/* Telefoon */}
                    <div className="col-span-2">
                        <PhoneInput
                            value={klant.telefoon}
                            onChange={(val) => setKlant({ ...klant, telefoon: val })}
                            error={errors.telefoon}
                        />
                    </div>
                </div>
            </div>

            {/* BLOK 2 — ADRES */}
            <div className="offerte-block">
                <div className="offerte-title">Adres</div>

                <div className="grid grid-2 gap-4">

                    {/* Postcode */}
                    <div className="input-group">
                        <label>Postcode</label>
                        <input
                            name="postcode"
                            maxLength="6"
                            onBlur={fetchAdres}
                            onChange={handleKlant}
                        />
                        {errors.postcode && <p className="error-text">{errors.postcode}</p>}
                    </div>

                    {/* Huisnummer */}
                    <div className="input-group">
                        <label>Huisnummer</label>
                        <input
                            name="huisnummer"
                            onBlur={fetchAdres}
                            onChange={handleKlant}
                        />
                        {errors.huisnummer && <p className="error-text">{errors.huisnummer}</p>}
                    </div>

                    {/* Straat */}
                    <div className="input-group col-span-2">
                        <label>Straat</label>
                        <input value={klant.straat} readOnly />
                    </div>

                    {/* Plaats */}
                    <div className="input-group col-span-2">
                        <label>Plaats</label>
                        <input value={klant.plaats} readOnly />
                    </div>

                    {errors.adres && <p className="error-text col-span-2">{errors.adres}</p>}
                </div>
            </div>

            {/* BLOK 3 — TRAININGEN */}
            <div className="offerte-block">
                <div className="offerte-title">Trainingen</div>

                {trainings.map((tr, i) => (
                    <div key={i} className="training-card">

                        <div className="training-header">Training #{i + 1}</div>

                        <div className="grid grid-3 gap-4">

                            {/* Trainingstype */}
                            <div className="input-group">
                                <label>Trainingstype</label>
                                <select
                                    name="trainingType"
                                    value={tr.trainingType}
                                    onChange={(e) => handleTraining(i, e)}
                                >
                                    <option value="">-- Kies training --</option>
                                    <option value="BHV_BASIS_2_DAGEN">BHV Basis 2 dagen</option>
                                    <option value="BHV_BASIS_ELEARNING_1_DAG">1 dag e-learning</option>
                                    <option value="BHV_HERHALING_1_DAG">Herhaling 1 dag</option>
                                    <option value="BHV_HERHALING_ELEARNING_HALF_DAG">0,5 dag e-learning</option>
                                </select>
                                {errors[`trainingType_${i}`] &&
                                    <p className="error-text">{errors[`trainingType_${i}`]}</p>}
                            </div>

                            {/* Aantal */}
                            <div className="input-group">
                                <label>Aantal</label>
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

                            {/* Op locatie */}
                            <div className="input-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="eigenLocatie"
                                        checked={tr.eigenLocatie}
                                        onChange={(e) => handleTraining(i, e)}
                                    />
                                    &nbsp;Op locatie
                                </label>
                            </div>
                        </div>

                        {trainings.length > 1 && (
                            <span
                                className="training-remove"
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
            <button className="btn-primary w-100" onClick={handleSubmit}>
                Offerte aanvragen
            </button>
        </div>
    );
}
