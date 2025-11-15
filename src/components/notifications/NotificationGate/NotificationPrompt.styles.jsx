import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  padding: 1rem;
`;

export const Modal = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  max-width: 24rem;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const Text = styled.p`
  margin-bottom: 1.5rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const EnableButton = styled.button`
  background-color: #2563eb; /* blue-600 */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8; /* darker blue on hover */
  }
`;

export const CloseButton = styled.button`
  background-color: #e5e7eb; /* gray-200 */
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #d1d5db; /* darker gray on hover */
  }
`;
