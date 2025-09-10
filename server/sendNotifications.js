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

// --- 2. Function to get all tokens ---
async function getAllTokens() {
  try {
    const snapshot = await db.collection("deviceTokens").get();
    if (snapshot.empty) {
      console.log("No tokens found in database.");
      return [];
    }

    const tokens = [];
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.token) {
        tokens.push(data.token);
      }
    });

    console.log(`Found ${tokens.length} tokens in database`);
    return tokens;
  } catch (error) {
    console.error("Error getting tokens:", error);
    return [];
  }
}

// --- 3. Function to send notifications ---
async function sendNotification(title, body) {
  const tokens = await getAllTokens();

  if (tokens.length === 0) {
    console.log("No tokens to send notifications to.");
    return;
  }

  console.log(`Attempting to send notifications to ${tokens.length} devices`);

  // FIXED: Use both 'notification' and 'data' for better compatibility
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: {
      title: title,
      body: body,
      timestamp: Date.now().toString(),
    },
    // Add web push config for PWAs
    webpush: {
      notification: {
        title: title,
        body: body,
        icon: "/icon-192x192.png", // Make sure you have this icon
        badge: "/badge-72x72.png", // Optional badge icon
        requireInteraction: true,
        actions: [
          {
            action: "open",
            title: "Open App",
          },
        ],
      },
    },
    tokens: tokens,
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(
      `Notifications sent. Success: ${response.successCount}, Failures: ${response.failureCount}`
    );

    // Log detailed responses for debugging
    response.responses.forEach((res, idx) => {
      if (!res.success) {
        console.error(`Failed to send to token ${idx}:`, res.error);
      } else {
        console.log(`Successfully sent to token ${idx}`);
      }
    });

    // FIXED: Clean up invalid tokens (correct collection name)
    const invalidTokens = [];
    response.responses.forEach((res, idx) => {
      if (!res.success) {
        const error = res.error;
        // Check for specific error codes that indicate invalid tokens
        if (
          error.code === "messaging/invalid-registration-token" ||
          error.code === "messaging/registration-token-not-registered"
        ) {
          invalidTokens.push(tokens[idx]);
        }
      }
    });

    // Delete invalid tokens from the correct collection
    if (invalidTokens.length > 0) {
      console.log(`Deleting ${invalidTokens.length} invalid tokens`);
      const deletePromises = invalidTokens.map(async (token) => {
        try {
          // Query to find documents with this token
          const querySnapshot = await db
            .collection("deviceTokens")
            .where("token", "==", token)
            .get();

          const deletePromises = querySnapshot.docs.map((doc) =>
            doc.ref.delete()
          );
          await Promise.all(deletePromises);
          console.log(`Deleted invalid token: ${token}`);
        } catch (error) {
          console.error(`Error deleting token ${token}:`, error);
        }
      });

      await Promise.all(deletePromises);
    }

    return {
      success: response.successCount,
      failures: response.failureCount,
      invalidTokens: invalidTokens.length,
    };
  } catch (err) {
    console.error("Error sending notifications:", err);
    throw err;
  }
}

// --- 4. Enhanced test function ---
async function testNotification() {
  try {
    console.log("Starting notification test...");
    const result = await sendNotification(
      "Test Notification",
      "This is a test notification from your PWA!"
    );
    console.log("Notification test completed:", result);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// --- 5. Periodic notification scheduler ---
function startPeriodicNotifications(intervalMinutes = 60) {
  console.log(
    `Starting periodic notifications every ${intervalMinutes} minutes`
  );

  const interval = intervalMinutes * 60 * 1000; // Convert to milliseconds

  // Send initial notification
  testNotification();

  // Set up periodic notifications
  setInterval(async () => {
    try {
      const now = new Date();
      await sendNotification(
        "Periodic Update",
        `Notification sent at ${now.toLocaleTimeString()}`
      );
    } catch (error) {
      console.error("Periodic notification failed:", error);
    }
  }, interval);
}

// --- 6. Export functions for use in other modules ---
export {
  sendNotification,
  getAllTokens,
  testNotification,
  startPeriodicNotifications,
};

testNotification();
