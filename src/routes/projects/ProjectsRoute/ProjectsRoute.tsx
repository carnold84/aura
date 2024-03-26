import CreateProjectDialog from "../../../containers/CreateProjectDialog";
import ProjectsList from "./components/ProjectsList";

const ProjectsRoute = () => {
  return (
    <div>
      <header className="flex justify-between">
        <h1>Projects</h1>
        <CreateProjectDialog />
      </header>
      <ProjectsList />
    </div>
  );
};

export default ProjectsRoute;
