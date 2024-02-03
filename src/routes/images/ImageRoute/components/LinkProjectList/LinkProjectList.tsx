import { Image, Project } from "../../../../../api/types";
import useLinkImageToProject from "../../../../../hooks/useLinkImageToProject";
import useProjects from "../../../../../hooks/useProjects";

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

export default LinkProjectList;
