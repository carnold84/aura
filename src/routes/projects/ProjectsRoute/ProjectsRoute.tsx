import Page from "../../../components/Page";
import ProjectCard from "../../../components/ProjectCard";
import CreateProjectDialog from "../../../containers/CreateProjectDialog";
import useProjects from "../../../hooks/useProjects";

const ProjectsRoute = () => {
  const { data, isError, isLoading } = useProjects({ sortBy: "createdAt" });

  return (
    <Page>
      <Page.Header>
        <Page.Title>Projects</Page.Title>
        <CreateProjectDialog />
      </Page.Header>
      <Page.Content isLoading={isLoading}>
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
