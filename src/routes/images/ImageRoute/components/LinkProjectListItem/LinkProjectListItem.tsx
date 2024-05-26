import useLinkImageToProject from "../../../../../hooks/useLinkImageToProject";
import useUnlinkImageFromProject from "../../../../../hooks/useUnlinkImageFromProject";
import { Image, Project } from "../../../../../types";

const LinkProjectListItem = ({
  image,
  project,
}: {
  image: Image;
  project: Project;
}) => {
  const { linkImageToProject, isLoading } = useLinkImageToProject();
  const { isLoading: isUnlinking, unlinkImagefromProject } =
    useUnlinkImageFromProject();
  const isAdded = image.projects.find(({ id }) => id === project.id);

  if (isLoading || isUnlinking) {
    if (isAdded) {
      return <p>Removing...</p>;
    } else {
      return <p>Adding...</p>;
    }
  }

  return (
    <li key={project.id}>
      {project.name}
      {isAdded ? (
        <button
          onClick={() =>
            unlinkImagefromProject({ imageId: image.id, projectId: project.id })
          }
        >
          Remove
        </button>
      ) : (
        <button
          onClick={() =>
            linkImageToProject({ imageId: image.id, projectId: project.id })
          }
        >
          Add
        </button>
      )}
    </li>
  );
};

export default LinkProjectListItem;
