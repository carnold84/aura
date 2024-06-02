import AlertDialog from "../../../../../components/AlertDialog";
import Card from "../../../../../components/Card";
import Grid from "../../../../../components/Grid";
import LoadingScreen from "../../../../../components/LoadingScreen";
import Page from "../../../../../components/Page";
import Spinner from "../../../../../components/Spinner";
import TextButton from "../../../../../components/TextButton";
import UpdateProjectDialog from "../../../../../containers/UpdateProjectDialog";
import useBack from "../../../../../hooks/useBack";
import useDeleteProject from "../../../../../hooks/useDeleteProject";
import useProject from "../../../../../hooks/useProject";
import ImageListDialog from "../ImageListDialog";

const ProjectView = ({ projectId }: { projectId: string }) => {
  const back = useBack("/projects");
  const { data: project, isError, isLoading } = useProject({ id: projectId });
  const { deleteProject, isLoading: isDeleting } = useDeleteProject({
    onSuccess: () => {
      back();
    },
  });

  return (
    <Page>
      <Page.Header>
        <Page.Title>{project?.name}</Page.Title>
        {project && (
          <>
            <Page.HeaderControls className="flex gap-3">
              <ImageListDialog project={project} />
              <UpdateProjectDialog project={project}></UpdateProjectDialog>
              <AlertDialog>
                <AlertDialog.Trigger>
                  <TextButton className="min-w-14" disabled={isDeleting}>
                    {isDeleting ? <Spinner size={20} /> : "Delete"}
                  </TextButton>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                  <AlertDialog.Body>
                    <AlertDialog.Title>
                      Are you absolutely sure?
                    </AlertDialog.Title>
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
          </>
        )}
      </Page.Header>
      <Page.Content>
        {isError && <p>An error occurred.</p>}
        {!isLoading && !project && <p>Could not find project.</p>}
        {isLoading && <LoadingScreen />}
        {project && (
          <Grid>
            {project.images.map(({ id, name, url }) => {
              return (
                <Grid.Item key={id}>
                  <Card>
                    <Card.Img src={url} />
                    <Card.Content>
                      <Card.Title>{name}</Card.Title>
                    </Card.Content>
                  </Card>
                </Grid.Item>
              );
            })}
          </Grid>
        )}
      </Page.Content>
    </Page>
  );
};

export default ProjectView;
