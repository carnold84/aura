import { useParams } from "react-router-dom";

import useProject from "../../hooks/useProject";

const Project = () => {
  return (
    <div>
      <h1>Project</h1>
      <ProjectView />
    </div>
  );
};

const ProjectView = () => {
  const { projectId } = useParams();
  const { data, isError, isLoading } = useProject(projectId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  if (!data) {
    return <p>Could not find project.</p>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
};

export default Project;
