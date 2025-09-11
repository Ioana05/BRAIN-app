import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

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
export const messaging = getMessaging(app);
export const auth = getAuth(app);

signInAnonymously(auth)
  .then(() => console.log("Signed in anonymously"))
  .catch((err) => console.error("Anonymous sign-in failed", err));

export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission not granted.");
  }
}

export async function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
}

export async function saveTokenToFirestore(deviceId, token) {
  await setDoc(doc(db, "deviceTokens", deviceId), {
    token,
    updatedAt: serverTimestamp(),
  });
}

export async function getAndStoreFcmToken() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const currentToken = await getToken(messaging, {
      vapidKey: VAPIDKEY,
      serviceWorkerRegistration: registration,
    });
    if (currentToken) {
      console.log(currentToken);
      const deviceId = await getOrCreateDeviceId();
      await saveTokenToFirestore(deviceId, currentToken);
      localStorage.setItem("fcmToken", currentToken);
    } else {
      console.log("No registration token available.");
    }
  } catch (err) {
    console.error("Error retrieving token:", err);
  }
}
