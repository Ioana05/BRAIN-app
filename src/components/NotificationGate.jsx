import { useState } from "react";
import { getAndStoreFcmToken } from "../utils/firebase";
import { getAuth, signInAnonymously } from "firebase/auth";
import NotificationPrompt from "./EnableNotificationsPrompt.jsx/NotificationPrompt";
const NotificationGate = ({ children }) => {
  // Check if Notification API exists
  const notificationsSupported = typeof Notification !== "undefined";
  async function askForNotifications() {
    // Early return if not supported
    if (!notificationsSupported) {
      console.log("Notifications not supported on this browser");
      return false;
    }
    try {
      const auth = getAuth();
      await signInAnonymously(auth);
      const permission = await Notification.requestPermission();
      console.log(permission);
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

  // Only check permission if Notification API exists
  const [showPrompt, setShowPrompt] = useState(
    notificationsSupported && Notification.permission !== "granted"
  );
  // If notifications aren't supported, just render children without prompt
  if (!notificationsSupported) {
    return <>{children}</>;
  }

  return (
    <>
      {showPrompt ? (
        <NotificationPrompt
          onEnable={async () => {
            const granted = await askForNotifications();
            if (!granted) {
              alert(
                "Notifications are blocked. Please enable them manually:\n" +
                  "1. Click the lock/info icon in your address bar\n" +
                  "2. Change notifications to 'Allow'\n" +
                  "3. Refresh the page"
              );
            } else {
              setShowPrompt(false);
            }
          }}
        />
      ) : (
        children
      )}
    </>
  );
};
export default NotificationGate;
