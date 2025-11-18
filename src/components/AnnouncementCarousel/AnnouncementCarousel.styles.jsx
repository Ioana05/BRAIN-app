import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";

export const CarouselContainer = styled.div`
  overflow: hidden;
`;

export const StyledCarousel = styled(Carousel)`
  height: calc(100vh - 5rem);

  .carousel-inner,
  .carousel-item {
    height: 100%;
  }

  .carousel-item img {
    object-fit: cover;
  }

  .carousel-control-next-icon,
  .carousel-control-prev-icon {
    filter: invert(1);
  }

  .carousel-control-next {
    right: -1rem;
  }

  .carousel-control-prev {
    left: -1rem;
  }
`;

export const StyledCarouselItem = styled(Carousel.Item)`
  height: 100%;
`;

export const CarouselSlideContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40rem;
  width: 100%;
  line-height: 1.6;
  font-size: 1.8rem;
`;

export const PaginationIndicator = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 500;
  z-index: 10;
`;
