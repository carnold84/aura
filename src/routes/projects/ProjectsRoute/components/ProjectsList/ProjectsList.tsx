import { Link } from "react-router-dom";

import useProjects from "../../../../../hooks/useProjects";

const ProjectsList = () => {
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
      {data?.map(({ id, name }) => {
        return (
          <li key={id}>
            <Link to={id}>{name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectsList;
