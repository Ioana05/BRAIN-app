import styled from "styled-components";

export const NotificationsContainer = styled.div`
  padding: 1rem 2rem;
  flex: 1;
  ${(props) =>
    props.$centered &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;
