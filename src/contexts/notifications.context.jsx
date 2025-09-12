import { createContext, useContext, useState, useEffect } from "react";

const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

const defaultNotifications = [
  {
    id: 1,
    title: "Update",
    message: "New features have been added.",
    isRead: false,
    time: new Date().toLocaleString(),
  },
  {
    id: 2,
    title: "Reminder",
    message: "Don't forget to check out our latest articles.",
    isRead: false,
    time: new Date().toLocaleString(),
  },
  {
    id: 3,
    title: "Welcome",
    message: "Thanks for enabling notifications!",
    isRead: true,
    time: new Date().toLocaleString(),
  },
];
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem("notifications");
    if (stored) return [...JSON.parse(stored)];
    else {
      return defaultNotifications;
    }
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
      if (event.data?.type === "NEW_NOTIFICATION") {
        console.log("Received NEW_NOTIFICATION from SW", event.data);
        const newNotif = {
          id: Date.now(),
          title: event.data.payload.data.title,
          message: event.data.payload.data.body,
          time: new Date().toLocaleString(),
          isRead: false,
        };
        setNotifications((prev) => [newNotif, ...prev]);
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
    setNotifications((prev) => prev.filter((n) => new Date(n.time) >= cutoff));
  }, []);

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAsRead }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
