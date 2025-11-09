import styled from "styled-components";
import NotificationsLogo from "../../assets/NotificationsLogo.svg?react";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const StyledNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #600;
  height: 5rem;
  padding: 0 1.5rem;
`;

export const StyledNotificationsLogo = styled(NotificationsLogo)`
  width: 2.2rem;
  fill: yellow;
`;

export const StyledBrainLogoImg = styled.img`
  height: 5rem;
`;

export const UnreadBadge = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateY(50%, 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  font-weight: bold;
`;
export const NotificationIconContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;
