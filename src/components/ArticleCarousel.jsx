import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/carousel.css";

const ArticleCarousel = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/js/articles.json");
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
      <Carousel>
        {articles.map((article, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block"
              src={
                article.image || "https://picsum.photos/800/400?random=" + index
              }
              alt={article.title}
            />
            <Carousel.Caption>
              <div className="article-content">
                <h3 className="article-title">{article.title}</h3>

                {/* Render article content with support for inserted images */}
                {article.sections ? (
                  article.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      {section.type === "text" && (
                        <p className="article-text">{section.content}</p>
                      )}
                      {section.type === "image" && (
                        <div className="image-container">
                          <img
                            src={section.src}
                            alt={section.alt || "Article image"}
                            className="inserted-image"
                          />
                          {section.caption && (
                            <p className="image-caption">{section.caption}</p>
                          )}
                        </div>
                      )}
                      {section.type === "subtitle" && (
                        <h4 className="article-subtitle">{section.content}</h4>
                      )}
                    </div>
                  ))
                ) : (
                  // Fallback for simple content structure
                  <div>
                    <p className="article-text">{article.content}</p>
                    {article.insertedImage && (
                      <div className="image-container">
                        <img
                          src={article.insertedImage}
                          alt="Article illustration"
                          className="inserted-image"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ArticleCarousel;
