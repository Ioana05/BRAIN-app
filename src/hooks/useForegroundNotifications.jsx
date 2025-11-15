import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { initFirebaseMessaging } from "../utils/firebase";
import { useNotifications } from "../contexts/notifications.context";

const useForegroundNotifications = () => {
  const { setNotifications } = useNotifications();

  useEffect(() => {
    let unsubscribe = null;

    const setupMessaging = async () => {
      try {
        const messaging = await initFirebaseMessaging();
        if (!messaging) {
          console.log("Foreground notifications not available");
          return;
        }

        unsubscribe = onMessage(messaging, (payload) => {
          console.log("Foreground FCM message:", payload);
          if (!setNotifications) return;

          setNotifications((prev) => [
            {
              id: Date.now(),
              title: payload.data.title,
              message: payload.data.body,
              time: new Date().toISOString(),
              isRead: false,
            },
            ...prev,
          ]);
        });
      } catch (err) {
        console.error("FCM setup failed:", err);
      }
    };

    setupMessaging();
    return () => unsubscribe && unsubscribe();
  }, [setNotifications]);
};

export default useForegroundNotifications;
