import HeaderSection from "@/components/sections/headerSection/HeaderSection";
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

export default function BhvHerhaling() {

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
            .get("/trainings/BHV_REFRESHER_1_DAY/pricing")
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
                mainTitle="BHV Herhalingstraining (NIBHV)"
                subTitle="Praktijkgericht opfrissen en actualiseren van BHV-vaardigheden"
            />

            <div className="bhv-training-page">

                {/* OVERZICHT / KERN */}
                <section className="bhv-training-overview">
                    <ul className="overview-cards">
                        <li>
                            <User size={36} weight="duotone" />
                            <strong>Voor wie</strong>
                            <span>BHV’ers met een geldig of recent verlopen certificaat</span>
                        </li>

                        <li>
                            <Clock size={36} weight="duotone" />
                            <strong>Duur</strong>
                            <span>1 dag</span><br />
                            <span>Praktijkgericht</span>
                        </li>

                        <li>
                            <Buildings size={36} weight="duotone" />
                            <strong>Vorm</strong>
                            <span>Incompany</span><br />
                            <span>&</span><br />
                            <span>Outcompany</span>
                        </li>

                        <li>
                            <Users size={36} weight="duotone" />
                            <strong>Groepsgrootte</strong>
                            <span>Incompany 2–10 deelnemers</span><br />
                            <span>Outcompany vanaf 1 deelnemer</span>
                        </li>
                    </ul>
                </section>

                {/* WAT LEER JE */}
                <section className="bhv-training-leerdoelen">
                    <div className="leerdoelen-grid">

                        <div className="leerdoelen-content">
                            <h2>Wat frist een BHV’er op?</h2>
                            <ul>
                                <li>Handelen bij brand en ontruiming</li>
                                <li>Veilig werken en communiceren tijdens incidenten</li>
                                <li>Reanimatie en gebruik van een AED</li>
                                <li>Herkennen en handelen bij ziektebeelden</li>
                                <li>Eerste hulp bij verwondingen en ongevallen</li>
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
                            <h3>Praktijkgerichte herhalingstraining</h3>

                            <p>
                                Tijdens de BHV herhalingstraining worden de belangrijkste
                                BHV-vaardigheden opnieuw geoefend en verdiept.
                                De training is sterk praktijkgericht en sluit aan op
                                actuele richtlijnen en realistische scenario’s.
                            </p>

                            <ul>
                                <li>Opfrissen van brandbestrijding en ontruiming</li>
                                <li>Veilig werken en waarborgen van eigen veiligheid</li>
                                <li>Handelen bij bewusteloosheid, reanimatie en AED-gebruik</li>
                                <li>Herkennen en behandelen van veelvoorkomende ziektebeelden</li>
                                <li>Eerste hulp bij letsel en ongevallen</li>
                            </ul>

                            <p className="examen-info">
                                Tijdens de herhalingstraining wordt beoordeeld of de
                                BHV-vaardigheden nog voldoende worden beheerst.
                            </p>
                        </div>
                    </div>
                </section>

                {/* USP */}
                <section className="bhv-training-usp">
                    <p>
                        De BHV herhalingstraining is bedoeld om kennis en vaardigheden
                        actueel te houden.
                        Door regelmatig te oefenen blijven BHV’ers bekwaam en
                        inzetbaar bij noodsituaties binnen de organisatie.
                    </p>
                </section>

                {/* PRIJS + CTA */}
                <section className="bhv-training-cta-eind">
                    <div className="cta-card">

                        <h2>Wat kost deze BHV-training?</h2>

                        <p>
                            De kosten voor deze BHV herhalingstraining zijn
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
                            Heb je eerst nog vragen over de inhoud of geldigheid
                            van de herhalingstraining?
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
