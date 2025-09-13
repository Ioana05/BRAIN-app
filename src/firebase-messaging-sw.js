console.log("[SW] Starting");

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);

if (workbox) {
  console.log("[SW] Workbox loaded");
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
}

importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyBV-a2Gz4jdFq5zBHLRYCn_duY1ccw3JnA",
  authDomain: "brain-pwa.firebaseapp.com",
  projectId: "brain-pwa",
  storageBucket: "brain-pwa.firebasestorage.app",
  messagingSenderId: "1079952596923",
  appId: "1:1079952596923:web:4237227ea0e49325f1ee9e",
  measurementId: "G-LL164WYB03",
};
// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("[FCM] Background message:", payload);

  const notificationTitle =
    (payload.notification && payload.notification.title) ||
    (payload.data && payload.data.title) ||
    "New Notification";

  const urlToOpen = "https://www.edusoft.ro/anunturi.html";

  const notificationOptions = {
    body:
      (payload.notification && payload.notification.body) ||
      (payload.data && payload.data.body) ||
      "You have a new message",
    data: { url: urlToOpen },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  // Send message to all clients (open tabs)
  self.clients
    .matchAll({ includeUncontrolled: true, type: "window" })
    .then((clients) => {
      clients.forEach((client) => {
        console.log("[SW] Sending message to client:", client);
        client.postMessage({ type: "NEW_NOTIFICATION", payload });
      });
    });
});

// Handle clicks on notifications
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // close the notification

  const url = event.notification.data.url;

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        for (const client of clients) {
          // If a client is already open at that URL, focus it
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        // Otherwise, open a new window/tab
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
  );
});

self.addEventListener("install", () => console.log("[SW] Installed"));
self.addEventListener("activate", () => console.log("[SW] Activated"));
