import { Link } from "react-router-dom";

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
    <>
      <ul className="flex flex-col gap-3">
        {data?.map((project) => {
          const { id, name } = project;
          return (
            <li className="flex gap-3" key={id}>
              <Link to={id}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ProjectsList;
