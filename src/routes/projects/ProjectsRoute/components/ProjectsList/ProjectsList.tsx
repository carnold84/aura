import { useState } from "react";
import { Link } from "react-router-dom";

import UpdateProjectDialog from "../../../../../containers/UpdateProjectDialog";
import useProjects from "../../../../../hooks/useProjects";

const ProjectsList = () => {
  const { data, isError, isLoading } = useProjects({ sortBy: "createdAt" });
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  const selectedProject = data.find(({ id }) => id === selectedId) || null;

  return (
    <>
      <ul>
        {data?.map(({ id, name }) => {
          return (
            <li key={id}>
              <Link to={id}>{name}</Link>
              <button onClick={() => setSelectedId(id)}>Edit</button>
            </li>
          );
        })}
      </ul>
      {selectedProject && (
        <div>
          <h3>Edit {selectedProject.name}</h3>
          <UpdateProjectDialog project={selectedProject} />
        </div>
      )}
    </>
  );
};

export default ProjectsList;
