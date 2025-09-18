import {
  Overlay,
  Modal,
  Title,
  Text,
  ButtonGroup,
  EnableButton,
  CloseButton,
} from "./NotificationPrompt.styles.jsx";
const NotificationPrompt = ({ onEnable, onClose }) => {
  return (
    <Overlay>
      <Modal>
        <Title>Enable Notifications</Title>
        <Text>
          Enable notifications to get updates when new content is published.
        </Text>
        <ButtonGroup>
          <EnableButton onClick={onEnable}>Enable</EnableButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
};

export default NotificationPrompt;
