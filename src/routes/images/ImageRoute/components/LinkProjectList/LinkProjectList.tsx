import useProjects from "../../../../../hooks/useProjects";
import { Image, Project } from "../../../../../types";
import LinkProjectListItem from "../LinkProjectListItem";

const LinkProjectList = ({ image }: { image: Image }) => {
  const { data, isError, isLoading } = useProjects();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  if (data?.length === 0) {
    return <p>You don't have any projects.</p>;
  }

  return (
    <ul>
      {data?.map((project: Project) => {
        return <LinkProjectListItem image={image} project={project} />;
      })}
    </ul>
  );
};

export default LinkProjectList;
