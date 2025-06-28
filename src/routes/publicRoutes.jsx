import Home from '../pages/homePage/HomePage.jsx';

import NotFoundPage from "../pages/notFoundPage/NotFoundPage.jsx";
import BuildPage from "../pages/buildPage/BuildPage.jsx";


const publicRoutes = [
    { path: '/', element: <BuildPage />},
    // { path: '/training/bhv', element: <BhvPage /> },
    // { path: '/landingpage', element: <LandingPage /> },
    // { path: '/dashboard', element: <Dashboard /> },
    // { path: '/mijn-facturen', element: <MijnFacturen />},
    // { path: '/invioce', element: <Invoice /> },
    { path: '*', element: <NotFoundPage /> }, // fallback
];

export default publicRoutes;