import useBack from "../../../../../hooks/useBack";
import useDeleteProject from "../../../../../hooks/useDeleteProject";
import useProject from "../../../../../hooks/useProject";
import ImageList from "../ImageList";

const ProjectView = ({ projectId }: { projectId: string }) => {
  const back = useBack("/projects");
  const { data: project, isError, isLoading } = useProject(projectId);
  const { deleteProject, isLoading: isDeleting } = useDeleteProject({
    onSuccess: () => {
      back();
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  if (!project) {
    return <p>Could not find project.</p>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      {isDeleting ? (
        <p>Deleting...</p>
      ) : (
        <button onClick={() => deleteProject(project)}>Delete</button>
      )}
      {/* <ul>
        {project.images.map(({ id, name, url }) => {
          return (
            <li key={id}>
              {name}
              <img src={url} width="100" />
            </li>
          );
        })}
      </ul> */}
      <ImageList project={project} />
    </div>
  );
};

export default ProjectView;
