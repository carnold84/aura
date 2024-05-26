import Page from "../../../components/Page";
import CreateProjectDialog from "../../../containers/CreateProjectDialog";
import ProjectsList from "./components/ProjectsList";

const ProjectsRoute = () => {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Projects</Page.Title>
        <CreateProjectDialog />
      </Page.Header>
      <Page.Content>
        <ProjectsList />
      </Page.Content>
    </Page>
  );
};

export default ProjectsRoute;
