import useLinkImageToProject from "../../../../../hooks/useLinkImageToProject";
import { ImageWithProjects, ProjectWithImages } from "../../../../../types";

const LinkProjectListItem = ({
  image,
  project,
}: {
  image: ImageWithProjects;
  project: ProjectWithImages;
}) => {
  const { linkImageToProject, isLinking } = useLinkImageToProject();
  const isAdded = image.projects.find(({ id }) => id === project.id);

  if (isLinking) {
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
        <button onClick={() => linkImageToProject({ image, project })}>
          Remove
        </button>
      ) : (
        <button onClick={() => linkImageToProject({ image, project })}>
          Add
        </button>
      )}
    </li>
  );
};

export default LinkProjectListItem;
