(function loadAnalyticsWhenIdle() {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") return;

  function loadGtag() {
    if (window.gtag) return;

    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-KNSP4TFGL3";
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", "G-KNSP4TFGL3");
  }

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadGtag, { timeout: 5000 });
  } else {
    window.addEventListener("load", loadGtag, { once: true });
    window.setTimeout(loadGtag, 8000);
  }
})();
