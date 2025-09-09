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

// onBackgroundMessage(messaging, (payload) => {
//   const title = payload.notification?.title || "Notification";
//   const options = {
//     body: payload.notification?.body || "",
//     icon: "/favicon.ico",
//   };
//   self.registration.showNotification(title, options);
// });

// Handle background messages
onBackgroundMessage(messaging, (payload) => {
  console.log("[sw.js] Received background message:", payload);

  const notificationTitle =
    payload.notification?.title || payload.data?.title || "New Notification";
  const notificationOptions = {
    body:
      payload.notification?.body ||
      payload.data?.body ||
      "You have a new message",
    icon: "/icon-192x192.png",
    badge: "/badge-72x72.png",
    tag: "notification-tag",
    requireInteraction: true,
    actions: [
      {
        action: "open",
        title: "Open App",
        icon: "/icon-192x192.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/close-icon.png",
      },
    ],
    data: {
      url: "/", // URL to open when notification is clicked
      ...payload.data,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
