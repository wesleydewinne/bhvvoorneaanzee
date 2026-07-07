import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import PublicRoute from "@/features/auth/components/route/PublicRoute.jsx";
import BhvPage from "@/pages/bhvPage/BhvPage.jsx";

const HomePage = lazy(() => import("@/pages/homePage/HomePage.jsx"));

const BhvBasis2 = lazy(() => import("@/pages/bhvPage/bhvPages/BhvBasis2.jsx"));
const BhvBasis1Elearning = lazy(() => import("@/pages/bhvPage/bhvPages/BhvBasis1Elearning.jsx"));
const BhvHerhaling = lazy(() => import("@/pages/bhvPage/bhvPages/BhvHerhaling.jsx"));
const BhvHerhaling05Elearning = lazy(() => import("@/pages/bhvPage/bhvPages/BhvHerhaling05Elearning.jsx"));
const BhvRitme = lazy(() => import("@/pages/bhvPage/bhvPages/BhvRitme.jsx"));

const PloegleiderPage = lazy(() => import("@/pages/ploegleiderPage/PloegleiderPage.jsx"));
const Ploegleider2DaagsePage = lazy(() => import("@/pages/ploegleiderPage/ploegleiderDetailPage/PloegleiderBasis2Daagse.jsx"));
const PloegleiderBasis1DaagseElearning = lazy(() => import("@/pages/ploegleiderPage/ploegleiderDetailPage/PloegleiderBasis1daagseElearning.jsx"));
const PloegleiderHerhalingPage = lazy(() => import("@/pages/ploegleiderPage/ploegleiderDetailPage/PloegleiderHerhaling.jsx"));

const LandingPage = lazy(() => import("@/pages/landingPage/LandingPage.jsx"));
const OntruimingsPage = lazy(() => import("@/pages/ontruimingsOefeningPage/OntruimingsOefeningPage.jsx"));
const Fase0 = lazy(() => import("@/pages/ontruimingsOefeningPage/fase/Fase0.jsx"));
const Fase1 = lazy(() => import("@/pages/ontruimingsOefeningPage/fase/Fase1.jsx"));
const Fase2 = lazy(() => import("@/pages/ontruimingsOefeningPage/fase/Fase2.jsx"));
const Fase3 = lazy(() => import("@/pages/ontruimingsOefeningPage/fase/Fase3.jsx"));
const Fase4 = lazy(() => import("@/pages/ontruimingsOefeningPage/fase/Fase4.jsx"));

const Ehbo = lazy(() => import("@/pages/ehbo/EhboPage.jsx"));

const Workshops = lazy(() => import("@/pages/workshops/Workshops.jsx"));
const KleineBlusmiddelen = lazy(() => import("@/pages/workshops/soortenWorkshops/KleineBlusmiddelen.jsx"));
const Portofoongebruik = lazy(() => import("@/pages/workshops/soortenWorkshops/Portofoongebruik.jsx"));
const ReanimatieMetGebruikAedVolwassene = lazy(() => import("@/pages/workshops/soortenWorkshops/ReanimatieMetGebruikAEDVolwassene.jsx"));
const ReanimatieMetGebruikAedKind = lazy(() => import("@/pages/workshops/soortenWorkshops/ReanimatieMetGebruikAEDKind.jsx"));
const StopDeBloedingRedEenLeven = lazy(() => import("@/pages/workshops/soortenWorkshops/StopDeBloedingRedEenLeven.jsx"));
const BedienaarBrandmeldcentrale = lazy(() => import("@/pages/workshops/soortenWorkshops/BedienaarBrandmeldcentrale.jsx"));
const Waterongevallen = lazy(() => import("@/pages/workshops/soortenWorkshops/Waterongevallen.jsx"));
const KinderEhboHuiskamertraining = lazy(() => import("@/pages/workshops/soortenWorkshops/KinderEhboHuiskamertraining.jsx"));

const Maatwerk = lazy(() => import("@/pages/MaatwerkPage/MaatwerkPagina.jsx"));
const ModulaireTraining = lazy(() => import("@/pages/modulair/ModulaireTraining.jsx"));
const ModulaireOverzicht = lazy(() => import("@/pages/modulair/ModulaireOverzicht.jsx"));

const RegioOverzichtPage = lazy(() => import("@/pages/regios/RegioOverzichtPage.jsx"));
const RotterdamPage = lazy(() => import("@/pages/regios/RotterdamPage.jsx"));
const ZeelandPage = lazy(() => import("@/pages/regios/ZeelandPage.jsx"));
const WestlandPage = lazy(() => import("@/pages/regios/WestlandPage.jsx"));

const Faq = lazy(() => import("@/pages/faq/Faq.jsx"));
const BlogPage = lazy(() => import("@/features/blog/BlogPage.jsx"));
const BlogDetail = lazy(() => import("@/features/blog/BlogDetail.jsx"));

const Fases = lazy(() => import("@/pages/ontruimingsverslag/Fases.jsx"));
const Scenarios = lazy(() => import("@/pages/ontruimingsverslag/Scenarios.jsx"));
const Verslag = lazy(() => import("@/pages/ontruimingsverslag/Verslag.jsx"));

