import styled from "styled-components";
import NotificationsLogo from "../../assets/NotificationsLogo.svg?react";

export const StyledNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #600;
  height: 5rem;
  padding: 0 1.5rem;
`;

export const StyledNotificationsLogo = styled(NotificationsLogo)`
  width: 2rem;
  fill: yellow;
`;

export const StyledBrainLogoImg = styled.img`
  height: 5rem;
`;
