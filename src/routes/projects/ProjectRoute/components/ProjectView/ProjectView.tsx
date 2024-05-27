import Button from "../../../../../components/Button";
import Page from "../../../../../components/Page";
import Spinner from "../../../../../components/Spinner";
import UpdateProjectDialog from "../../../../../containers/UpdateProjectDialog";
import useBack from "../../../../../hooks/useBack";
import useDeleteProject from "../../../../../hooks/useDeleteProject";
import useProject from "../../../../../hooks/useProject";
import ImageList from "../ImageList";

const ProjectView = ({ projectId }: { projectId: string }) => {
  const back = useBack("/projects");
  const { data: project, isError, isLoading } = useProject({ id: projectId });
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
    <Page>
      <Page.Header>
        <Page.Title>{project.name}</Page.Title>
        <Page.HeaderControls className="flex gap-3">
          <UpdateProjectDialog project={project}></UpdateProjectDialog>
          <Button
            className="min-w-16"
            disabled={isDeleting}
            onClick={() => deleteProject(project)}
          >
            {isDeleting ? <Spinner size={20} /> : "Delete"}
          </Button>
        </Page.HeaderControls>
      </Page.Header>
      <Page.Content>
        <ul>
          {project.images.map(({ id, name, url }) => {
            return (
              <li key={id}>
                {name}
                <img src={url} width="100" />
              </li>
            );
          })}
        </ul>
      </Page.Content>
      <ImageList project={project} />
    </Page>
  );
};

export default ProjectView;
