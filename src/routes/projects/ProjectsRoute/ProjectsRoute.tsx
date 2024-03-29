import CreateProjectDialog from "../../../containers/CreateProjectDialog";
import ProjectsList from "./components/ProjectsList";

const ProjectsRoute = () => {
  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="font-display text-4xl font-medium uppercase text-neutral-700">
          Projects
        </h1>
        <CreateProjectDialog />
      </header>
      <ProjectsList />
    </div>
  );
};

export default ProjectsRoute;
