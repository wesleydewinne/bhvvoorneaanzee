import "./HomePage.css";
import { lazy, Suspense, useEffect, useState } from "react";
import CTAButtons from "@/shared/components/ui/button/cta/CTAButton.jsx";
import TrustBar from "@/shared/components/sections/trustBar/TrustBar.jsx";
import GoogleReviewBadge from "@/features/reviews/components/GoogleReviewBadge.jsx";

const HomePageDeferredSections = lazy(() => import("./HomePageDeferredSections.jsx"));

function HomePage() {
    const [showDeferredSections, setShowDeferredSections] = useState(false);

    useEffect(() => {
        let idleId = null;
        let timeoutId = null;
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        const revealSections = () => {
            setShowDeferredSections(true);
        };

        const scheduleReveal = () => {
            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(revealSections, { timeout: 3500 });
            } else {
                timeoutId = window.setTimeout(revealSections, 1800);
            }
        };

        const revealOnIntent = () => revealSections();

        // On smaller devices, mounting the entire long homepage while the user
        // is still reading the hero competes with the main thread. Wait for
        // actual intent there; desktop has enough headroom to use idle time.
        if (!isMobile) {
            if (document.readyState === "complete") {
                scheduleReveal();
            } else {
                window.addEventListener("load", scheduleReveal, { once: true });
            }
        }

        window.addEventListener("scroll", revealOnIntent, { once: true, passive: true });
        window.addEventListener("pointerdown", revealOnIntent, { once: true, passive: true });
        window.addEventListener("touchstart", revealOnIntent, { once: true, passive: true });
        window.addEventListener("keydown", revealOnIntent, { once: true });

        return () => {
            window.removeEventListener("load", scheduleReveal);
            window.removeEventListener("scroll", revealOnIntent);
            window.removeEventListener("pointerdown", revealOnIntent);
            window.removeEventListener("touchstart", revealOnIntent);
            window.removeEventListener("keydown", revealOnIntent);

            if (idleId !== null && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }

            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
        };
    }, []);

    return (
        <div className="homepage">
            <section className="homepage-hero">
                <img
                    src="/images/hero/overons-header-1200.webp"
                    srcSet="/images/hero/overons-header-480.webp 480w, /images/hero/overons-header-768.webp 768w, /images/hero/overons-header-1024.webp 1024w, /images/hero/overons-header-1400.webp 1400w"
                    sizes="100vw"
                    alt=""
                    className="homepage-hero__image"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    width={1400}
                    height={600}
                />
                <div className="container homepage-hero__inner">
                    <div className="homepage-hero__content">
                        <div className="homepage-hero__title-row">
                            <h1 className="homepage-hero__title">
                                BHV, EHBO en ontruimingstrainingen voor bedrijven in Voorne aan Zee
                            </h1>

                            <GoogleReviewBadge />
                        </div>

                        <p className="homepage-hero__subtitle">
                            BHV Voorne aan Zee verzorgt incompany veiligheidstrainingen
                            voor organisaties in Voorne aan Zee, Rotterdam-Rijnmond,
                            Westland, Den Haag en omliggende plaatsen. Medewerkers leren
                            brand, letsel, reanimatie en ontruiming herkenbaar en rustig
                            aanpakken op hun eigen werkplek.
                        </p>

                        <div className="homepage-hero__actions">
                            <CTAButtons />
                        </div>
                    </div>
                </div>
            </section>

            <TrustBar />

            <div className="homepage__deferred-shell">
                {showDeferredSections ? (
                    <Suspense fallback={<div className="homepage__deferred-placeholder" />}>
                        <HomePageDeferredSections />
                    </Suspense>
                ) : (
                    <div className="homepage__deferred-placeholder" />
                )}
            </div>
        </div>
    );
}

export default HomePage;
