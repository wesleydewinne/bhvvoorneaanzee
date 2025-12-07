export const pageview = (url) => {
    if (window.gtag) {
        window.gtag("config", "G-KNSP4TFGL3", {
            page_path: url,
        });
    }
};
