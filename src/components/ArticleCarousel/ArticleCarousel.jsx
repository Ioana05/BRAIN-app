import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../../utils/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { DismissButton } from "../notifications/NotificationCard/NotificationCard.styles";
import {
  CarouselContainer,
  StyledCarousel,
  StyledCarouselItem,
  CarouselSlideContainer,
  CardWrapper,
  CustomCard,
  CardTitle,
  CardImage,
  CardDescription,
  StyledVideo,
  PaginationIndicator,
} from "./ArticleCarousel.styles";
import { normalizeText } from "../../utils/helpers";

const ArticleCarousel = () => {
  const [articles, setArticles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    const q = query(collection(db, "announcements"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setArticles(data);
      console.log("Realtime articles:", data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <CarouselContainer>
      <StyledCarousel
        interval={null}
        activeIndex={activeIndex}
        onSelect={handleSelect}
      >
        {articles.map((article, index) => (
          <StyledCarouselItem key={index}>
            <CarouselSlideContainer>
              <CardWrapper>
                <CustomCard>
                  <CardTitle>{article.title}</CardTitle>

                  {article.img && (
                    <CardImage src={article.img} alt={article.title} />
                  )}
                  <CardDescription>
                    {normalizeText(article.description)}
                  </CardDescription>
                  {article.pdfLink && (
                    <DismissButton
                      onClick={() => window.open(article.pdfLink, "_blank")}
                    >
                      Download PDF
                    </DismissButton>
                  )}
                  {article.videoLink && (
                    <StyledVideo
                      src={article.videoLink}
                      title={article.title}
                      $videoFormat={article.videoFormat}
                      preload="auto"
                      controls
                    />
                  )}

                  <PaginationIndicator>
                    {activeIndex + 1} / {articles.length}
                  </PaginationIndicator>
                </CustomCard>
              </CardWrapper>
            </CarouselSlideContainer>
          </StyledCarouselItem>
        ))}
      </StyledCarousel>
    </CarouselContainer>
  );
};

export default ArticleCarousel;
