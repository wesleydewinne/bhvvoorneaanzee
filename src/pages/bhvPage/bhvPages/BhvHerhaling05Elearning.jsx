import HeaderSection from "@/components/sections/headerSection/HeaderSection";
import "./BhvTrainingPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NIBHV from "@/assets/icons/certificeringlogo/badgeNIBHV.png";

import {
    User,
    Clock,
    Buildings,
    Users
} from "@phosphor-icons/react";

export default function BhvHerhaling05Elearning() {

    const [priceFrom, setPriceFrom] = useState(null);

    const priceText = priceFrom
        ? `vanaf € ${priceFrom} per persoon`
        : "op aanvraag";

    useEffect(() => {
        axios
            .get("/api/trainings/BHV_HERHALING_ELEARNING/pricing")
            .then(res => setPriceFrom(res.data.priceFrom))
            .catch(() => setPriceFrom(null));
    }, []);

    return (
        <>
            <HeaderSection
                mainTitle="BHV Herhaling met e-learning"
                subTitle="Theorie online, praktische handelingen aftoetsen"
            />

            <div className="bhv-training-page">

                {/* OVERZICHT / KERN */}
                <section className="bhv-training-overview">
                    <ul className="overview-cards">
                        <li>
                            <User size={36} weight="duotone" />
                            <strong>Voor wie</strong>
                            <span>BHV’ers met een geldig certificaat</span><br />
                            <span>Of recent verlopen BHV-certificaat</span>
                        </li>

                        <li>
                            <Clock size={36} weight="duotone" />
                            <strong>Duur</strong>
                            <span>E-learning + halve praktijkdag</span><br />
                            <span>Praktijk ± 3–4 uur</span>
                        </li>

                        <li>
                            <Buildings size={36} weight="duotone" />
                            <strong>Vorm</strong>
                            <span>E-learning</span><br />
                            <span>&</span><br />
                            <span>Incompany praktijktoetsing</span>
                        </li>

                        <li>
                            <Users size={36} weight="duotone" />
                            <strong>Groepsgrootte</strong>
                            <span>Incompany 2–10 deelnemers</span>
                        </li>
                    </ul>
                </section>

                {/* WAT LEER / HERHAAL JE */}
                <section className="bhv-training-leerdoelen">
                    <div className="leerdoelen-grid">

                        <div className="leerdoelen-content">
                            <h2>Wat wordt herhaald en getoetst?</h2>
                            <ul>
                                <li>Veilig werken en waarborgen van eigen veiligheid</li>
                                <li>Handelen bij bewusteloosheid</li>
                                <li>Reanimatie en gebruik van een AED</li>
                                <li>Herkennen en handelen bij veelvoorkomende ziektebeelden</li>
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

                        {/* E-LEARNING */}
                        <div className="training-onderdeel">
                            <h3>Onderdeel 1 – E-learning (theorie)</h3>

                            <p>
                                Voorafgaand aan de praktijktoetsing volgen deelnemers een e-learning
                                waarin de theoretische kennis van bedrijfshulpverlening wordt
                                opgefrist.
                                De e-learning kan in eigen tempo worden doorlopen en zorgt ervoor
                                dat alle deelnemers goed voorbereid zijn op de praktijktoetsing.
                            </p>

                            <ul>
                                <li>Opfrissen van BHV-theorie en procedures</li>
                                <li>Brandveiligheid en alarmering</li>
                                <li>Levensreddend handelen en eerste hulp</li>
                                <li>Actualiteiten en richtlijnen</li>
                            </ul>

                            <p className="examen-info">
                                De e-learning wordt afgesloten met een theoretische kennistoets.
                            </p>
                        </div>

                        {/* PRAKTIJKTOETSING */}
                        <div className="training-onderdeel">
                            <h3>Onderdeel 2 – Praktische handelingen aftoetsen</h3>

                            <p>
                                Tijdens de halve praktijkdag worden de belangrijkste BHV-handelingen
                                individueel afgetoetst.
                                De focus ligt niet op lesgeven, maar op het beoordelen of de
                                deelnemer de vereiste vaardigheden nog correct en veilig kan
                                uitvoeren.
                            </p>

                            <ul>
                                <li>Veilig benaderen en beoordelen van een slachtoffer</li>
                                <li>Handelen bij bewusteloosheid</li>
                                <li>Reanimatie en gebruik van een AED</li>
                                <li>Eerste hulp bij ziektebeelden en verwondingen</li>
                                <li>Communicatie en samenwerking tijdens incidenten</li>
                            </ul>

                            <p className="examen-info">
                                Tijdens deze praktijktoetsing wordt beoordeeld of de
                                BHV-vaardigheden voldoende worden beheerst.
                            </p>
                        </div>

                    </div>
                </section>

                {/* USP */}
                <section className="bhv-training-usp">
                    <p>
                        De BHV herhaling met e-learning is een efficiënte manier om
                        BHV-vaardigheden actueel te houden.
                        Door de theorie vooraf online te herhalen, kan de praktijktoetsing
                        compact en doelgericht plaatsvinden, zonder onnodige herhaling van
                        lesstof.
                    </p>
                </section>

                {/* PRIJS + CTA */}
                <section className="bhv-training-cta-eind">
                    <div className="cta-card">

                        <h2>Wat kost deze BHV-training?</h2>

                        <p>
                            De kosten voor deze BHV herhaling met e-learning zijn
                            <strong> {priceText} </strong>,
                            gebaseerd op een <strong>incompany groepstraining</strong>.
                            Wij werken met <strong>staffelkortingen</strong>:
                            hoe groter de groep, hoe lager de prijs per deelnemer.
                        </p>

                        <p>
                            Omdat iedere organisatie anders is, ontvang je altijd een
                            <Link to="/offerte" className="inline-link">
                                offerte op maat
                            </Link>,
                            afgestemd op jouw situatie en wensen.
                        </p>

                        <p className="cta-hint">
                            Heb je eerst nog vragen over deze herhalingstraining of
                            twijfel je welke variant het beste past?
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
