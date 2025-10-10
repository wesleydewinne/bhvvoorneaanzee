import { useEffect } from 'react';
import { Meta } from 'react-head';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';

// Routes
import publicRoutes from './routes/publicRoutes.jsx';
import privateRoutes from './routes/privateRoutes.jsx';
import quizRoutes from './routes/quizRoutes.jsx';

// Auth wrappers
import PrivateRoute from './components/auth/PrivateRoute.jsx';
import QuizPrivateRoute from './components/auth/QuizPrivateRoute.jsx';

// Pages
import NotFoundPage from './pages/notFoundPage/NotFoundPage.jsx';
import localBusinessData from './data/localBusiness.json';

function App() {
    // Voeg JSON-LD structured data toe aan <head>
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(localBusinessData);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className="outer-container">
            {/* ====================== */}
            {/* SEO Meta tags */}
            {/* ====================== */}
            <Meta
                name="description"
                content="Professionele BHV-, EHBO-, ploegleiderstrainingen en ontruimingsoefeningen in Voorne aan Zee en omgeving. Praktische veiligheidstrainingen, volledig afgestemd op uw organisatie en medewerkers."
            />

            {/* ====================== */}
            {/* Header */}
            {/* ====================== */}
            <Header />

            {/* ====================== */}
            {/* Main content / Routes */}
            {/* ====================== */}
            <main className="content">
                <div className="fullscreen-center">
                    <Routes>
                        {/* Publieke routes */}
                        {publicRoutes.map(({path, element}) => (
                            <Route key={path} path={path} element={element}/>
                        ))}

                        {privateRoutes.map(({path, element}) => (
                            <Route
                                key={path}
                                path={path}
                                element={<PrivateRoute>{element}</PrivateRoute>}
                            />
                        ))}

                        {quizRoutes.map(({path, element}) => (
                            <Route
                                key={path}
                                path={path}
                                element={<QuizPrivateRoute>{element}</QuizPrivateRoute>}
                            />
                        ))}

                        {/* Fallback 404 page */}
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </main>

            {/* ====================== */}
            {/* Footer */}
            {/* ====================== */}
            <Footer />
        </div>
    );
}

export default App;
