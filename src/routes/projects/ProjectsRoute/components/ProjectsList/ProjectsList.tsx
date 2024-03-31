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
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data?.map((project) => {
        return (
          <li key={project.id}>
            <ProjectCard to={project.id} project={project} />
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectsList;
