import { useLocation } from "react-router-dom";
import Header from "@/shared/components/layout/header/Header";
import Footer from "@/shared/components/layout/footer/Footer";

function Layout({ children }) {
    const location = useLocation();

    /**
     * Funnel-routes waar we GEEN header/footer willen tonen
     * - landing van de veiligheidscheck
     * - wizard (start)
     */
    const hideChrome =
        location.pathname === "/veiligheidscheck" ||
        location.pathname.startsWith("/veiligheidscheck/start") ||
        location.pathname === "/veiligheidscheck-bedankt"


    return (
        <div className="outer-container">
            {/* Header alleen tonen buiten funnel */}
            {!hideChrome && <Header />}

            {/* Pagina-inhoud */}
            {children}

            {/* Footer alleen tonen buiten funnel */}
            {!hideChrome && <Footer />}
        </div>
    );
}

export default Layout;