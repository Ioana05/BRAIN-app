import { normalizeText } from "../../utils/helpers";
import {
  Card,
  CardTitle,
  CardImage,
  CardDescription,
  StyledVideo,
} from "./AnnouncementCard.styles";
import Button from "../Button/Button";

const AnnouncementCard = ({ article }) => {
  return (
    <Card>
      <CardTitle>{article.title}</CardTitle>

      {article.img && <CardImage src={article.img} alt={article.title} />}

      <CardDescription>{normalizeText(article.description)}</CardDescription>

      {article.pdfLink && (
        <Button
          text="Download PDF"
          onClick={() => window.open(article.pdfLink, "_blank")}
        />
      )}

      {article.videoLink && (
        <StyledVideo
          src={article.videoLink}
          title={article.title}
          $videoFormat={article.videoFormat}
          preload="auto"
          controls
        />
      )}
    </Card>
  );
};
export default AnnouncementCard;
