"""
Code to scrape announcements from a text file hosted on a website.

Conventions used in the text file established by our client:
Announcements are separated by the '#' character.
Each announcement starts with a title line, followed by optional image line (starting with $),
optional ids line (starting with %), and then description lines.

The ids line can contain either article_id or article_id/galley_id.
The article_id can end with 'v' or 'h' indicating it has a video and its format (vertically or horizontally).
If no ids line is present, we assume there are no pdf or video links.
The description can span multiple lines until the next announcement or end of file.
"""
import requests
from typing import Optional

url = "https://www.edusoft.ro/anunturi_.txt"
response = requests.get(url)

def get_ids(line) -> tuple[str, Optional[str]]: # article_id, galley_id (we can have a video but not a pdf so we need the article_id alone)
    if line.startswith("%"):
        parts = line[1:].split("/")
        if len(parts) == 1:
            return parts[0], None
        if len(parts) == 2:
            return parts[0], parts[1]
    return None, None

data = []
if response.status_code == 200:
    content = response.text
    anounces = content.split("#") # each announce starts with #
    for announce in anounces:
        lines = announce.strip().split("\n")
        if len(lines) < 2: # must have at least title and one more line for content
            continue
        title = lines[0].strip()
        img = lines[1].strip()[1:] if lines[1].strip().startswith("$") else None # img must be on second line if exists
        if not img: # if no img, check if next line is optional ids
            if not lines[1].strip().startswith("%"): # no img, no ids => we only have content
                pdf_link, video_link = None, None
                description = "\n".join(lines[1:]).strip()
            else: # we have optional ids on second line
                article_id, galley_id = get_ids(lines[1].strip())
        else: # when we have img, check if next line is optional ids
           article_id, galley_id = get_ids(lines[2].strip())
       
        if not article_id:
            video_link, pdf_link = None, None
            description = "\n".join(lines[2:]).strip()

        if article_id:
            pdf_link = f"https://brain.edusoft.ro/index.php/brain/article/download/{article_id}/{galley_id}" if article_id and galley_id else None
            video_format = article_id[-1] if article_id[-1] == "v" or article_id[-1] == "h" else None
            video_link = f"https://www.edusoft.ro/brain/videos/{article_id}{'v' if video_format == 'v' else ''}.mp4" if video_format else None
            description = "\n".join(lines[3:]).strip() if img else "\n".join(lines[2:]).strip()


        data.append({
            "title": title,
            "img": img,
            "pdf_link": pdf_link,
            "video_link": video_link,
            "description": description
        })
    for item in data:
        print(item)

else:
    print("Failed to fetch:", response.status_code)
