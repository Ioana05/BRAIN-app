import { createContext, useContext, useState, useEffect } from "react";

const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

const defaultNotifications = [];
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem("notifications");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Use stored only if it’s a non-empty array with valid structure
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error("Failed to parse notifications from localStorage", err);
    }
    return defaultNotifications;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  // Keep localStorage updated as well
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Listen to SW messages
  useEffect(() => {
    if (!navigator.serviceWorker) return;

    console.log("Setting up SW message listener");
    const handler = (event) => {
      try {
        if (
          event.data?.type === "NEW_NOTIFICATION" &&
          event.data?.payload?.data
        ) {
          console.log("Received NEW_NOTIFICATION from SW", event.data);
          const newNotif = {
            id: Date.now(),
            title: event.data.payload.data.title,
            message: event.data.payload.data.body,
            time: new Date().toISOString(),
            isRead: false,
          };
          setNotifications((prev) => [newNotif, ...prev]);
        }
      } catch (err) {
        console.error("Error handling SW message", err);
      }
    };

    navigator.serviceWorker.addEventListener("message", handler);
    return () =>
      navigator.serviceWorker.removeEventListener("message", handler);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Clean notifications older than a month
  useEffect(() => {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - 1);
    setNotifications((prev) =>
      prev.filter((n) => {
        const date = new Date(n.time);
        return !isNaN(date) && date >= cutoff;
      })
    );
  }, []);

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAsRead, setNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
