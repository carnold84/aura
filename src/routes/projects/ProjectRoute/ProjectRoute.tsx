import { useParams } from "react-router-dom";

import ImageCard from "../../../components/ImageCard";
import Page from "../../../components/Page";
import DeleteDialog from "../../../containers/DeleteDialog";
import UpdateProjectDialog from "../../../containers/UpdateProjectDialog";
import useBack from "../../../hooks/useBack";
import useDeleteProject from "../../../hooks/useDeleteProject";
import useProject from "../../../hooks/useProject";
import ImageListDialog from "./components/ImageListDialog";

const ProjectRoute = () => {
  const { projectId } = useParams();
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
              <DeleteDialog
                isDeleting={isDeleting}
                name={project.name}
                onDelete={() => deleteProject(project)}
              />
            </Page.HeaderControls>
          </>
        )}
      </Page.Header>
      <Page.Content isLoading={isLoading}>
        {isError && <p>An error occurred.</p>}
        {!isLoading && !project && <p>Could not find project.</p>}
        {project && (
          <Page.Grid>
            {project.images.map((image) => {
              return (
                <Page.GridItem key={image.id}>
                  <ImageCard image={image} to={`images/${image.id}`} />
                </Page.GridItem>
              );
            })}
          </Page.Grid>
        )}
      </Page.Content>
    </Page>
  );
};

export default ProjectRoute;
