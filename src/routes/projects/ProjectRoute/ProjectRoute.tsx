import { useParams } from "react-router-dom";

import ProjectView from "./components/ProjectView";

const ProjectRoute = () => {
  const { projectId } = useParams();

  if (!projectId) {
    return <p>Could not find project.</p>;
  }

  return <ProjectView projectId={projectId} />;
};

export default ProjectRoute;
