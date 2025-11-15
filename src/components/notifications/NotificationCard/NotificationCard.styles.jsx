import styled from "styled-components";
import GoTo from "../../../assets/GoTo.svg?react";

const Card = styled.div`
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.4rem 0.2rem rgba(0, 0, 0, 0.1);
  padding: 1.6rem;
  margin-bottom: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UnreadCard = styled(Card)``;

export const ReadCard = styled(Card)`
  background-color: #f3f4f6; /* gray-100 */
  opacity: 0.6;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
`;

export const Message = styled.p`
  margin: 0;
`;

export const Time = styled.span`
  font-size: 0.875rem;
  color: #6b7280; /* gray-500 */
  margin-bottom: 0.5rem;
  display: block;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;
export const ActionButton = styled(GoTo)`
  width: 2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
export const DismissButton = styled.button`
  background-color: transparent;
  color: #6b7280;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    background-color: #f3f4f6;
  }
`;

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;
export const TooltipText = styled.span`
  visibility: hidden;
  width: 12rem;
  text-align: center;
  padding: 0.25rem 0.5rem;
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
`;
