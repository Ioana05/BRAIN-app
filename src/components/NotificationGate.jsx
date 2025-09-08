import { useEffect, useState } from "react";
import { getAndStoreFcmToken } from "../utils/firebase";
import { getAuth, signInAnonymously } from "firebase/auth";

export default function NotificationGate({ children }) {
  const [allowed, setAllowed] = useState(false);
  const [isPwa, setIsPwa] = useState(false);

  async function askForNotifications() {
    try {
      const auth = getAuth();
      await signInAnonymously(auth);
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        await getAndStoreFcmToken();
        localStorage.setItem("notificationsPromptShown", "true");
        return true;
      } else {
        alert("You must allow notifications to use this app.");
        localStorage.setItem("notificationsPromptShown", "true"); // mark that we asked
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  useEffect(() => {
    // Check if running as PWA
    const pwa =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    setIsPwa(pwa);

    if (!pwa) return; // don't prompt if not installed

    const promptShown =
      localStorage.getItem("notificationsPromptShown") === "true";
    const token = localStorage.getItem("fcmToken");

    // already allowed
    if (token) {
      setAllowed(true);
      return;
    }

    // prompt only if not shown yet
    if (!promptShown) {
      askForNotifications().then((granted) => setAllowed(granted));
    }
  }, []);

  if (!isPwa) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p>Please install the app on your device to enable notifications.</p>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p>
          Notifications are required to use this app. Please enable them in your
          browser settings.
        </p>
      </div>
    );
  }

  return children;
}
