// src/pages/WorkshopsPage.jsx
import React from "react";
import "./WorkshopsPage.css";

import {
    FireExtinguisher,
    UsersThree,
    ChatCircleDots,
    ClipboardText,
    CheckCircle,
} from "@phosphor-icons/react";

import data from "../../shared/data/training.json";

import TrainingCardSection from "@/shared/components/sections/trainingSection/TrainingCardSection.jsx";
import HeaderSection from "@/shared/components/sections/headerSection/HeaderSection.jsx";
import ServiceRegionsSection from "@/shared/components/sections/ServiceAreaSection/ServiceRegionsSection.jsx";

import fallback from "@/assets/image/common/fallback/Card-Fallback.png";

function Workshops() {
    const workshopCategory = data.categories.find(
        (category) => category.id === "workshops"
    );

    const workshopTrainings = workshopCategory?.trainings || [];

    const workshopCards = workshopTrainings.map((training) => {
        const resolvedImage = training.cardImage?.trim()
            ? training.cardImage
            : workshopCategory?.image || fallback;

        return {
            title: training.title,
            description: training.description,
            cardImage: resolvedImage,
            cardAlt: training.cardAlt || training.title,
            buttonTo: `/workshops/${training.type}`,
            buttonText: "Meer informatie",
            buttonStyle: "primary",
            buttonIcon: "🎯",
        };
    });

    return (
        <div className="workshops">

            <HeaderSection
                mainTitle="Workshops Veiligheid & BHV"
                subTitle="Praktische en doelgerichte veiligheidssessies"
            />

                {/* Intro */}
                <section className="workshops__intro">
                    <h2>Wat zijn onze workshops?</h2>
                    <p>
                        Onze workshops zijn korte, praktijkgerichte sessies
                        gericht op één specifiek veiligheidsonderwerp.
                        Ideaal als opfrismoment, verdieping of
                        als veiligheidssessie tijdens een teamdag.
                    </p>
                    <p>
                        Waar een volledige BHV-training een brede basis legt,
                        focust een workshop zich op gerichte vaardigheden.
                        Kort, krachtig en direct toepasbaar.
                    </p>
                </section>

                {/* Wat leer je */}
                <section className="workshops__grid">

                    <article className="workshops__card">
                        <h3 className="workshops__card-title">
        <span className="workshops__icon">
            <UsersThree size={22} weight="bold"/>
        </span>
                            Samenwerking
                        </h3>
                        <ul>
                            <li>Effectief samenwerken tijdens incidenten</li>
                            <li>Rolverdeling binnen het BHV-team</li>
                            <li>Communicatie onder druk</li>
                        </ul>
                    </article>

                    <article className="workshops__card">
                        <h3 className="workshops__card-title">
        <span className="workshops__icon">
            <FireExtinguisher size={22} weight="bold"/>
        </span>
                            Praktijkgericht
                        </h3>
                        <ul>
                            <li>Realistische scenario’s</li>
                            <li>Oefenen met materialen</li>
                            <li>Direct toepasbare vaardigheden</li>
                        </ul>
                    </article>

                    <article className="workshops__card">
                        <h3 className="workshops__card-title">
        <span className="workshops__icon">
            <ClipboardText size={22} weight="bold"/>
        </span>
                            Veiligheidscultuur
                        </h3>
                        <ul>
                            <li>Bewustwording op de werkvloer</li>
                            <li>Verantwoord handelen</li>
                            <li>Leren van praktijksituaties</li>
                        </ul>
                    </article>


                </section>

                {/* Waarom workshop */}
                <section className="workshops__difference">
                    <h2>Waarom kiezen voor een workshop?</h2>
                    <p>
                        Een workshop is ideaal wanneer je een specifiek thema wilt
                        uitdiepen zonder een volledige trainingsdag te organiseren.
                        Gericht trainen betekent efficiënter leren.
                    </p>
                    <p>
                        Perfect als aanvulling op BHV, als verdieping of als
                        periodieke veiligheidssessie binnen jouw organisatie.
                    </p>
                </section>

                {/* Workshop Cards */}
                    <TrainingCardSection
                        cards={workshopCards}
                    />




           {/*<ServiceRegionsSection />*/}
            <ServiceRegionsSection />

        </div>
    );
}

export default Workshops;
