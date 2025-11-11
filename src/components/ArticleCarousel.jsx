import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/carousel.css";
import { db } from "../utils/firebase"; // adjust path if needed
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const ArticleCarousel = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(
          collection(db, "announcements"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setArticles(data);
      } catch (e) {
        console.error("Error fetching articles:", e);
      }
    };

    fetchArticles();
  }, []);

  console.log(articles);
  return (
    <div className="carousel-container">
      <Carousel interval={null}>
        {articles.map((article, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-caption">
              <div className="article-content">
                <div className="card-wrapper">
                  <div className="custom-card">
                    <h3 className="card-title">{article.title}</h3>
                    {/* <img
                      className="card-image"
                      src={
                        article.image ||
                        `https://picsum.photos/600/300?random=${index}`
                      }
                      alt={article.title}
                    /> */}
                    <div className="card-content">
                      {article.img && (
                        <img
                          src={article.img}
                          alt={article.title}
                          className="w-full rounded-xl mb-4"
                        />
                      )}
                      <p className="card-description">
                        {article.sections
                          ? article.sections
                              .find((s) => s.type === "text")
                              ?.content?.substring(0, 200) + "..." ||
                            article.content
                          : article.content?.substring(0, 200) + "..." ||
                            "Citește mai mult..."}
                      </p>
                      <div> Download PDF</div>
                      {article.video && (
                        <div className="aspect-video mb-4">
                          <iframe
                            src={article.video}
                            title={article.title}
                            className="w-full h-full rounded-xl"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
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
