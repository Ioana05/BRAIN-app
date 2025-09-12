import { useState } from "react";
import NotificationCard from "../NotificationCard/NotificationCard";
const notifications = [
  {
    id: 1,
    title: "Update",
    message: "New features have been added.",
    isread: false,
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Reminder",
    message: "Don't forget to check out our latest articles.",
    isRead: false,
    time: "20 mins ago",
  },
  {
    id: 3,
    title: "Welcome",
    message: "Thanks for enabling notifications!",

    isRead: true,
    time: "1 day ago",
  },
];
const Notifications = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const markAsRead = (id) => {
    const updatedNotifications = notificationList.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    setNotificationList(updatedNotifications);
  };
  return (
    <div style={{ padding: "1rem 2rem" }}>
      {notificationList.map((notification) => (
        <NotificationCard
          key={notification.id}
          {...notification}
          onMarkAsRead={() => markAsRead(notification.id)}
        />
      ))}
    </div>
  );
};
export default Notifications;
