import { useEffect } from "react";

export default function usePwaInstall() {
  useEffect(() => {
    const INSTALL_KEY = "pwa_install_event_sent";
    // If we already tracked install on this device, do nothing.
    const alreadySent = localStorage.getItem(INSTALL_KEY);
    if (alreadySent === "true") return;

    const queuedEvents = [];

    const sendEvent = (eventName, params) => {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
        localStorage.setItem(INSTALL_KEY, "true");
      } else {
        queuedEvents.push({ eventName, params });
      }
    };

    const flushQueue = () => {
      if (typeof window.gtag === "function") {
        queuedEvents.forEach(({ eventName, params }) =>
          window.gtag(eventName, params)
        );
        queuedEvents.length = 0;
        localStorage.setItem(INSTALL_KEY, "true");
      }
    };

    // Chrome / Chromium: appinstalled event
    const handleAppInstalled = () => {
      sendEvent("pwa_install", { platform: "chrome" });
    };
    window.addEventListener("appinstalled", handleAppInstalled);

    // iOS / Safari detection: standalone mode
    const isStandalone = () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone()) {
      sendEvent("pwa_install", { platform: "ios/android" });
    }

    // Poll to see when gtag becomes available, then flush queued events
    const interval = setInterval(() => {
      flushQueue();
      if (queuedEvents.length === 0) clearInterval(interval);
    }, 500);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearInterval(interval);
    };
  }, []);
}
