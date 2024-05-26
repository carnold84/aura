import Button from "../../components/Button";
import useUpdateProject from "../../hooks/useUpdateProject";
import { Project } from "../../types";
import ProjectFormDialog, { ProjectFormValues } from "../ProjectFormDialog";

interface UpdateProjectDialogProps {
  project: Project;
}

const UpdateProjectDialog = ({ project }: UpdateProjectDialogProps) => {
  const { updateProject, isError, isLoading, isSuccess, reset } =
    useUpdateProject();
  const onSubmit = async (data: ProjectFormValues) => {
    await updateProject({ ...data, id: project.id });
  };

  const { description, name, imageUrl } = project;

  return (
    <ProjectFormDialog
      defaultValues={{ description, name, imageUrl }}
      errorMessage={
        isError ? "Sorry. We couldn't update your project. :(" : undefined
      }
      isLoading={isLoading}
      onOpenChange={(open) => {
        if (open === false) {
          reset();
        }
      }}
      onSubmit={onSubmit}
      submitBtnLabel="Update"
      successMessage={
        isSuccess ? `${project.name} was successfully updated.` : undefined
      }
      title={`Update ${project.name}`}
    >
      <Button variant="outlined">Edit</Button>
    </ProjectFormDialog>
  );
};

export default UpdateProjectDialog;
