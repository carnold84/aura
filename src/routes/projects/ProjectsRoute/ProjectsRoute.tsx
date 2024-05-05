import CreateProjectDialog from "../../../containers/CreateProjectDialog";
import ProjectsList from "./components/ProjectsList";

const ProjectsRoute = () => {
  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-5xl font-light uppercase text-neutral-600">
          Projects
        </h1>
        <CreateProjectDialog />
      </header>
      <ProjectsList />
    </div>
  );
};

export default ProjectsRoute;
