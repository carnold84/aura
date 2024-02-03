import { useParams } from "react-router-dom";

import { Image, Project } from "../../../api/types";
import useBack from "../../../hooks/useBack";
import useDeleteImage from "../../../hooks/useDeleteImage";
import useImage from "../../../hooks/useImage";
import useLinkImageToProject from "../../../hooks/useLinkImageToProject";
import useProjects from "../../../hooks/useProjects";

const ImageView = ({ image }: { image: Image }) => {
  return (
    <div>
      <h1>{image.name}</h1>
      <img src={image.url} />
    </div>
  );
};

const LinkProjectList = ({ image }: { image: Image }) => {
  const { data, isError, isLoading } = useProjects();
  const { linkImageToProject, isSaving } = useLinkImageToProject();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  if (data?.length === 0) {
    return <p>You don't have any projects.</p>;
  }

  return (
    <ul>
      {data?.map((project: Project) => {
        return (
          <li key={project.id}>
            {project.name}
            {isSaving ? (
              <p>Linking...</p>
            ) : (
              <button onClick={() => linkImageToProject({ image, project })}>
                Add
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const ImageRoute = () => {
  const { imageId } = useParams();
  const back = useBack("/images");
  const { data: image, isError, isLoading } = useImage(imageId);
  const { deleteImage, isDeleting } = useDeleteImage({
    onSuccess: () => {
      back();
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  if (!image) {
    return <p>Could not find image.</p>;
  }

  return (
    <div>
      <h1>Image</h1>
      {isDeleting ? (
        <p>Deleting...</p>
      ) : (
        <button onClick={() => deleteImage(image)}>Delete</button>
      )}
      <LinkProjectList image={image} />
      <ImageView image={image} />
    </div>
  );
};

export default ImageRoute;
