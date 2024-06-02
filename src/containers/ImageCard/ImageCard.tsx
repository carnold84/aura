import Card from "../../components/Card";
import LoadingScreen from "../../components/LoadingScreen";
import TextButton from "../../components/TextButton";
import useLinkImageToProject from "../../hooks/useLinkImageToProject";
import useUnlinkImageFromProject from "../../hooks/useUnlinkImageFromProject";
import { Image, Project } from "../../types";

interface ImageCardProps {
  image: Image;
  project: Project;
}

const ImageCard = ({ image, project }: ImageCardProps) => {
  const {
    linkImageToProject,
    isError: isLinkError,
    isLoading: isLinking,
  } = useLinkImageToProject();
  const {
    isError: isUnlinkError,
    isLoading: isUnlinking,
    unlinkImagefromProject,
  } = useUnlinkImageFromProject();

  if (isLinking || isUnlinking) {
    return <LoadingScreen />;
  }

  if (isLinkError || isUnlinkError) {
    return <p>An error occurred.</p>;
  }
  const isLinked = project.images.findIndex(({ id }) => id === image.id) > -1;

  return (
    <Card>
      <Card.Img src={image.url} />
      <Card.Content>
        <Card.Title>{project.name}</Card.Title>
        <Card.Actions>
          {!isLinked && (
            <TextButton
              onClick={() =>
                linkImageToProject({
                  imageId: image.id,
                  projectId: project.id,
                })
              }
            >
              Add
            </TextButton>
          )}
          {isLinked && (
            <TextButton
              onClick={() =>
                unlinkImagefromProject({
                  imageId: image.id,
                  projectId: project.id,
                })
              }
            >
              Remove
            </TextButton>
          )}
        </Card.Actions>
      </Card.Content>
    </Card>
  );
};

export default ImageCard;
