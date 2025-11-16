import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getOrCreateDeviceId } from "./helpers";

const firebaseConfig = {
  apiKey: "AIzaSyBV-a2Gz4jdFq5zBHLRYCn_duY1ccw3JnA",
  authDomain: "brain-pwa.firebaseapp.com",
  projectId: "brain-pwa",
  storageBucket: "brain-pwa.firebasestorage.app",
  messagingSenderId: "1079952596923",
  appId: "1:1079952596923:web:4237227ea0e49325f1ee9e",
  measurementId: "G-LL164WYB03",
};

const VAPIDKEY =
  "BJRaHw59lnP_WXTVOnuXAmyB3MgmzhZxfU76l-zRwGykkopQ6_BuFAZc2K2TSW3ywxcvMoHwhr7cMWbIGVvaaOM";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

let messagingInstance = null;
let messagingInitPromise = null;

export const initFirebaseMessaging = async () => {
  if (messagingInstance) {
    return messagingInstance;
  }

  if (messagingInitPromise) {
    return messagingInitPromise;
  }

  messagingInitPromise = (async () => {
    try {
      const supported = await isSupported();
      if (!supported) {
        console.log("Firebase Messaging not supported on this browser");
        return null;
      }
      messagingInstance = getMessaging(app);
      console.log("Firebase Messaging initialized");
      return messagingInstance;
    } catch (err) {
      console.error("Failed to initialize Firebase Messaging:", err);
      return null;
    }
  })();

  return messagingInitPromise;
};

let authInitPromise = signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");
    return true;
  })
  .catch((err) => {
    console.error("Anonymous sign-in failed", err);
    return false;
  });

const waitForAuth = () => authInitPromise;

export async function saveTokenToFirestore(deviceId, token) {
  console.log("Calling [saveTokenToFirestore]");

  await waitForAuth();
  await setDoc(doc(db, "deviceTokens", deviceId), {
    token,
    updatedAt: serverTimestamp(),
  });
}

export async function getAndStoreFcmToken() {
  console.log("Calling [getAndStoreFcmToken]");

  await waitForAuth();
  const messaging = await initFirebaseMessaging();

  if (!messaging) {
    console.log(
      "[getAndStoreFcmToken]: Messaging not supported on this device"
    );
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const currentToken = await getToken(messaging, {
      vapidKey: VAPIDKEY,
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      const deviceId = await getOrCreateDeviceId();
      await saveTokenToFirestore(deviceId, currentToken);
      localStorage.setItem("fcmToken", currentToken);
      console.log(
        "[getAndStoreFcmToken]: Saved deviceId to localStorage and stored token to Firebase collection."
      );
    } else {
      console.log("[getAndStoreFcmToken]: No registration token available.");
    }
  } catch (err) {
    console.error("[getAndStoreFcmToken]: Error retrieving token:", err);
  }
}
