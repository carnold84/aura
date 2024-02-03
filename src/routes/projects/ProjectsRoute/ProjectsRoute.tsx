import ProjectsForm from "./components/ProjectsForm";
import ProjectsList from "./components/ProjectsList";

const ProjectsRoute = () => {
  return (
    <div>
      <h1>Projects</h1>
      <ProjectsForm />
      <ProjectsList />
    </div>
  );
};

export default ProjectsRoute;
