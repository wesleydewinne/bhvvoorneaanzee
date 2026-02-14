import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection";
import "./BhvTrainingPage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NIBHV from "@/assets/icons/certificeringlogo/badgeNIBHV.png";

import {
    User,
    Clock,
    Buildings,
    Users
} from "@phosphor-icons/react";

import api from "@/api/api.js";

export default function BhvBasis1Elearning() {

    const [priceFrom, setPriceFrom] = useState(null);

    /* ============================================================
       PRIJS FORMATTERING (EURO, NL NOTATIE)
       ============================================================ */
    const formattedPrice = priceFrom !== null
        ? new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
        }).format(priceFrom)
        : null;

    const priceText = formattedPrice
        ? `vanaf ${formattedPrice} per persoon`
        : "op aanvraag";

    /* ============================================================
       PRICING API CALL
       ============================================================ */
    useEffect(() => {
        api
            .get("/trainings/BHV_BASIC_ELEARNING_1_DAY/pricing")
            .then(res => {
                console.log("PRICING RESPONSE", res.data);
                setPriceFrom(res.data.basePrice);
            })
            .catch(err => {
                console.error("Pricing ophalen mislukt", err);
                setPriceFrom(null);
            });
    }, []);

    return (
        <>
            <HeaderSection
                mainTitle="BHV Basis met e-learning (NIBHV)"
                subTitle="Theorie online, praktijkgericht trainen op locatie"
            />

            <div className="bhv-training-page">

                {/* OVERZICHT / KERN */}
                <section className="bhv-training-overview">
                    <ul className="overview-cards">
                        <li>
                            <User size={36} weight="duotone" />
                            <strong>Voor wie</strong>
                            <span>Nieuwe BHV’ers</span><br />
                            <span>Of BHV’ers met een verlopen certificaat</span>
                        </li>

                        <li>
                            <Clock size={36} weight="duotone" />
                            <strong>Duur</strong>
                            <span>E-learning + 1 praktijkdag</span><br />
                            <span>Theorie in eigen tempo</span><br />
                            <span>Praktijktraining op locatie</span>
                        </li>

                        <li>
                            <Buildings size={36} weight="duotone" />
                            <strong>Vorm</strong>
                            <span>E-learning</span><br />
                            <span>&</span><br />
                            <span>Incompany praktijktraining</span>
                        </li>

                        <li>
                            <Users size={36} weight="duotone" />
                            <strong>Groepsgrootte</strong>
                            <span>Incompany 2–10 deelnemers</span>
                        </li>
                    </ul>
                </section>

                {/* WAT LEER JE */}
                <section className="bhv-training-leerdoelen">
                    <div className="leerdoelen-grid">

                        <div className="leerdoelen-content">
                            <h2>Wat leert een BHV’er?</h2>
                            <ul>
                                <li>Beginnende branden herkennen en veilig bestrijden</li>
                                <li>Een ontruiming begeleiden</li>
                                <li>Veilig werken en communiceren tijdens incidenten</li>
                                <li>Reanimatie en gebruik van een AED</li>
                                <li>Eerste hulp verlenen bij ziektebeelden en verwondingen</li>
                            </ul>
                        </div>

                        <div className="leerdoelen-certificering">
                            <a
                                href="/certificering/nibhv"
                                className="certificering-link"
                            >
                                <img
                                    src={NIBHV}
                                    alt="NIBHV OK keurmerk – erkende BHV-training"
                                    className="nibhv-logo"
                                />
                            </a>
                        </div>

                    </div>
                </section>

                {/* TRAININGSOPZET */}
                <section className="bhv-training-opzet">
                    <h2>Zo ziet de training eruit</h2>

                    <div className="training-onderdelen">

                        <div className="training-onderdeel">
                            <h3>Onderdeel 1 – E-learning (theorie)</h3>

                            <p>
                                Voorafgaand aan de praktijktraining volgen deelnemers een e-learning
                                waarin de theoretische basis van bedrijfshulpverlening wordt behandeld.
                                De e-learning kan in eigen tempo worden doorlopen en zorgt ervoor dat
                                deelnemers goed voorbereid aan de praktijktraining beginnen.
                            </p>

                            <ul>
                                <li>Basisprincipes van bedrijfshulpverlening (BHV)</li>
                                <li>Brandveiligheid, ontruiming en alarmering</li>
                                <li>Levensreddend handelen en eerste hulp</li>
                                <li>Herkennen van risico’s en noodsituaties</li>
                                <li>Voorbereiding op het theoretisch examen</li>
                            </ul>

                            <p className="examen-info">
                                De e-learning wordt afgesloten met een theoretisch examen.
                            </p>
                        </div>

                        <div className="training-onderdeel">
                            <h3>Onderdeel 2 – Praktijktraining</h3>

                            <p>
                                Tijdens de praktijktraining worden de vaardigheden uit de e-learning
                                actief geoefend.
                                Deelnemers trainen realistische scenario’s onder begeleiding van
                                een ervaren instructeur.
                            </p>

                            <ul>
                                <li>Oefenen met brandblusmiddelen</li>
                                <li>Begeleiden van een ontruiming</li>
                                <li>Veilig werken en waarborgen van eigen veiligheid</li>
                                <li>Handelen bij bewusteloosheid, reanimatie en AED-gebruik</li>
                                <li>Eerste hulp bij ziektebeelden en verwondingen</li>
                            </ul>

                            <p className="examen-info">
                                Tijdens de praktijktraining wordt beoordeeld of de vaardigheden
                                voldoende worden beheerst.
                            </p>
                        </div>

                    </div>
                </section>

                {/* USP */}
                <section className="bhv-training-usp">
                    <p>
                        De BHV Basis training met e-learning combineert flexibiliteit met
                        praktijkgericht trainen.
                        Door de theorie vooraf online te volgen, kan de praktijktraining
                        volledig worden benut voor oefenen en toepassen in realistische
                        situaties, afgestemd op de werkomgeving van jouw organisatie.
                    </p>
                </section>

                {/* PRIJS + CTA */}
                <section className="bhv-training-cta-eind">
                    <div className="cta-card">

                        <h2>Wat kost deze BHV-training?</h2>

                        <p>
                            De kosten voor deze BHV Basis training met e-learning zijn
                            <strong> {priceText} </strong>,
                            gebaseerd op een <strong>incompany groepstraining</strong>.
                            Wij werken met <strong>staffelkortingen</strong>:
                            hoe groter de groep, hoe lager de prijs per deelnemer.
                        </p>

                        <p>
                            Omdat iedere organisatie anders is, ontvang je altijd een{" "}
                            <Link to="/offerte" className="inline-link">
                                offerte op maat
                            </Link>,
                            afgestemd op jouw situatie en wensen.
                        </p>

                        <p className="cta-hint">
                            Heb je eerst nog vragen over de inhoud, geldigheid of organisatie
                            van de training?
                            Bekijk dan onze{" "}
                            <Link to="/veelgestelde-vragen">
                                veelgestelde vragen
                            </Link>.
                        </p>

                    </div>
                </section>

            </div>
        </>
    );
}
