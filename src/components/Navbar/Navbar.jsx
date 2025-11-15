import { Outlet, Link } from "react-router-dom";
import {
  Layout,
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
    <Layout>
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
    </Layout>
  );
};
export default Navbar;
