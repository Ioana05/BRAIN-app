import { normalizeText } from "../../utils/helpers";
import {
  Card,
  CardTitle,
  CardImage,
  CardDescription,
  CardVideo,
} from "./AnnouncementCard.styles";
import Button from "../Button/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const AnnouncementCard = ({ article }) => {
  return (
    <Card>
      {!article ? (
        <LoadingSpinner />
      ) : (
        <>
          <CardTitle>{article.title}</CardTitle>

          {article.img && <CardImage src={article.img} alt={article.title} />}

          <CardDescription>
            {normalizeText(article.description)}
          </CardDescription>

          {article.pdfLink && (
            <Button
              text="Download PDF"
              onClick={() => window.open(article.pdfLink, "_blank")}
            />
          )}

          {article.videoLink && (
            <CardVideo
              src={`${article.videoLink}#t=0.5`}
              $videoFormat={article.videoFormat}
              preload="auto"
              controls
            />
          )}
        </>
      )}
    </Card>
  );
};
export default AnnouncementCard;
