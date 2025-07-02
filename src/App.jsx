import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';

import publicRoutes from './routes/publicRoutes.jsx';
// import privateRoutes from './routes/privateRoutes.jsx';
// import PrivateRoute from './components/auth/PrivateRoute.jsx';
import NotFoundPage from './pages/notFoundPage/NotFoundPage.jsx';

function App() {
    return (
        <div className="outer-container">
            <Header />
            <main className="content">
                <Routes>
                    {publicRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}

                    {/*{privateRoutes.map(({ path, element }) => (*/}
                    {/*    <Route*/}
                    {/*        key={path}*/}
                    {/*        path={path}*/}
                    {/*        element={<PrivateRoute>{element}</PrivateRoute>}*/}
                    {/*    />*/}
                    {/*))}*/}
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