const Veiligheidscheck = lazy(() => import("@/pages/leadPage/Check.jsx"));
const VeiligheidscheckBedankt = lazy(() => import("@/pages/leadPage/VeiligheidscheckBedankt.jsx"));
const EvaluationPage = lazy(() => import("@/features/evaluation/pages/EvaluationPage.jsx"));

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage.jsx"));
const TwoFactorPage = lazy(() => import("@/features/auth/pages/TwoFactorPage.jsx"));
const AccessPage = lazy(() => import("@/pages/quiz/AccessPage.jsx"));
const OfferteAanvraag = lazy(() => import("@/features/offerte/pages/OfferteAanvraagPage.jsx"));
const OverOns = lazy(() => import("@/pages/overOns/OverOns.jsx"));
const Bedrijfsgegevens = lazy(() => import("@/features/bedrijfsgegevens/Bedrijfsgegevens.jsx"));
const ContactOns = lazy(() => import("@/features/contact/pages/ContactOns.jsx"));
const ContactBedanktPage = lazy(() => import("@/features/contact/pages/ContactBedanktPage.jsx"));

const publicRoutes = [
    { path: "/", element: <HomePage /> },

    // BHV
    { path: "/bhv", element: <BhvPage /> },
    { path: "/bhv-basis-2-daagse", element: <BhvBasis2 /> },
    { path: "/bhv-basis-e-learning", element: <BhvBasis1Elearning /> },
    { path: "/bhv-herhaling-1-dag", element: <BhvHerhaling /> },
    { path: "/bhv-herhaling-e-learning", element: <BhvHerhaling05Elearning /> },
    { path: "/bhv-ritme", element: <BhvRitme /> },

    // Ploegleider
    { path: "/ploegleider", element: <PloegleiderPage /> },
    { path: "/ploegleider-basis-2-daagse", element: <Ploegleider2DaagsePage /> },
    { path: "/ploegleider-basis-1-dag-met-elearning", element: <PloegleiderBasis1DaagseElearning /> },
    { path: "/ploegleider-herhaling-halve-dag", element: <PloegleiderHerhalingPage /> },

    // Ontruimingsoefening
    { path: "/ontruimingsoefening", element: <OntruimingsPage /> },
    { path: "/ontruimingsoefening-fase0", element: <Fase0 /> },
    { path: "/ontruimingsoefening-fase1", element: <Fase1 /> },
    { path: "/ontruimingsoefening-fase2", element: <Fase2 /> },
    { path: "/ontruimingsoefening-fase3", element: <Fase3 /> },
    { path: "/ontruimingsoefening-fase4", element: <Fase4 /> },

    { path: "/ontruimingsoefening-fases", element: <Fases /> },
    { path: "/ontruimingsoefening-scenarios", element: <Scenarios /> },
    { path: "/ontruimingsoefening-verslag", element: <Verslag /> },

    // EHBO
    { path: "/ehbo", element: <Ehbo /> },
    { path: "/ehbo-basis-3-daagse", element: <Ehbo /> },
    { path: "/ehbo-basis-2-daagse-met-elearning", element: <Ehbo /> },
    { path: "/ehbo-herhaling-hele-dag", element: <Ehbo /> },
    { path: "/ehbo-herhaling-halve-dag", element: <Ehbo /> },

    // Workshops
    { path: "/workshops", element: <Workshops /> },
    { path: "/workshops-kleine-blusmiddelen", element: <KleineBlusmiddelen /> },
    { path: "/workshops-bedienaar-brandmeldcentrale", element: <BedienaarBrandmeldcentrale /> },
    { path: "/workshops-portofoongebruik", element: <Portofoongebruik /> },
    { path: "/workshops-reanimatie-volwassene", element: <ReanimatieMetGebruikAedVolwassene /> },
    { path: "/workshops-reanimatie-kind-baby", element: <ReanimatieMetGebruikAedKind /> },
    { path: "/workshops-stop-de-bloeding", element: <StopDeBloedingRedEenLeven /> },
    { path: "/workshops-waterongevallen", element: <Waterongevallen /> },
    { path: "/workshops-kinder-ehbo-huiskamertraining", element: <KinderEhboHuiskamertraining /> },

    // Uitleg trainingen
    { path: "/maatwerk", element: <Maatwerk /> },
    { path: "/modulaire-trainen", element: <ModulaireTraining /> },
    { path: "/modulair-overzicht", element: <ModulaireOverzicht /> },

    // Regio's
    { path: "/regio", element: <RegioOverzichtPage /> },
    { path: "/rotterdam-rijnmond", element: <RotterdamPage /> },
    { path: "/zeeland", element: <ZeelandPage /> },
    { path: "/den-haag-westland", element: <WestlandPage /> },

    // Blog
    { path: "/blog", element: <BlogPage /> },
    { path: "/blog/:slug", element: <BlogDetail /> },

    // LeadPage
    { path: "/veiligheidscheck", element: <Veiligheidscheck /> },
    { path: "/veiligheidscheck-bedankt", element: <VeiligheidscheckBedankt /> },

    // Login + 2FA
    {
        path: "/inloggen",
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
    },
    {
        path: "/inloggen/2fa",
        element: <TwoFactorPage />,
    },

    { path: "/inlog", element: <Navigate to="/inloggen" replace /> },

    { path: "/evaluatie", element: <EvaluationPage /> },

    // Quiz publieke toegang
    { path: "/quiz-access", element: <AccessPage /> },

    { path: "/landingpage", element: <LandingPage /> },
    { path: "/veelgestelde-vragen", element: <Faq /> },
    { path: "/offerte", element: <OfferteAanvraag /> },

    { path: "/over-ons", element: <OverOns /> },
    { path: "/bedrijfsgegevens", element: <Bedrijfsgegevens /> },
    { path: "/contact", element: <ContactOns /> },
    { path: "/contact/bedankt", element: <ContactBedanktPage /> },
];

export default publicRoutes;
