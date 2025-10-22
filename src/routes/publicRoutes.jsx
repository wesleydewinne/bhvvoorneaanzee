import HomePage from "../pages/homePage/HomePage.jsx";
import BhvPage from "../pages/bhvPage/BhvPage.jsx";
import LandingPage from "../pages/landingPage/LandingPage.jsx";
import OntruimingsPage from "../pages/ontruimingsOefeningPage/OntruimingsOefeningPage.jsx";
import Fase0 from "../pages/ontruimingsOefeningPage/fase/Fase0.jsx";
import Fase1 from "../pages/ontruimingsOefeningPage/fase/Fase1.jsx";
import Fase2 from "../pages/ontruimingsOefeningPage/fase/Fase2.jsx";
import Fase3 from "../pages/ontruimingsOefeningPage/fase/Fase3.jsx";
import Fase4 from "../pages/ontruimingsOefeningPage/fase/Fase4.jsx";
import Faq from "../pages/faq/Faq.jsx";
import BlogPage from "../pages/blog/BlogPage.jsx";
import BlogDetail from "../pages/blog/BlogDetail.jsx";

//
import Fases from "@/pages/ontruimingsverslag/Fases.jsx";


// Quiz pages
import AccessPage from "../pages/quiz/AccessPage.jsx";
import Scenarios from "@/pages/ontruimingsverslag/Scenarios.jsx";
import Verslag from "@/pages/ontruimingsverslag/Verslag.jsx";



const publicRoutes = [
    { path: '/', element: <HomePage />},
    { path: '/bhv', element: <BhvPage /> },
    { path: '/ontruimingsoefening', element: <OntruimingsPage /> },
    { path: '/ontruimingsoefening/fase0', element: <Fase0 /> },
    { path: '/ontruimingsoefening/fase1', element: <Fase1 /> },
    { path: '/ontruimingsoefening/fase2', element: <Fase2 /> },
    { path: '/ontruimingsoefening/fase3', element: <Fase3 /> },
    { path: '/ontruimingsoefening/fase4', element: <Fase4 /> },
    { path: '/landingpage', element: <LandingPage /> },
    { path: '/veelgestelde-vragen', element: <Faq /> },
    { path: '/blog', element: <BlogPage /> },
    { path: '/blog/:slug', element: <BlogDetail /> },

    // blog

    { path: '/ontruimingsoefening/fases', element: <Fases />},
    { path: '/ontruimingsoefening/scenarios', element: <Scenarios /> },
    { path: '/ontruimingsoefening/verslag', element: <Verslag /> },

    // Quiz toegangspagina (publiek bereikbaar)
    { path: '/quiz-access', element: <AccessPage /> }
];

export default publicRoutes;
