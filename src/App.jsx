import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';


import publicRoutes from './routes/publicRoutes.jsx';

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

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
