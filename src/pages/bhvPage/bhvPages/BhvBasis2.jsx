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

export default function BhvBasis2() {

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
            .get("/trainings/BHV_BASIC_2_DAYS/pricing")
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
                mainTitle="2 daagse BHV Basis (NIBHV)"
                subTitle="Brand, ontruiming en levensreddend handelen"
            />

            <div className="bhv-training-page">

                {/* OVERZICHT / KERN */}
                <section className="bhv-training-overview">
                    <ul className="overview-cards">
                        <li>
                            <User size={36} weight="duotone" />
                            <strong>Voor wie</strong>
                            <span>Nieuwe BHV’ers</span><br />
                            <span>BHV certificaten die te lang verlopen zijn.</span>
                        </li>

                        <li>
                            <Clock size={36} weight="duotone" />
                            <strong>Duur</strong>
                            <span>2 dagen</span><br />
                            <span>Brand & Ontruimen 8:30 / 15:30</span><br />
                            <span>LEH 8:30 / 16:00</span>
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
                            <span>&</span><br />
                            <span>Outcompany 1 deelnemer</span>
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
                                <li>Eerste hulp verlenen bij ongevallen</li>
                                <li>Reanimatie en gebruik van een AED</li>
                                <li>Rust bewaren en communiceren tijdens incidenten</li>
                            </ul>
                        </div>

                        <div className="leerdoelen-certificering">
                            <a href="/certificering/nibhv" className="certificering-link">
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
                            <h3>Dag 1 – Brand & ontruiming</h3>

                            <p>
                                Tijdens dit onderdeel leren deelnemers hoe zij moeten handelen
                                bij een beginnende brand en hoe zij een ontruiming veilig en
                                gestructureerd begeleiden.
                            </p>

                            <ul>
                                <li>Herkennen van brandrisico’s en brandklassen</li>
                                <li>Veilig en effectief inzetten van blusmiddelen</li>
                                <li>Juist alarmeren en communiceren bij brand</li>
                                <li>Begeleiden van een ontruiming</li>
                                <li>Omgaan met communicatiemiddelen</li>
                            </ul>

                            <p className="examen-info">
                                Aan het einde van dit onderdeel wordt een theoretisch examen afgenomen.
                            </p>
                        </div>

                        <div className="training-onderdeel">
                            <h3>Dag 2 – Levensreddend handelen</h3>

                            <p>
                                In dit onderdeel staat het verlenen van eerste hulp bij medische
                                noodsituaties centraal, met nadruk op praktisch oefenen.
                            </p>

                            <ul>
                                <li>Veilig werken en waarborgen van eigen veiligheid</li>
                                <li>Reanimatie en gebruik van een AED</li>
                                <li>Herkennen van ziektebeelden</li>
                                <li>Eerste hulp bij letsel</li>
                            </ul>

                            <p className="examen-info">
                                Aan het einde van dit onderdeel wordt een theoretisch examen afgenomen.
                            </p>
                        </div>
                    </div>
                </section>

                {/* USP */}
                <section className="bhv-training-usp">
                    <p>
                        Deze BHV Basis training wordt volledig <strong>incompany</strong> verzorgd
                        en afgestemd op de werkomgeving van jouw organisatie.
                    </p>
                </section>

                {/* PRIJS + CTA */}
                <section className="bhv-training-cta-eind">
                    <div className="cta-card">
                        <h2>Wat kost deze BHV-training?</h2>

                        <p>
                            De kosten voor deze BHV 2-daagse basis training zijn
                            <strong> {priceText} </strong>,
                            gebaseerd op een <strong>incompany groepstraining</strong>.
                            Wij werken met <strong>staffelkortingen</strong>:
                            hoe groter de groep, hoe lager de prijs per deelnemer.
                        </p>

                        <p>
                            Omdat iedere organisatie anders is, ontvang je altijd een {" "}
                            <Link to="/offerte" className="inline-link">
                                offerte op maat
                            </Link>,
                            afgestemd op jouw situatie en wensen.
                        </p>

                        <p className="cta-hint">
                            Heb je eerst nog vragen?
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
