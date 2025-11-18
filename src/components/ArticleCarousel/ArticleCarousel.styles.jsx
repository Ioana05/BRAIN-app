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

export const CustomCard = styled.div`
  overflow-y: auto;
  height: 80vh;
  width: 40vw;
  border-radius: 1rem;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.3);
  padding: 3.5rem;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 768px) {
    height: 75vh;
  }

  @media (max-width: 768px) {
    width: 95%;
    max-height: 80vh;
    padding: 1.5rem;
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.3;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    max-height: 35vh;
  }
`;

export const CardDescription = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  line-height: 1.6;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1.5rem;
  text-align: justify;
  text-align-last: left;
  white-space: pre-line;
`;

export const StyledVideo = styled.video`
  margin: 1.5rem 0;
  width: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
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
