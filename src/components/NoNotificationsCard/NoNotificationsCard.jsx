import NoNotificationsYet from "../../assets/NoNotificationsYet.png";
import { Card, BellImg, Title, Message } from "./NoNotificationsCard.styles";
const NoNotificationsCard = () => {
  return (
    <Card>
      <BellImg src={NoNotificationsYet} alt="No Notifications Yet" />
      <Title>No Notifications Yet</Title>
      <Message>
        Come back later! We will notify you when the latest research gets
        published in the journal.
      </Message>
    </Card>
  );
};

export default NoNotificationsCard;
