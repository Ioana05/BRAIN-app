import { useState, useEffect } from "react";

function Article() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/js/articles.json"); // public/js/articles.json
        const data = await res.json();
        setArticles(data);
      } catch (e) {
        console.error("Error fetching articles:", e);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((a, idx) => (
          <li key={idx}>
            <a href={a.url}>{a.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Article;
