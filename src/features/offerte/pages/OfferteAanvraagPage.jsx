import { useState, useEffect, useRef } from "react";
import PhoneInput from "@/shared/components/form/phoneInput/PhoneInput.jsx";
import { validatePhone } from "@/shared/utils/validatePhone.js";
import InfoPopup from "@/shared/components/ui/popup/InfoPopup";
import quoteService from "../services/quoteService.js";
import "../styles/OfferteAanvraag.css";

export default function OfferteAanvraagPage() {
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
    const [showPopup, setShowPopup] = useState(false);
    const [overlegModus, setOverlegModus] = useState(false);
    const [opmerkingen, setOpmerkingen] = useState("");

    const [captchaToken, setCaptchaToken] = useState("");
    const [captchaReady, setCaptchaReady] = useState(false);
    const [website, setWebsite] = useState("");
    const [isSuccessPending, setIsSuccessPending] = useState(false);

    const captchaRef = useRef(null);
    const widgetIdRef = useRef(null);
    const successTimeoutRef = useRef(null);

    const siteKey = import.meta.env.VITE_TURNSTILE_SITEKEY;

    const normalizeNlPhone = (phone) => {
        if (!phone) return "";
        if (/^\d{9}$/.test(phone)) return `0${phone}`;
        return phone;
    };

    const clearErrors = (...keys) => {
        setErrors((prev) => {
            const next = { ...prev };
            let changed = false;

            keys.forEach((key) => {
                if (key in next) {
                    delete next[key];
                    changed = true;
                }
            });

            return changed ? next : prev;
        });
    };

    const handleCaptchaSuccess = (token) => {
        setCaptchaToken(token);
        setCaptchaReady(true);
        clearErrors("captcha", "formulier");
    };

    const handleCaptchaInvalidated = () => {
        setCaptchaToken("");
        setCaptchaReady(false);
    };

    useEffect(() => {
        quoteService
            .getTrainingTypes()
            .then((res) => setTrainingOpties(res.data))
            .catch(() => {
                setErrors((prev) => ({
                    ...prev,
                    algemeen: "Het laden van de trainingstypes is mislukt."
                }));
            });
    }, []);

    useEffect(() => {
        return () => {
            if (successTimeoutRef.current) {
                window.clearTimeout(successTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!siteKey) {
            setErrors((prev) => ({
                ...prev,
                algemeen: "Beveiligingscheck is niet correct ingesteld."
            }));
            return;
        }

        let waitForTurnstile = null;

        const renderTurnstile = () => {
            if (!window.turnstile || !captchaRef.current || widgetIdRef.current) {
                return false;
            }

            widgetIdRef.current = window.turnstile.render(captchaRef.current, {
                sitekey: siteKey,
                callback: handleCaptchaSuccess,
                "expired-callback": handleCaptchaInvalidated,
                "error-callback": handleCaptchaInvalidated
            });

            return true;
        };

        if (renderTurnstile()) {
            return;
        }

        const scriptSrc = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

        if (existingScript) {
            waitForTurnstile = window.setInterval(() => {
                if (renderTurnstile()) {
                    window.clearInterval(waitForTurnstile);
                }
            }, 200);

            return () => {
                if (waitForTurnstile) {
                    window.clearInterval(waitForTurnstile);
                }
            };
        }

        const script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            renderTurnstile();
        };

        document.body.appendChild(script);

        return () => {
            if (waitForTurnstile) {
                window.clearInterval(waitForTurnstile);
            }
        };
    }, [siteKey]);

    const handleKlant = (e) => {
        const { name, value } = e.target;

        setKlant((prev) => ({
            ...prev,
            [name]: name === "telefoon" ? normalizeNlPhone(value) : value
        }));

        clearErrors(name, "formulier", "algemeen");
    };

    const handleTelefoonChange = (val) => {
        setKlant((prev) => ({
            ...prev,
            telefoon: normalizeNlPhone(val)
        }));

        clearErrors("telefoon", "formulier", "algemeen");
    };

    const handleTraining = (index, e) => {
        const { name, type, value, checked } = e.target;

        setTrainings((prev) => {
            const updated = [...prev];
            updated[index][name] = type === "checkbox" ? checked : value;
            return updated;
        });

        if (name === "trainingType") {
            clearErrors(`trainingType_${index}`, "formulier", "algemeen");
        }

        if (name === "aantal") {
            clearErrors(`aantal_${index}`, "formulier", "algemeen");
        }
    };

    const addTraining = () => {
        setTrainings((prev) => [
            ...prev,
            { trainingType: "", aantal: 1, eigenLocatie: true }
        ]);

        clearErrors("formulier", "algemeen");
    };

    const removeTraining = (index) => {
        setTrainings((prev) => prev.filter((_, i) => i !== index));

        setErrors((prev) => {
            const next = { ...prev };
            delete next[`trainingType_${index}`];
            delete next[`aantal_${index}`];
            delete next.formulier;
            return next;
        });
    };

    const toggleOverlegModus = () => {
        setOverlegModus((prev) => !prev);
        clearErrors("opmerkingen", "formulier", "algemeen");
    };

    const buildValidationErrors = () => {
        const nextErrors = {};

        if (!klant.bedrijf.trim()) nextErrors.bedrijf = "Bedrijfsnaam verplicht";
        if (!klant.voornaam.trim()) nextErrors.voornaam = "Voornaam verplicht";
        if (!klant.achternaam.trim()) nextErrors.achternaam = "Achternaam verplicht";
        if (!klant.email.includes("@")) nextErrors.email = "Ongeldig e-mailadres";
        if (!validatePhone(klant.telefoon)) nextErrors.telefoon = "Ongeldig telefoonnummer";
        if (!klant.postcode.trim()) nextErrors.postcode = "Postcode verplicht";
        if (!klant.huisnummer.trim()) nextErrors.huisnummer = "Huisnummer verplicht";
        if (!klant.straat.trim()) nextErrors.straat = "Straat verplicht";
        if (!klant.plaats.trim()) nextErrors.plaats = "Plaats verplicht";

        trainings.forEach((t, i) => {
            if (!t.trainingType) {
                nextErrors[`trainingType_${i}`] = "Kies een training";
            }

            if (!t.aantal || Number(t.aantal) < 1) {
                nextErrors[`aantal_${i}`] = "Minimaal 1 cursist";
            }
        });

        if (overlegModus && !opmerkingen.trim()) {
            nextErrors.opmerkingen = "Geef een korte toelichting of vraag";
        }

        if (!captchaToken) {
            nextErrors.captcha = "Bevestig eerst de beveiligingscheck";
        }

        return nextErrors;
    };

    const scrollToFirstError = (validationErrors) => {
        const fixedFieldOrder = [
            { key: "bedrijf", id: "bedrijf" },
            { key: "voornaam", id: "voornaam" },
            { key: "achternaam", id: "achternaam" },
            { key: "telefoon", id: "telefoon-field" },
            { key: "email", id: "email" },
            { key: "postcode", id: "postcode" },
            { key: "huisnummer", id: "huisnummer" },
            { key: "straat", id: "straat" },
            { key: "plaats", id: "plaats" }
        ];

        let targetId = null;

        for (const field of fixedFieldOrder) {
            if (validationErrors[field.key]) {
                targetId = field.id;
                break;
            }
        }

        if (!targetId) {
            for (let i = 0; i < trainings.length; i += 1) {
                if (validationErrors[`trainingType_${i}`]) {
                    targetId = `trainingType_${i}`;
                    break;
                }

                if (validationErrors[`aantal_${i}`]) {
                    targetId = `aantal_${i}`;
                    break;
                }
            }
        }

        if (!targetId && validationErrors.opmerkingen) {
            targetId = "opmerkingen";
        }

        if (!targetId && validationErrors.captcha) {
            targetId = "captcha-section";
        }

        if (!targetId) {
            targetId = "submit-section";
        }

        const targetElement = document.getElementById(targetId);

        if (!targetElement) {
            return;
        }

        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        const focusTarget = targetElement.matches("input, select, textarea, button")
            ? targetElement
            : targetElement.querySelector("input, select, textarea, button");

        if (focusTarget && typeof focusTarget.focus === "function") {
            window.setTimeout(() => {
                focusTarget.focus({ preventScroll: true });
            }, 250);
        }
    };

    const resetCaptcha = () => {
        if (window.turnstile && widgetIdRef.current) {
            window.turnstile.reset(widgetIdRef.current);
        }

        setCaptchaToken("");
        setCaptchaReady(false);
        setIsSuccessPending(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = buildValidationErrors();

        if (Object.keys(validationErrors).length > 0) {
            const nextErrors = {
                ...validationErrors,
                formulier: "Er ontbreken nog verplichte velden. Controleer de gemarkeerde velden hierboven."
            };

            setErrors(nextErrors);

            window.requestAnimationFrame(() => {
                scrollToFirstError(validationErrors);
            });

            return;
        }

        setLoading(true);
        clearErrors("formulier");

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
            trainings: trainings.map((t) => ({
                trainingType: t.trainingType,
                participantCount: Number(t.aantal),
                onSite: Boolean(t.eigenLocatie)
            })),
            remarks: overlegModus ? opmerkingen : null,
            captcha: captchaToken,
            website
        };

        try {
            await quoteService.createQuote(payload);

            setIsSuccessPending(true);

            successTimeoutRef.current = window.setTimeout(() => {
                setVerzonden(true);
                setLoading(false);
            }, 4000);
        } catch (err) {
            if (err.response?.status === 403) {
                setErrors((prev) => ({
                    ...prev,
                    algemeen: "Beveiligingscheck ongeldig of verlopen. Probeer het opnieuw."
                }));
            } else if (err.response?.status === 429) {
                setErrors((prev) => ({
                    ...prev,
                    algemeen: "Er zijn te veel aanvragen verstuurd. Wacht even en probeer het later opnieuw."
                }));
            } else if (err.response?.status === 400) {
                setErrors((prev) => ({
                    ...prev,
                    algemeen: "De aanvraag is ongeldig of onvolledig. Controleer je gegevens."
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    algemeen: "Helaas is het versturen mislukt. Stuur een e-mail naar klantenservice@bhvvoorneaanzee.nl."
                }));
            }

            resetCaptcha();
            setLoading(false);
        }
    };

    if (verzonden) {
        return (
            <div className="container text-center">
                <h2 className="text-success">
                    {overlegModus ? "Bericht verstuurd!" : "Offerte verstuurd!"}
                </h2>
                <p>We nemen zo spoedig mogelijk contact met je op.</p>
            </div>
        );
    }

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
                <form className="offerte-form" onSubmit={handleSubmit} noValidate>
                    <div className="offerte-block">
                        <div className="offerte-title">Gegevens</div>

                        <div className="grid grid-2 gap-4">
                            <div className="input-group col-span-2">
                                <label htmlFor="bedrijf">Naam van je bedrijf of organisatie *</label>
                                <input
                                    id="bedrijf"
                                    name="bedrijf"
                                    value={klant.bedrijf}
                                    onChange={handleKlant}
                                    autoComplete="organization"
                                />
                                {errors.bedrijf && <p className="error-text">{errors.bedrijf}</p>}
                            </div>

                            <div className="input-group">
                                <label htmlFor="voornaam">Voornaam *</label>
                                <input
                                    id="voornaam"
                                    name="voornaam"
                                    value={klant.voornaam}
                                    onChange={handleKlant}
                                    autoComplete="given-name"
                                />
                                {errors.voornaam && <p className="error-text">{errors.voornaam}</p>}
                            </div>

                            <div className="input-group">
                                <label htmlFor="achternaam">Achternaam (incl. tussenvoegsel) *</label>
                                <input
                                    id="achternaam"
                                    name="achternaam"
                                    value={klant.achternaam}
                                    onChange={handleKlant}
                                    autoComplete="family-name"
                                />
                                {errors.achternaam && <p className="error-text">{errors.achternaam}</p>}
                            </div>

                            <div className="col-span-2" id="telefoon-field">
                                <PhoneInput
                                    value={klant.telefoon}
                                    onChange={handleTelefoonChange}
                                    error={errors.telefoon}
                                />
                            </div>

                            <div className="input-group col-span-2">
                                <label htmlFor="email">E-mailadres *</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={klant.email}
                                    onChange={handleKlant}
                                    autoComplete="email"
                                />
                                {errors.email && <p className="error-text">{errors.email}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="offerte-block">
                        <div className="offerte-title">Locatie van de training</div>

                        <div className="grid grid-2 gap-4">
                            <div className="input-group">
                                <label htmlFor="postcode">Postcode *</label>
                                <input
                                    id="postcode"
                                    name="postcode"
                                    value={klant.postcode}
                                    onChange={handleKlant}
                                    autoComplete="postal-code"
                                />
                                {errors.postcode && <p className="error-text">{errors.postcode}</p>}
                            </div>

                            <div className="input-group">
                                <label htmlFor="huisnummer">Huisnummer *</label>
                                <input
                                    id="huisnummer"
                                    name="huisnummer"
                                    value={klant.huisnummer}
                                    onChange={handleKlant}
                                />
                                {errors.huisnummer && <p className="error-text">{errors.huisnummer}</p>}
                            </div>

                            <div className="input-group col-span-2">
                                <label htmlFor="straat">Straat *</label>
                                <input
                                    id="straat"
                                    name="straat"
                                    value={klant.straat}
                                    onChange={handleKlant}
                                    autoComplete="address-line1"
                                />
                                {errors.straat && <p className="error-text">{errors.straat}</p>}
                            </div>

                            <div className="input-group col-span-2">
                                <label htmlFor="plaats">Plaats *</label>
                                <input
                                    id="plaats"
                                    name="plaats"
                                    value={klant.plaats}
                                    onChange={handleKlant}
                                    autoComplete="address-level2"
                                />
                                {errors.plaats && <p className="error-text">{errors.plaats}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="offerte-block">
                        <div className="offerte-title">Trainingen</div>

                        {trainings.map((tr, i) => (
                            <div key={i} className="offerte-training-block">
                                <div className="offerte-training-header">
                                    Trainingstype {i + 1}
                                </div>

                                <div className="offerte-training-row">
                                    <div className="input-group">
                                        <label htmlFor={`trainingType_${i}`}>Trainingstype</label>
                                        <select
                                            id={`trainingType_${i}`}
                                            name="trainingType"
                                            value={tr.trainingType}
                                            onChange={(e) => handleTraining(i, e)}
                                        >
                                            <option value="">-- Kies training --</option>
                                            {trainingOpties.map((t) => (
                                                <option key={t.code} value={t.code}>
                                                    {t.displayName}
                                                </option>
                                            ))}
                                        </select>
                                        {errors[`trainingType_${i}`] && (
                                            <p className="error-text">{errors[`trainingType_${i}`]}</p>
                                        )}
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor={`aantal_${i}`}>Aantal cursisten</label>
                                        <input
                                            id={`aantal_${i}`}
                                            name="aantal"
                                            type="number"
                                            min="1"
                                            value={tr.aantal}
                                            onChange={(e) => handleTraining(i, e)}
                                        />
                                        {errors[`aantal_${i}`] && (
                                            <p className="error-text">{errors[`aantal_${i}`]}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="offerte-training-checkbox">
                                    <label htmlFor={`eigenLocatie_${i}`}>
                                        <input
                                            id={`eigenLocatie_${i}`}
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

                    <div className="offerte-block">
                        <div className="offerte-title">Aanvullende informatie</div>

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

                        {overlegModus && (
                            <div className="input-group" style={{ marginTop: "1.5rem" }}>
                                <label htmlFor="opmerkingen">
                                    Over welke cursus of dienst wil je graag meer informatie?
                                </label>
                                <textarea
                                    id="opmerkingen"
                                    rows="4"
                                    value={opmerkingen}
                                    onChange={(e) => {
                                        setOpmerkingen(e.target.value);
                                        clearErrors("opmerkingen", "formulier", "algemeen");
                                    }}
                                    placeholder="Beschrijf hier je vraag of situatie…"
                                />
                                {errors.opmerkingen && (
                                    <p className="error-text">{errors.opmerkingen}</p>
                                )}
                            </div>
                        )}

                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={toggleOverlegModus}
                            style={{ marginTop: "1.5rem" }}
                        >
                            {overlegModus
                                ? "Ik wil toch direct een offerte aanvragen"
                                : "Ik wil eerst overleggen of meer informatie"}
                        </button>
                    </div>

                    <div className="offerte-block offerte-submit-block" id="submit-section">
                        <div className="offerte-title">
                            {overlegModus ? "Bericht versturen" : "Offerte versturen"}
                        </div>

                        <p className="offerte-info-text offerte-submit-text">
                            Controleer de beveiligingscheck en verstuur daarna je aanvraag.
                        </p>

                        <div className="offerte-turnstile-wrapper" id="captcha-section">
                            <div ref={captchaRef} />
                            {!captchaReady && (
                                <p className="offerte-turnstile-hint">
                                    Bevestig eerst de beveiligingscheck om te kunnen versturen.
                                </p>
                            )}
                            {errors.captcha && <p className="error-text">{errors.captcha}</p>}
                        </div>

                        <div className="offerte-honeypot" aria-hidden="true">
                            <label htmlFor="website">Website</label>
                            <input
                                id="website"
                                type="text"
                                name="website"
                                tabIndex="-1"
                                autoComplete="off"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>

                        {errors.algemeen && (
                            <p className="error-text offerte-submit-error">{errors.algemeen}</p>
                        )}

                        <button
                            type="submit"
                            className="btn-primary offerte-submit-button"
                            disabled={loading || !captchaReady}
                        >
                            {loading ? (
                                isSuccessPending
                                    ? "Bericht wordt verzonden..."
                                    : "Versturen..."
                            ) : overlegModus ? (
                                "Bericht versturen"
                            ) : (
                                "Offerte aanvragen"
                            )}
                        </button>

                        {errors.formulier && (
                            <p
                                className="error-text offerte-submit-validation-message"
                                aria-live="polite"
                            >
                                {errors.formulier}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}