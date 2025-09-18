import { sendNotification } from "../lib/firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, body } = req.body || {};
  if (!title || !body) {
    return res.status(400).json({ error: "Missing title or body" });
  }

  try {
    const result = await sendNotification(title, body);
    res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("Send notification error:", err);
    res.status(500).json({ error: "Failed to send notification" });
  }
}
