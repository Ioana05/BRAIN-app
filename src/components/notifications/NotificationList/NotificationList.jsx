import NotificationCard from "../NotificationCard/NotificationCard.jsx";
import { useNotifications } from "../../../contexts/notifications.context.jsx";
import NoNotificationsCard from "../NoNotificationsCard/NoNotificationsCard.jsx";
import { NotificationsContainer } from "./NotificationList.styles.jsx";

const NotificationList = () => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <NotificationsContainer $centered={notifications.length === 0}>
      {notifications.length === 0 ? (
        <NoNotificationsCard />
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            {...notification}
            onMarkAsRead={() => markAsRead(notification.id)}
          />
        ))
      )}
    </NotificationsContainer>
  );
};
export default NotificationList;
