import { Outlet, Link } from "react-router-dom";
import {
  StyledNavContainer,
  StyledNotificationsLogo,
  StyledBrainLogoImg,
} from "./Navbar.styles";
import BrainLogo from "../../assets/BrainLogo.jpg";

const Navbar = () => {
  return (
    <>
      <StyledNavContainer>
        <Link to="/">
          <StyledBrainLogoImg src={BrainLogo} alt="BRAIN logo" />
        </Link>

        <Link to="/notifications">
          <StyledNotificationsLogo />
        </Link>
      </StyledNavContainer>
      <Outlet />
    </>
  );
};
export default Navbar;
