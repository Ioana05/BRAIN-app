import { useEffect } from "react";

export default function usePwaInstall() {
  useEffect(() => {
    const queuedEvents = [];

    const sendEvent = (eventName, params) => {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
      } else {
        queuedEvents.push({ eventName, params });
      }
    };

    const handleAppInstalled = () => {
      console.log("PWA installed!");
      sendEvent("pwa_install", {
        event_category: "pwa",
        event_label: "installed",
      });
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    // Poll to see when gtag becomes available, then flush queued events
    const interval = setInterval(() => {
      if (typeof window.gtag === "function" && queuedEvents.length > 0) {
        queuedEvents.forEach(({ eventName, params }) =>
          window.gtag(eventName, params)
        );
        queuedEvents.length = 0;
        clearInterval(interval);
      }
    }, 500); // check every 0.5s

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearInterval(interval);
    };
  }, []);
}
