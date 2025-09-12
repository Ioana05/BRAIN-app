import { createContext, useContext, useState, useEffect } from "react";

const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Update",
      message: "New features have been added.",
      isread: false,
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
  ]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Listen to SW messages
  useEffect(() => {
    if (!navigator.serviceWorker) return;
    console.log("Setting up SW message listener");
    const handler = (event) => {
      if (event.data?.type === "NEW_NOTIFICATION") {
        console.log("Received notification from SW:", event);
        console.log("Payload:", event.data.payload);
        console.log("Data:", event.data.payload.data);
        const newNotif = {
          id: Date.now(),
          title: event.data.payload.data.title,
          message: event.data.payload.data.body,
          time: new Date().toLocaleString(),
          isRead: false,
        };
        setNotifications((prev) => [newNotif, ...prev]);
        setUnreadCount((prev) => prev + 1);
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
    setUnreadCount((prev) => prev - 1);
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
