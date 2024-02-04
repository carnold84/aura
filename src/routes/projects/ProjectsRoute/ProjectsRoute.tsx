import CreateProjectForm from "../../../containers/CreateProjectForm";
import ProjectsList from "./components/ProjectsList";

const ProjectsRoute = () => {
  return (
    <div>
      <h1>Projects</h1>
      <CreateProjectForm />
      <ProjectsList />
    </div>
  );
};

export default ProjectsRoute;
