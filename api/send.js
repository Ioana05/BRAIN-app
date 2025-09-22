import { checkForNewAnnouncements, sendNotification } from "../lib/firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let { title, body } = req.body || {};

  try {
    const { ok, newAnnouncementsCount, newAnnouncements, failed } =
      await checkForNewAnnouncements();
    if (!title && !body && !ok) {
      // only return error if no custom title/body provided
      return res.status(400).json({ error: failed });
    }

    if (!title) {
      // prioritize custom title if provided (so we can test with current endpoint)
      title =
        newAnnouncementsCount === 1
          ? newAnnouncements[0].title
          : `${newAnnouncementsCount} new announcements`;
    }
    if (!body) {
      // same for body
      body =
        newAnnouncementsCount === 1
          ? newAnnouncements[0].description.slice(0, 100) + "..."
          : newAnnouncements
              .slice(0, 3)
              .map((a) => a.title)
              .join(", ") + (newAnnouncementsCount > 3 ? ", ..." : "");
    }

    const result = await sendNotification(title, body);
    res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("Send notification error:", err);
    res.status(500).json({ error: "Failed to send notification" });
  }
}
