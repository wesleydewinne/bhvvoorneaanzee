import React from "react";
import PublicRoute from "@/components/route/PublicRoute";

import HomePage from "@/pages/homePage/HomePage.jsx";

//bhv
import BhvPage from "@/pages/bhvPage/BhvPage.jsx";
import BhvBasis2 from "@/pages/bhvPage/bhvPages/BhvBasis2.jsx";
import BhvBasis1Elearning from "@/pages/bhvPage/bhvPages/BhvBasis1Elearning.jsx";
import BhvHerhaling from "@/pages/bhvPage/bhvPages/BhvHerhaling.jsx";
import BhvHerhaling05Elearning from "@/pages/bhvPage/bhvPages/BhvHerhaling05Elearning.jsx";


import PloegleiderPage from "@/pages/ploegleiderPage/PloegleiderPage.jsx";
import LandingPage from "@/pages/landingPage/LandingPage.jsx";
import OntruimingsPage from "@/pages/ontruimingsOefeningPage/OntruimingsOefeningPage.jsx";
import Fase0 from "@/pages/ontruimingsOefeningPage/fase/Fase0.jsx";
import Fase1 from "@/pages/ontruimingsOefeningPage/fase/Fase1.jsx";
import Fase2 from "@/pages/ontruimingsOefeningPage/fase/Fase2.jsx";
import Fase3 from "@/pages/ontruimingsOefeningPage/fase/Fase3.jsx";
import Fase4 from "@/pages/ontruimingsOefeningPage/fase/Fase4.jsx";
import Ehbo from "@/pages/ehbo/EhboPage.jsx";

import Workshops from "@/pages/workshops/Workshops.jsx";
import KleineBlusmiddelen from "@/pages/workshops/soortenWorkshops/Kleine_Blusmiddelen.jsx";
import Portofoongebruik from "@/pages/workshops/soortenWorkshops/Portofoongebruik.jsx";
import ReanimatieMetGebruikAedVolwassene from "@/pages/workshops/soortenWorkshops/ReanimatieMetGebruikAEDVolwassene.jsx";
import ReanimatieMetGebruikAedKind from "@/pages/workshops/soortenWorkshops/ReanimatieMetGebruikAEDKind.jsx";
import StopDeBloedingRedEenLeven from "@/pages/workshops/soortenWorkshops/StopDeBloedingRedEenLeven.jsx";

import Maatwerk from "@/pages/MaatwerkPage/MaatwerkPagina.jsx";

import Faq from "@/pages/faq/Faq.jsx";
import BlogPage from "@/pages/blog/BlogPage.jsx";
import BlogDetail from "@/pages/blog/BlogDetail.jsx";

import Fases from "@/pages/ontruimingsverslag/Fases.jsx";
import Scenarios from "@/pages/ontruimingsverslag/Scenarios.jsx";
import Verslag from "@/pages/ontruimingsverslag/Verslag.jsx";

import Veiligheidscheck from "@/pages/leadPage/Check.jsx"

import RotterdamPage from "@/pages/regios/RotterdamPage.jsx";
import ZeelandPage from "@/pages/regios/ZeelandPage.jsx";
import WestlandPage from "@/pages/regios/WestlandPage.jsx";

import Login from "@/pages/login/LoginPage.jsx";
import { Navigate } from "react-router-dom";
import AccessPage from "@/pages/quiz/AccessPage.jsx";
import OfferteAanvraag from "@/pages/OffertePage/OfferteAanvraag.jsx";
import OverOns from "@/pages/overOns/OverOns.jsx";
import Bedrijfsgegevens from "@/components/bedrijfsgegevens/Bedrijfsgegevens.jsx";
import ContactOns from "@/pages/contact/ContactOns.jsx";
import VeiligheidscheckBedankt from "@/pages/leadPage/VeiligheidscheckBedankt.jsx";

