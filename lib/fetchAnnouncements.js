/*Code to scrape announcements from a text file hosted on a website.

Conventions used in the text file established by our client:
Announcements are separated by the '#' character.
Each announcement starts with a title line, followed by optional image line (starting with $),
optional ids line (starting with %), and then description lines.

The ids line can contain either article_id or article_id/galley_id.
The article_id can end with 'v' or 'h' indicating it has a video and its format (vertically or horizontally).
If no ids line is present, we assume there are no pdf or video links.
The description can span multiple lines until the next announcement or end of file.
*/
import { ANNOUNCEMENTS_URL, PDF_BASE_URL, VIDEO_BASE_URL } from "./config.js";

export default async function fetchAnnouncements() {
  const response = await fetch(ANNOUNCEMENTS_URL);

  if (!response.ok) {
    return { data: [], status_code: response.status };
  }
  const text = await response.text();
  const announcements = text.split("#");

  const data = [];

  for (const announcement of announcements) {
    const lines = announcement.trim().split("\n");
    if (lines.length < 2) continue;

    const title = lines[0].trim();
    lines.splice(0, 1); // remove title line

    let img = null;
    let articleId = null;
    let galleyId = null;
    let pdfLink = null;
    let videoLink = null;
    let description = "";
    let videoFormat = null;

    if (lines[0].startsWith("$")) {
      img = lines[0].substring(1).trim(); // remove '$'
      lines.splice(0, 1); // remove img line
    }
    if (lines[0].startsWith("%")) {
      [articleId, galleyId] = getIds(lines[0]);
      lines.splice(0, 1); // remove ids line
    }
    description = lines.join("\n").trim();
    if (articleId) {
      videoFormat =
        articleId.at(-1) === "v" || articleId.at(-1) === "h"
          ? articleId.at(-1)
          : null;
      if (videoFormat) {
        articleId = articleId.slice(0, -1);
      }

      pdfLink = galleyId ? `${PDF_BASE_URL}/${articleId}/${galleyId}` : null;
      videoLink = videoFormat
        ? `${VIDEO_BASE_URL}/${articleId}${videoFormat === "v" ? "v" : ""}.mp4`
        : null;
    }

    data.push({
      title,
      img,
      articleId,
      galleyId,
      pdfLink,
      videoLink,
      videoFormat,
      description,
    });
  }
  return { data, status_code: response.status };
}

function getIds(line) {
  const parts = line.substring(1).trim().split("/"); // remove '%'
  if (parts.length == 1) {
    return [parts[0], null];
  }
  return parts;
}
