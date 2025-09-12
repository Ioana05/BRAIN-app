import { useState } from "react";
import { getAndStoreFcmToken } from "../utils/firebase";
import { getAuth, signInAnonymously } from "firebase/auth";
import NotificationPrompt from "./EnableNotificationsPrompt.jsx/NotificationPrompt";
const NotificationGate = ({ children }) => {
  async function askForNotifications() {
    try {
      const auth = getAuth();
      await signInAnonymously(auth);

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

  const [showPrompt, setShowPrompt] = useState(
    Notification.permission !== "granted"
  );

  return (
    <>
      {children}
      {showPrompt && (
        <NotificationPrompt
          onEnable={async () => {
            setShowPrompt(false);
            const granted = await askForNotifications();
            if (!granted) alert("Enable notifications in settings.");
          }}
          onClose={() => setShowPrompt(false)}
        />
      )}
    </>
  );
};
export default NotificationGate;
