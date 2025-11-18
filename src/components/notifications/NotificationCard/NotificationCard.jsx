import {
  UnreadCard,
  ReadCard,
  Title,
  Message,
  Time,
  ButtonGroup,
  ActionButton,
  TooltipContainer,
  TooltipText,
} from "./NotificationCard.styles";
import { useNavigate } from "react-router-dom";
import { parseData } from "../../../utils/helpers";
import Button from "../../Button/Button.jsx";

const NotificationCard = ({ title, message, time, isRead, onMarkAsRead }) => {
  const navigate = useNavigate();

  const handleActionClick = () => {
    navigate("/");
    onMarkAsRead();
  };

  const date = parseData(time);
  return isRead ? (
    <ReadCard>
      <div>
        <Time>{date}</Time>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </div>
      <ButtonGroup>
        <ActionButton onClick={handleActionClick} />
      </ButtonGroup>
    </ReadCard>
  ) : (
    <UnreadCard>
      <div>
        <Time>{date}</Time>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </div>
      <ButtonGroup>
        <TooltipContainer>
          <ActionButton onClick={handleActionClick} />
          <TooltipText>Go to content</TooltipText>
        </TooltipContainer>
        <Button onClick={onMarkAsRead} text="Dismiss" />
      </ButtonGroup>
    </UnreadCard>
  );
};

export default NotificationCard;
