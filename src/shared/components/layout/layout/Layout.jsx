import { useLocation } from "react-router-dom";
import Header from "@/shared/components/layout/header/Header";
import Footer from "@/shared/components/layout/footer/Footer";
import FloatingQuoteButton from "@/shared/components/ui/button/floatingQuoteButton/FloatingQuoteButton.jsx";
import DashboardShell from "@/features/dashboard/components/DashboardShell.jsx";
import "./Layout.css";

function Layout({ children }) {
    const location = useLocation();
    const usesDashboardShell =
        location.pathname === "/dashboard" ||
        location.pathname.startsWith("/admin") ||
        location.pathname === "/profile" ||
        location.pathname.startsWith("/account");

    /**
     * Funnel-routes waar we GEEN header/footer willen tonen
     * - landing van de veiligheidscheck
     * - wizard (start)
     */
    const hideChrome =
        location.pathname === "/veiligheidscheck" ||
        location.pathname.startsWith("/veiligheidscheck/start") ||
        location.pathname === "/veiligheidscheck-bedankt" ||
        usesDashboardShell;


    return (
        <div className="outer-container">
            {/* Header alleen tonen buiten funnel */}
            {!hideChrome && <Header />}

            {/* Pagina-inhoud */}
            {usesDashboardShell ? (
                <DashboardShell>{children}</DashboardShell>
            ) : (
                children
            )}

            {/* Footer alleen tonen buiten funnel */}
            {!hideChrome && <Footer />}

            {!hideChrome && (
                <FloatingQuoteButton to="/offerte" label="Offerte aanvragen" />
            )}
        </div>
    );
}

export default Layout;
