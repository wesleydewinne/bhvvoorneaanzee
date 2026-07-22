(function loadAnalyticsAfterPageLoad() {
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

  function scheduleAnalytics() {
    window.setTimeout(loadGtag, 3000);
  }

  if (document.readyState === "complete") {
    scheduleAnalytics();
  } else {
    window.addEventListener("load", scheduleAnalytics, { once: true });
  }
})();
