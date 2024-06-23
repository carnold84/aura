import { NavArrowDown } from "iconoir-react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import DropdownMenu from "../../../components/DropdownMenu";
import ImageCard from "../../../components/ImageCard";
import Page from "../../../components/Page";
import PrimaryButton from "../../../components/PrimaryButton";
import TextButton from "../../../components/TextButton";
import DeleteDialog from "../../../containers/DeleteDialog";
import UpdateProjectDialog from "../../../containers/UpdateProjectDialog";
import useBack from "../../../hooks/useBack";
import useDeleteProject from "../../../hooks/useDeleteProject";
import useProject from "../../../hooks/useProject";

const ProjectRoute = () => {
  const { projectId } = useParams();
  const [, setSearchParams] = useSearchParams();
  const back = useBack("/projects");
  const { data: project, isError, isLoading } = useProject({ id: projectId });
  const { deleteProject } = useDeleteProject({
    onSuccess: () => {
      back();
    },
  });
  const [openModal, setOpenModal] = useState<
    "addImages" | "delete" | "edit" | null
  >(null);

  return (
    <Page>
      <Page.Header>
        <Page.Title>{project?.name}</Page.Title>
        {project && (
          <>
            <Page.HeaderControls className="flex gap-3">
              <DropdownMenu>
                <DropdownMenu.Trigger>
                  <TextButton iconLeft={<NavArrowDown className="h-5 w-5" />}>
                    Menu
                  </TextButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                  <DropdownMenu.Item
                    onClick={() =>
                      setSearchParams({
                        modal: "add-images",
                        projectId: project.id,
                      })
                    }
                  >
                    Add images to {project.name}
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setOpenModal("edit")}>
                    Edit {project.name}
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setOpenModal("delete")}>
                    Delete {project.name}
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </Page.HeaderControls>
          </>
        )}
      </Page.Header>
      <Page.Content isLoading={isLoading}>
        {isError && <p>An error occurred.</p>}
        {!isLoading && !project && <p>Could not find project.</p>}
        {project && (
          <>
            {project.images.length === 0 && (
              <Page.EmptyMessage
                description="Why not add some?"
                title="There are no images in this project."
              >
                <PrimaryButton
                  onClick={() =>
                    setSearchParams({
                      modal: "add-images",
                      projectId: project.id,
                    })
                  }
                >
                  Add images
                </PrimaryButton>
              </Page.EmptyMessage>
            )}
            {project.images.length > 0 && (
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
          </>
        )}
      </Page.Content>
      {project && (
        <>
          <UpdateProjectDialog
            isOpen={openModal === "edit"}
            onOpenChange={() => {
              setOpenModal(null);
            }}
            project={project}
          />
          <DeleteDialog
            isOpen={openModal === "delete"}
            onOpenChange={() => setOpenModal(null)}
            name={project.name}
            onDelete={async () => {
              await deleteProject(project);
            }}
          />
        </>
      )}
    </Page>
  );
};

export default ProjectRoute;
