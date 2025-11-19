import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../../utils/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import {
  CarouselContainer,
  StyledCarousel,
  StyledCarouselItem,
  CarouselSlideContainer,
  CardWrapper,
  PaginationIndicator,
} from "./AnnouncementCarousel.styles";
import AnnouncementCard from "../AnnouncementCard/AnnouncementCard";

const AnnouncementCarousel = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    const q = query(collection(db, "announcements"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setArticles(data);
      setLoading(false);
      console.log("Realtime articles:", data);
    });

    return () => unsubscribe();
  }, []);

  const slides = loading ? [null] : articles;

  return (
    <CarouselContainer>
      <StyledCarousel
        interval={null}
        activeIndex={activeIndex}
        onSelect={handleSelect}
      >
        {slides.map((article, index) => (
          <StyledCarouselItem key={index}>
            <CarouselSlideContainer>
              <CardWrapper>
                <AnnouncementCard article={article} />

                {!loading && (
                  <PaginationIndicator>
                    {activeIndex + 1} / {articles.length}
                  </PaginationIndicator>
                )}
              </CardWrapper>
            </CarouselSlideContainer>
          </StyledCarouselItem>
        ))}
      </StyledCarousel>
    </CarouselContainer>
  );
};

export default AnnouncementCarousel;
