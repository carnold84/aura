import Grid from "../../../../../components/Grid";
import ProjectCard from "../../../../../components/ProjectCard";
import useProjects from "../../../../../hooks/useProjects";

const ProjectsList = () => {
  const { data, isError, isLoading } = useProjects({ sortBy: "createdAt" });

  if (isLoading) {
    return <p>Loading...</p>;
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
    <Grid>
      {data?.map((project) => {
        return (
          <Grid.Item key={project.id}>
            <ProjectCard to={project.id} project={project} />
          </Grid.Item>
        );
      })}
    </Grid>
  );
};

export default ProjectsList;
