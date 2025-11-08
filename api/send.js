import { checkForNewAnnouncements, sendNotification } from "../lib/firebase.js";

export default async function handler(req, res) {
  if (req.headers.authorization !== "Bearer github-action") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const { ok, newAnnouncements, message } = await checkForNewAnnouncements();
    if (!ok || newAnnouncements.length === 0) {
      res.status(200).json({ message });
      return;
    }

    const newCount = newAnnouncements.length;
    const title =
      newCount === 1
        ? newAnnouncements[0].title
        : `${newCount} new announcements`;

    const body =
      newCount === 1
        ? newAnnouncements[0].description.slice(0, 100) + "..."
        : newAnnouncements
            .slice(0, 3)
            .map((a) => a.title)
            .join(", ") + (newCount > 3 ? ", ..." : "");

    const result = await sendNotification(title, body);
    res.status(200).json({ result, message });
  } catch (err) {
    console.error("Send notification error:", err);
    res
      .status(500)
      .json({ error: "Failed to send notification: " + err.message });
  }
}
