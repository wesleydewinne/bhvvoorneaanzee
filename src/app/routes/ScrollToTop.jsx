import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            let frameId;
            let attempts = 0;

            const scrollToAnchor = () => {
                const id = decodeURIComponent(hash.slice(1));
                const target = document.getElementById(id);

                if (target) {
                    target.scrollIntoView({ behavior: "auto", block: "start" });
                    return;
                }

                // Lazy-loaded routes kunnen enkele frames later in de DOM staan.
                if (attempts < 60) {
                    attempts += 1;
                    frameId = window.requestAnimationFrame(scrollToAnchor);
                }
            };

            frameId = window.requestAnimationFrame(scrollToAnchor);
            return () => window.cancelAnimationFrame(frameId);
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname, hash]);

    return null;
}

export default ScrollToTop;
