import styled from "styled-components";

export const Card = styled.div`
  padding: 3rem;
  text-align: center;
  border-radius: 1rem;
  max-width: 40rem;
  margin: 0 auto;
`;

export const BellImg = styled.img`
  height: 7rem;
  display: block;
  margin: 0 auto 1.5rem auto;
  opacity: 0.7;

  @media (min-width: 768px) {
    height: 9rem;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

export const Message = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.5;
`;
