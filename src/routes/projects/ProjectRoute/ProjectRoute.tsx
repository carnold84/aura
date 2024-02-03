import { useParams } from "react-router-dom";

import { ProjectWithImages } from "../../../api/types";
import useBack from "../../../hooks/useBack";
import useDeleteProject from "../../../hooks/useDeleteProject";
import useProject from "../../../hooks/useProject";

const ProjectView = ({ project }: { project: ProjectWithImages }) => {
  return (
    <div>
      <h1>{project.name}</h1>
      <ul>
        {project.images.map(({ id, name, url }) => {
          return (
            <li key={id}>
              {name}
              <img src={url} width="100" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ProjectRoute = () => {
  const { projectId } = useParams();
  const back = useBack("/projects");
  const { data: project, isError, isLoading } = useProject(projectId);
  const { deleteProject, isDeleting } = useDeleteProject({
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

  if (!project) {
    return <p>Could not find project.</p>;
  }

  return (
    <div>
      <h1>Project</h1>
      {isDeleting ? (
        <p>Deleting...</p>
      ) : (
        <button onClick={() => deleteProject(project)}>Delete</button>
      )}
      <ProjectView project={project} />
    </div>
  );
};

export default ProjectRoute;
