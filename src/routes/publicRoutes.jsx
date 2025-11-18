import HomePage from "@/pages/homePage/HomePage.jsx";
import BhvPage from "@/pages/bhvPage/BhvPage.jsx";
import PloegleiderPage from "@/pages/ploegleiderPage/PloegleiderPage.jsx";
import LandingPage from "@/pages/landingPage/LandingPage.jsx";
import OntruimingsPage from "@/pages/ontruimingsOefeningPage/OntruimingsOefeningPage.jsx";
import Fase0 from "@/pages/ontruimingsOefeningPage/fase/Fase0.jsx";
import Fase1 from "@/pages/ontruimingsOefeningPage/fase/Fase1.jsx";
import Fase2 from "@/pages/ontruimingsOefeningPage/fase/Fase2.jsx";
import Fase3 from "@/pages/ontruimingsOefeningPage/fase/Fase3.jsx";
import Fase4 from "@/pages/ontruimingsOefeningPage/fase/Fase4.jsx";
import Ehbo from "@/pages/ehbo/EhboPage.jsx"

import Workshops from "@/pages/workshops/Workshops.jsx";
import KleineBlusmiddelen from "@/pages/workshops/soortenWorkshops/Kleine_Blusmiddelen.jsx";
import Portofoongebruik from "@/pages/workshops/soortenWorkshops/Portofoongebruik.jsx";
import ReanimatieMetGebruikAedVolwassene from "@/pages/workshops/soortenWorkshops/ReanimatieMetGebruikAEDVolwassene.jsx";
import ReanimatieMetGebruikAedKind from "@/pages/workshops/soortenWorkshops/ReanimatieMetGebruikAEDKind.jsx";
import StopDeBloedingRedEenLeven from "@/pages/workshops/soortenWorkshops/StopDeBloedingRedEenLeven.jsx";

import Faq from "@/pages/faq/Faq.jsx";
import BlogPage from "@/pages/blog/BlogPage.jsx";
import BlogDetail from "@/pages/blog/BlogDetail.jsx";

//
import Fases from "@/pages/ontruimingsverslag/Fases.jsx";

// Quiz pages
import AccessPage from "../pages/quiz/AccessPage.jsx";
import Scenarios from "@/pages/ontruimingsverslag/Scenarios.jsx";
import Verslag from "@/pages/ontruimingsverslag/Verslag.jsx";
import React from "react";
import BhvRotterdamPage from "@/pages/bhvPage/bhvRegion/BhvRotterdamPage.jsx";
import BhvZeelandPage from "@/pages/bhvPage/bhvRegion/BhvZeelandPage.jsx";
import BhvWestlandPage from "@/pages/bhvPage/bhvRegion/BhvWestlandPage.jsx";
import Login from "@/pages/login/LoginPage.jsx";
import {Navigate} from "react-router-dom";

const publicRoutes = [
    //home
    { path: '/', element: <HomePage />},
    // bhv
    { path: '/bhv', element: <BhvPage /> },
    { path: '/bhv-training-rotterdam', element: <BhvRotterdamPage /> },
    { path: '/bhv-training-zeeland', element: <BhvZeelandPage /> },
    { path: '/bhv-training-westland', element: <BhvWestlandPage /> },

    //ploegleider
    { path: '/ploegleider', element: <PloegleiderPage /> },

    //ontruimingsoefening
    { path: '/ontruimingsoefening', element: <OntruimingsPage /> },
    { path: '/ontruimingsoefening/fase0', element: <Fase0 /> },
    { path: '/ontruimingsoefening/fase1', element: <Fase1 /> },
    { path: '/ontruimingsoefening/fase2', element: <Fase2 /> },
    { path: '/ontruimingsoefening/fase3', element: <Fase3 /> },
    { path: '/ontruimingsoefening/fase4', element: <Fase4 /> },

    { path: '/ehbo', element: <Ehbo /> },

    // Workshop
    { path: '/workshops', element: <Workshops /> },
    { path: '/workshops/gebruik_kleine_blusmiddelen', element: <KleineBlusmiddelen /> },
    { path: '/workshops/portofoongebruik', element: <Portofoongebruik />},

    { path: '/workshop/reanimatie_volwassene', element: <ReanimatieMetGebruikAedVolwassene /> },
    { path: '/workshops/reanimatie_kind_baby', element: <ReanimatieMetGebruikAedKind /> },
    { path: '/workshops/stop_de_bloeding_red_een_leven', element: <StopDeBloedingRedEenLeven /> },

    // blog
    { path: '/blog', element: <BlogPage /> },
    { path: '/blog/:slug', element: <BlogDetail /> },
    { path: '/ontruimingsoefening/fases', element: <Fases />},
    { path: '/ontruimingsoefening/scenarios', element: <Scenarios /> },
    { path: '/ontruimingsoefening/verslag', element: <Verslag /> },


    // Login & registreer
    { path: '/inloggen', element: <Login /> },
    { path: '/inlog', element: <Navigate to="/inloggen" replace /> },


    // Quiz toegangspagina (publiek bereikbaar)
    { path: '/quiz-access', element: <AccessPage /> },

    { path: '/landingpage', element: <LandingPage /> },
    { path: '/veelgestelde-vragen', element: <Faq /> },
];

export default publicRoutes;
