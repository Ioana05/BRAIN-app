import {
  UnreadCard,
  ReadCard,
  Title,
  Message,
  Time,
  ButtonGroup,
  ActionButton,
  DismissButton,
  TooltipContainer,
  TooltipText,
} from "./NotificationCard.styles";

const NotificationCard = ({ title, message, time, isRead, onMarkAsRead }) => {
  const handleActionClick = () => {
    window.open("https://www.edusoft.ro/anunturi.html", "_blank");
    onMarkAsRead();
  };
  return isRead ? (
    <ReadCard>
      <div>
        <Time>{time}</Time>
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
        <Time>{time}</Time>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </div>
      <ButtonGroup>
        <TooltipContainer>
          <ActionButton onClick={handleActionClick} />
          <TooltipText>Opens in browser</TooltipText>
        </TooltipContainer>
        <DismissButton onClick={onMarkAsRead}>Dismiss</DismissButton>
      </ButtonGroup>
    </UnreadCard>
  );
};

export default NotificationCard;
