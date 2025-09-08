from bs4 import BeautifulSoup
from urllib.request import urlopen
import json

url = "https://www.edusoft.ro/anunturi.html"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")
strSoup = str(soup)
articles = strSoup.split("<h1>")
shouldUpdate = articles[0]
articles = articles[1:]
titles = [article.split("</h1>")[0] for article in articles]
content = [article.split("</h1>")[1].strip("\n") for article in articles]
print(titles)
print(content)

page = []
for article in range(len(articles)):
    page.append({"title": titles[article], "content": content[article]})


json_str = json.dumps(page, indent = 4)
with open("../public/articles.json", "w") as f:
    f.write(json_str)

