import admin from "firebase-admin";

// --- 1. Initialize Admin SDK (singleton pattern) ---
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID,
    }),
  });
}

const db = admin.firestore();

// --- 2. Get all tokens from Firestore ---
export async function getAllTokens() {
  const snapshot = await db.collection("deviceTokens").get();
  return snapshot.docs.map((doc) => doc.data().token).filter(Boolean);
}

// --- 3. Send notification to tokens ---
export async function sendNotification(title, body) {
  const tokens = await getAllTokens();
  if (tokens.length === 0) return { success: 0, failures: 0, invalidTokens: 0 };

  const message = {
    data: { title, body },
    tokens,
    webpush: { headers: { Urgency: "high" } },
  };

  const response = await admin.messaging().sendEachForMulticast(message);

  // Cleanup invalid tokens
  const invalidTokens = [];
  response.responses.forEach((res, idx) => {
    if (!res.success) {
      const code = res.error?.code;
      if (
        code === "messaging/invalid-registration-token" ||
        code === "messaging/registration-token-not-registered"
      ) {
        invalidTokens.push(tokens[idx]);
      }
    }
  });

  if (invalidTokens.length > 0) {
    for (const token of invalidTokens) {
      const query = await db
        .collection("deviceTokens")
        .where("token", "==", token)
        .get();
      await Promise.all(query.docs.map((doc) => doc.ref.delete()));
    }
  }

  return {
    success: response.successCount,
    failures: response.failureCount,
    invalidTokens: invalidTokens.length,
  };
}
