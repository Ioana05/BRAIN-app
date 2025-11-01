import admin from "firebase-admin";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import fetchAnnouncements from "./fetchAnnouncements.js";
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

async function getAnnouncementsFromDb() {
  const snapshot = await getDocs(collection(db, "announcements"));
  return snapshot.docs.map((doc) => doc.data());
}

async function storeNewAnnouncements(announcements) {
  const promises = announcements.map((a) =>
    setDoc(doc(db, "as", crypto.randomUUID()), {
      title: a.title,
      img: a.img,
      articleId: a.articleId,
      galleyId: a.galleyId,
      videoLink: a.videoLink,
      pdfLink: a.pdfLink,
      description: a.description,
      createdAt: new Date().toISOString(),
    })
  );
  const results = await Promise.allSettled(promises);
  const stored = [];
  const failed = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") stored.push(announcements[i]);
    else failed.push({ announcement: announcements[i], reason: r.reason });
  });

  return { stored, failed };
}

export async function checkForNewAnnouncements() {
  // Scrape announcements from source
  const { data, status_code } = await fetchAnnouncements();
  if (!data || status_code !== 200) {
    return { ok: false, error: "No valid data available" };
  }
  // Compare with announcements in Firestore
  const existingAnnouncements = await getAnnouncementsFromDb();
  // Robust solution to get new announcements, but works only if we are certain that articleId is always present, will check with the provider
  // const existingIds = new Set(existingAnnouncements.map((a) => a.articleId));
  // const newAnnouncements = data.filter(
  //   (a) => a.articleId && !existingIds.has(a.articleId)
  // );
  const count = data.length - existingAnnouncements.length;
  const newAnnouncements = count > 0 ? data.slice(0, count) : [];
  if (newAnnouncements.length === 0) {
    return { ok: false, error: "No new announcements available" };
  }
  const { stored, failed } = await storeNewAnnouncements(newAnnouncements);

  return {
    ok: true,
    newAnnouncementsCount: newAnnouncements.length,
    newAnnouncements,
    stored,
    failed,
  };
}
