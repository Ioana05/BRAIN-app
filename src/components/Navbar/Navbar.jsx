import { Outlet, Link } from "react-router-dom";
import {
  StyledNavContainer,
  StyledNotificationsLogo,
  StyledBrainLogoImg,
  UnreadBadge,
  NotificationIconContainer,
} from "./Navbar.styles";
import BrainLogo from "../../assets/BrainLogo.jpg";
import { useNotifications } from "../../contexts/notifications.context";
const Navbar = () => {
  const { unreadCount } = useNotifications();

  return (
    <>
      <StyledNavContainer>
        <Link to="/">
          <StyledBrainLogoImg src={BrainLogo} alt="BRAIN logo" />
        </Link>

        <Link to="/notifications">
          <NotificationIconContainer>
            {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
            <StyledNotificationsLogo />
          </NotificationIconContainer>
        </Link>
      </StyledNavContainer>
      <Outlet />
    </>
  );
};
export default Navbar;
