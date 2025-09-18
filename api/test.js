import { sendNotification } from "../lib/firebase.js";

export default async function handler(req, res) {
  try {
    const result = await sendNotification(
      "Test Notification",
      "This is a test from Vercel!"
    );
    res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("Test notification error:", err);
    res.status(500).json({ error: "Test failed" });
  }
}
