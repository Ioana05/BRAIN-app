import fs from "fs";
import path from "path";
import admin from "firebase-admin";

// --- 1. Initialize Admin SDK ---
const serviceAccountPath = path.resolve("./serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// --- 2. Funcție pentru a prelua toate token-urile ---
async function getAllTokens() {
  const snapshot = await db.collection("deviceTokens").get();
  if (snapshot.empty) {
    console.log("No tokens found in database.");
    return [];
  }
  return snapshot.docs.map((doc) => doc.data().token);
}

// --- 3. Funcție pentru a trimite notificări ---
async function sendNotification(title, body) {
  const tokens = await getAllTokens();

  if (tokens.length === 0) {
    console.log("No tokens to send notifications to.");
    return;
  }

  // Trimite notificări către toate token-urile
  const message = {
    notification: {
      title: "Hello!",
      body: "This is a test notification",
    },
    tokens: tokens,
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(
      `Notifications sent. Success: ${response.successCount}, Failures: ${response.failureCount}`
    );

    // Șterge token-urile invalide
    response.responses.forEach((res, idx) => {
      if (!res.success) {
        const invalidToken = tokens[idx];
        db.collection("tokens").doc(invalidToken).delete().catch(console.error);
        console.log(`Deleted invalid token: ${invalidToken}`);
      }
    });
  } catch (err) {
    console.error("Error sending notifications:", err);
  }
}

// --- 4. Exemplu de apel ---
(async () => {
  await sendNotification("Hello!", "This is a test notification");
  console.log("Done sending notifications.");
})();
