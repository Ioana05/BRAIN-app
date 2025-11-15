import { useState } from "react";
import { getAndStoreFcmToken } from "../../../utils/firebase";
import NotificationPrompt from "./NotificationPrompt";

const NotificationGate = ({ children }) => {
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const notificationsSupported = typeof Notification !== "undefined";
  const [showPrompt, setShowPrompt] = useState(
    notificationsSupported && Notification.permission !== "granted"
  );

  async function askForNotifications() {
    if (!notificationsSupported) {
      console.log("Notifications not supported on this browser");
      return false;
    }

    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        await getAndStoreFcmToken();
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  const handleEnableNotifications = async () => {
    const granted = await askForNotifications();

    if (granted) {
      setShowPrompt(false);
      return;
    }

    const message =
      isStandalone && isMobile
        ? `Notifications are blocked. Please enable them manually:
          1. Open your device settings
          2. Go to Apps -> BRAIN
          3. Allow notifications
          4. Restart the app`
        : `Notifications are blocked. Please enable them manually:
          1. Click the Permissions icon/App info in your address bar
          2. Change notifications permission to 'Allow'
          3. Refresh the page`;

    alert(message);
  };

  return showPrompt ? (
    <NotificationPrompt onEnable={handleEnableNotifications} />
  ) : (
    <>{children}</>
  );
};
export default NotificationGate;
