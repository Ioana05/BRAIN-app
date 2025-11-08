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

  const parseData = (string) => {
    const date = new Date(string);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // lunile încep de la 0
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    const formatted = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formatted;
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
          <TooltipText>Opens in browser</TooltipText>
        </TooltipContainer>
        <DismissButton onClick={onMarkAsRead}>Dismiss</DismissButton>
      </ButtonGroup>
    </UnreadCard>
  );
};

export default NotificationCard;
