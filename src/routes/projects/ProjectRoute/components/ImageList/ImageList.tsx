import useImages from "../../../../../hooks/useImages";
import useLinkImageToProject from "../../../../../hooks/useLinkImageToProject";
import useUnlinkImageFromProject from "../../../../../hooks/useUnlinkImageFromProject";
import { ProjectWithImages } from "../../../../../types";

const ImageList = ({ project }: { project: ProjectWithImages }) => {
  const {
    data: images,
    isError: isImagesError,
    isLoading: isImagesLoading,
  } = useImages();
  const {
    linkImageToProject,
    isError: isLinkError,
    isLoading,
  } = useLinkImageToProject();
  const {
    isError: isUnlinkError,
    isLoading: isUnlinking,
    unlinkImagefromProject,
  } = useUnlinkImageFromProject();

  if (isImagesLoading) {
    return <p>Loading...</p>;
  }

  if (isLoading || isUnlinking) {
    return <p>Adding...</p>;
  }

  if (isImagesError || isLinkError || isUnlinkError) {
    return <p>An error occurred.</p>;
  }

  return (
    <div>
      <h1>Images</h1>
      <ul>
        {images?.map((image) => {
          const isAdded =
            project.images.findIndex(({ id }) => id === image.id) > -1;
          return (
            <li key={image.id}>
              <img src={image.url} width="100" />
              {image.name}
              {isAdded && (
                <button
                  onClick={() => unlinkImagefromProject({ image, project })}
                >
                  Remove
                </button>
              )}
              {!isAdded && (
                <button onClick={() => linkImageToProject({ image, project })}>
                  Add
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageList;
