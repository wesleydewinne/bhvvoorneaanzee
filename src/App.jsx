import { useEffect } from "react";
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
import Head from "@/components/head/Head.jsx";

function App() {

    return (
        <div className="outer-container">
            {/* ====================== */}
            {/* SEO Meta tags */}
            {/* ====================== */}
            <Head />

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

                            <Route element={<PrivateRoute />}>
                                {privateRoutes.map(({ path, element }) => (
                                    <Route key={path} path={path} element={element} />
                                ))}
                            </Route>


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
