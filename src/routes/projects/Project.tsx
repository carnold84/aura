import { useNavigate, useParams } from "react-router-dom";

import useProject from "../../hooks/useProject";
import { Project } from "../../api/types";
import useDeleteProject from "../../hooks/useDeleteProject";

const Project = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: project, isError, isLoading } = useProject(projectId);
  const { deleteProject, isDeleting } = useDeleteProject({
    onSuccess: () => {
      navigate(-1)
    }
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

const ProjectView = ({project}: {project: Project}) => {
  return (
    <div>
      <h1>{project.name}</h1>
    </div>
  );
};

export default Project;
