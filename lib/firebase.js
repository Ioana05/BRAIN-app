import admin from "firebase-admin";
import fetchAnnouncements from "./fetchAnnouncements.js";

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

export async function getAllTokens() {
  const snapshot = await db.collection("deviceTokens").get();
  return snapshot.docs.map((doc) => doc.data().token).filter(Boolean);
}

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
  const snapshot = await db.collection("announcements").get();
  return snapshot.docs.map((doc) => doc.data());
}

async function storeNewAnnouncements(announcements) {
  const promises = announcements.map(async (a) => {
    try {
      await db.collection("announcements").doc().set({
        title: a.title,
        img: a.img,
        articleId: a.articleId,
        galleyId: a.galleyId,
        videoLink: a.videoLink,
        pdfLink: a.pdfLink,
        description: a.description,
        createdAt: new Date().toISOString(),
      });
      return { status: "fulfilled", announcement: a };
    } catch (err) {
      return { status: "rejected", announcement: a, reason: err };
    }
  });

  const results = await Promise.all(promises);

  const stored = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.announcement);
  const failed = results
    .filter((r) => r.status === "rejected")
    .map((r) => ({ announcement: r.announcement, reason: r.reason }));

  return { stored, failed };
}

export async function checkForNewAnnouncements() {
  const response = {
    ok: false,
    message: "",
    newAnnouncements: [],
  };
  // Scrape announcements from source
  const { data, status_code } = await fetchAnnouncements();
  if (!data || status_code !== 200) {
    return {
      ...response,
      message: "Failed to fetch announcements from source.",
    };
  }
  // Compare with announcements in Firestore
  const existingAnnouncements = await getAnnouncementsFromDb();
  const newAnnouncementsCount = data.length - existingAnnouncements.length;
  if (newAnnouncementsCount <= 0) {
    return {
      ...response,
      message: "No new announcements found.",
    };
  }
  const newAnnouncements = data.slice(0, newAnnouncementsCount);
  const { stored, failed } = await storeNewAnnouncements(newAnnouncements);

  return {
    ok: true,
    message:
      failed.length > 0
        ? `Stored ${stored.length}, failed ${failed.length}.`
        : `Stored ${stored.length} new announcements.`,
    newAnnouncements,
  };
}
