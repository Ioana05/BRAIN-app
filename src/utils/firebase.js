// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV-a2Gz4jdFq5zBHLRYCn_duY1ccw3JnA",
  authDomain: "brain-pwa.firebaseapp.com",
  projectId: "brain-pwa",
  storageBucket: "brain-pwa.firebasestorage.app",
  messagingSenderId: "1079952596923",
  appId: "1:1079952596923:web:4237227ea0e49325f1ee9e",
  measurementId: "G-LL164WYB03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BJRaHw59lnP_WXTVOnuXAmyB3MgmzhZxfU76l-zRwGykkopQ6_BuFAZc2K2TSW3ywxcvMoHwhr7cMWbIGVvaaOM	",
    });
    console.log("FCM Token:", token);

    await fetch("https://REGION-PROJECT.cloudfunctions.net/saveToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  }
}
