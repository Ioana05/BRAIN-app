import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getMessaging,
  onBackgroundMessage,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-sw.js";

const firebaseConfig = {
  apiKey: "AIzaSyBV-a2Gz4jdFq5zBHLRYCn_duY1ccw3JnA",
  authDomain: "brain-pwa.firebaseapp.com",
  projectId: "brain-pwa",
  storageBucket: "brain-pwa.firebasestorage.app",
  messagingSenderId: "1079952596923",
  appId: "1:1079952596923:web:4237227ea0e49325f1ee9e",
  measurementId: "G-LL164WYB03",
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  const title = payload.notification?.title || "Notification";
  const options = {
    body: payload.notification?.body || "",
    icon: "/favicon.ico",
  };
  self.registration.showNotification(title, options);
});
