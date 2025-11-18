import { StyledButton } from "./Button.styles.jsx";

const Button = ({ text, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {text}
    </StyledButton>
  );
};

export default Button;
