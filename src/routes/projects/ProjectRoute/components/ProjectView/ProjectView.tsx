import AlertDialog from "../../../../../components/AlertDialog";
import Page from "../../../../../components/Page";
import Spinner from "../../../../../components/Spinner";
import TextButton from "../../../../../components/TextButton";
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
          <AlertDialog>
            <AlertDialog.Trigger>
              <TextButton className="min-w-14" disabled={isDeleting}>
                {isDeleting ? <Spinner size={20} /> : "Delete"}
              </TextButton>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Body>
                <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                <AlertDialog.Description>
                  This action cannot be undone. {project.name} will be
                  permanently deleted.
                </AlertDialog.Description>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action onClick={() => deleteProject(project)}>
                  Yes, delete project
                </AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
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
