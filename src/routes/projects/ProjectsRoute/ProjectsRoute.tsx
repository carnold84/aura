import LoadingScreen from "../../../components/LoadingScreen";
import Page from "../../../components/Page";
import ProjectCard from "../../../components/ProjectCard";
import CreateProjectDialog from "../../../containers/CreateProjectDialog";
import useProjects from "../../../hooks/useProjects";

const ProjectsRoute = () => {
  const { data, isError, isLoading } = useProjects({ sortBy: "createdAt" });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  if (!data) {
    return <p>We couldn't find this project.</p>;
  }

  if (data.length === 0) {
    return <p>You don't have any projects.</p>;
  }
  return (
    <Page>
      <Page.Header>
        <Page.Title>Projects</Page.Title>
        <CreateProjectDialog />
      </Page.Header>
      <Page.Content>
        {isLoading && <LoadingScreen />}
        {isError && <p>An error occurred.</p>}
        {!isLoading && !data && <p>We couldn't find this project.</p>}
        {data?.length === 0 && <p>You don't have any projects.</p>}
        {data && (
          <Page.Grid>
            {data?.map((project) => {
              return (
                <Page.GridItem key={project.id}>
                  <ProjectCard to={project.id} project={project} />
                </Page.GridItem>
              );
            })}
          </Page.Grid>
        )}
      </Page.Content>
    </Page>
  );
};

export default ProjectsRoute;
