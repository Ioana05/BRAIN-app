import { checkForNewAnnouncements, sendNotification } from "../lib/firebase.js";

export default async function handler(req, res) {
  try {
    const { ok, newAnnouncementsCount, newAnnouncements } =
      await checkForNewAnnouncements();

    if (!ok) {
      res.status(200).json({ ok: false, message: "No new announcements" });
      return;
    }
    const title =
      newAnnouncementsCount === 1
        ? newAnnouncements[0].title
        : `${newAnnouncementsCount} new announcements`;

    const body =
      newAnnouncementsCount === 1
        ? newAnnouncements[0].description.slice(0, 100) + "..."
        : newAnnouncements
            .slice(0, 3)
            .map((a) => a.title)
            .join(", ") + (newAnnouncementsCount > 3 ? ", ..." : "");

    const result = await sendNotification(title, body);
    res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("Send notification error:", err);
    res
      .status(500)
      .json({ error: "Failed to send notification: " + err.message });
  }
}
