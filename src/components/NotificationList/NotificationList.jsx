import NotificationCard from "../NotificationCard/NotificationCard";
import { useNotifications } from "../../contexts/notifications.context.jsx";
const NotificationList = () => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div style={{ padding: "1rem 2rem" }}>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          {...notification}
          onMarkAsRead={() => markAsRead(notification.id)}
        />
      ))}
    </div>
  );
};
export default NotificationList;
