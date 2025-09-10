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
  console.log("[firebase-messaging-sw.js] Background message:", payload);

  const notificationTitle =
    (payload.notification && payload.notification.title) ||
    (payload.data && payload.data.title) ||
    "New Notification";

  const notificationOptions = {
    body:
      (payload.notification && payload.notification.body) ||
      (payload.data && payload.data.body) ||
      "You have a new message",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