const publicRoutes = [
    { path: "/", element: <HomePage /> },

    // BHV
    { path: "/bhv", element: <BhvPage /> },
    { path: "/bhv/basis-2-daagse", element: <BhvBasis2 /> },
    { path: "/bhv/basis-e-learning", element: <BhvBasis1Elearning /> },
    { path: "/bhv/herhaling-1-dag", element: <BhvHerhaling /> },
    { path: "/bhv/herhaling-e-learning", element: <BhvHerhaling05Elearning /> },

    // Ploegleider
    { path: "/ploegleider", element: <PloegleiderPage /> },
    { path: "/ploegleider-basis-2-daagse", element: <PloegleiderPage /> },
    { path: "/ploegleider-basis-1-dag-met-elearning", element: <PloegleiderPage /> },
    { path: "/ploegleider-herhaling-halve-dag", element: <PloegleiderPage /> },

    // Ontruimingsoefening
    { path: "/ontruimingsoefening", element: <OntruimingsPage /> },
    { path: "/ontruimingsoefening/fase0", element: <Fase0 /> },
    { path: "/ontruimingsoefening/fase1", element: <Fase1 /> },
    { path: "/ontruimingsoefening/fase2", element: <Fase2 /> },
    { path: "/ontruimingsoefening/fase3", element: <Fase3 /> },
    { path: "/ontruimingsoefening/fase4", element: <Fase4 /> },

    { path: "/ontruimingsoefening/fases", element: <Fases /> },
    { path: "/ontruimingsoefening/scenarios", element: <Scenarios /> },
    { path: "/ontruimingsoefening/verslag", element: <Verslag /> },

    // EHBO
    { path: "/ehbo", element: <Ehbo /> },
    { path: "/ehbo-basis-3-daagse", element: <Ehbo /> },
    { path: "/ehbo-basis-2-daagse-met-elearning", element: <Ehbo /> },
    { path: "/ehbo-herhaling-hele-dag", element: <Ehbo /> },
    { path: "/ehbo-herhaling-halve-dag", element: <Ehbo /> },

    // Workshops
    { path: "/workshops", element: <Workshops /> },
    { path: "/workshops/gebruik-kleine-blusmiddelen", element: <KleineBlusmiddelen /> },
    { path: "/workshops/portofoongebruik", element: <Portofoongebruik /> },
    { path: "/workshops/reanimatie-volwassene", element: <ReanimatieMetGebruikAedVolwassene /> },
    { path: "/workshops/reanimatie-kind-baby", element: <ReanimatieMetGebruikAedKind /> },
    { path: "/workshops/stop-de-bloeding-red-een-leven", element: <StopDeBloedingRedEenLeven /> },

    //uitleg trainingen
    { path: "/maatwerk", element: <Maatwerk /> },

    // Regio's
    { path: "/rotterdam-rijnmond", element: <RotterdamPage /> },
    { path: "/zeeland", element: <ZeelandPage /> },
    { path: "/den-haag-westland", element: <WestlandPage /> },

    // Blog
    { path: "/blog", element: <BlogPage /> },
    { path: "/blog/:slug", element: <BlogDetail /> },

    // LeadPage
    { path: "/veiligheidscheck", element: <Veiligheidscheck />},
    { path: "/veiligheidscheck-bedankt", element: <VeiligheidscheckBedankt /> },

    // Login (nu correct beveiligd)
    {
        path: "/inloggen",
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    { path: "/inlog", element: <Navigate to="/inloggen" replace /> },

    // Quiz publique toegang
    { path: "/quiz-access", element: <AccessPage /> },

    { path: "/landingpage", element: <LandingPage /> },
    { path: "/veelgestelde-vragen", element: <Faq /> },
    { path: "/offerte", element: <OfferteAanvraag />},

    { path: "/over-ons", element: <OverOns />},
    { path: "/bedrijfsgegevens", element: <Bedrijfsgegevens />},
    { path: "/contact", element: <ContactOns /> }
];

export default publicRoutes;
