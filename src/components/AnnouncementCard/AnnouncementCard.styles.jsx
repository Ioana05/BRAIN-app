import styled from "styled-components";

export const Card = styled.div`
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
    font-size: 1.6rem;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
  flex-shrink: 0;
  margin-bottom: 1.5rem;
`;

export const CardDescription = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  line-height: 1.6;
  flex: 1;
  text-overflow: ellipsis;
  margin-bottom: 1.5rem;
  text-align: justify;
  text-align-last: left;
  white-space: pre-line;
`;

export const CardVideo = styled.video`
  margin: 1.5rem 0;
  width: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
`;
