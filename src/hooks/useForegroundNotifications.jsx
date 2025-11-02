import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../utils/firebase";
import { useNotifications } from "../contexts/notifications.context";

const useForegroundNotifications = () => {
  const { setNotifications } = useNotifications();

  useEffect(() => {
    // Don't set up listener if messaging is not supported
    if (!messaging) {
      console.log("Foreground notifications not available");
      return;
    }
    const unsubscribe = onMessage(messaging, (payload) => {
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

    return () => unsubscribe && unsubscribe();
  }, [setNotifications]);
};

export default useForegroundNotifications;
