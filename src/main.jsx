import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { HeadProvider } from "react-head";
import { QuizProvider } from "./context/QuizContext.jsx";

// Alleen global.css importeren is genoeg
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <HeadProvider>
                <QuizProvider>
                    <App />
                </QuizProvider>
            </HeadProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
