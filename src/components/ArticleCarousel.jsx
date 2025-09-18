import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/carousel.css";

const ArticleCarousel = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/articles.json");
        const data = await res.json();
        setArticles(data);
      } catch (e) {
        console.error("Error fetching articles:", e);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="carousel-container">
      <Carousel interval={null}>
        {articles.map((article, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-caption">
              <div className="article-content">
                <div className="card-wrapper">
                  <div className="custom-card">
                    <img
                      className="card-image"
                      src={
                        article.image ||
                        `https://picsum.photos/600/300?random=${index}`
                      }
                      alt={article.title}
                    />
                    <div className="card-content">
                      <h3 className="card-title">{article.title}</h3>
                      <p className="card-description">
                        {article.sections
                          ? article.sections
                              .find((s) => s.type === "text")
                              ?.content?.substring(0, 200) + "..." ||
                            article.content
                          : article.content?.substring(0, 200) + "..." ||
                            "Citește mai mult..."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ArticleCarousel;
