import { useEffect, useState } from "react";

import Snackbar from "../../components/Snackbar";
import useUpdateProject from "../../hooks/useUpdateProject";
import { Project } from "../../types";
import FormDialog from "../FormDialog";

export type FormValues = Omit<
  Project,
  "createdAt" | "id" | "images" | "updatedAt" | "userId"
>;

interface UpdateProjectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

const UpdateProjectDialog = ({
  isOpen,
  onOpenChange,
  project,
}: UpdateProjectDialogProps) => {
  const { updateProject, isError, isLoading, isSuccess, reset } =
    useUpdateProject();
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>();
  const onSubmit = async (data: FormValues) => {
    await updateProject({ ...data, id: project.id });
  };

  useEffect(() => {
    if (isSuccess) {
      setSnackbarMessage(`${project?.name} was successfully updated.`);
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange, project?.name]);

  const { description, name, imageUrl } = project;

  return (
    <>
      <FormDialog
        defaultValues={{ description, name, imageUrl }}
        errorMessage={
          isError ? "Sorry. We couldn't update your project. :(" : undefined
        }
        fields={[
          {
            label: "Project Name",
            name: "name",
            type: "text",
            required: true,
          },
          {
            label: "Description",
            name: "description",
            type: "text",
          },
          {
            label: "Image Url",
            name: "imageUrl",
            type: "text",
          },
        ]}
        isLoading={isLoading}
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (open === false) {
            reset();
          }
          onOpenChange && onOpenChange(open);
        }}
        onSubmit={onSubmit}
        submitBtnLabel="Update"
        title={`Update ${project.name}`}
      />
      <Snackbar
        alertType={"success"}
        onOpenChange={() => setSnackbarMessage(null)}
        open={!!snackbarMessage}
        title={snackbarMessage ?? ""}
      />
    </>
  );
};

export default UpdateProjectDialog;
