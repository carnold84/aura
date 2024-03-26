import useUpdateProject from "../../hooks/useUpdateProject";
import { Project } from "../../types";
import ProjectFormDialog, { ProjectFormValues } from "../ProjectFormDialog";

interface UpdateProjectDialogProps {
  project: Project;
}

const UpdateProjectDialog = ({ project }: UpdateProjectDialogProps) => {
  const { updateProject, isError, isLoading } = useUpdateProject();
  const onSubmit = (data: ProjectFormValues) => {
    updateProject({ ...data, id: project.id });
  };

  if (isLoading) {
    return <p>Updating...</p>;
  }

  const { description, name, imageUrl } = project;

  return (
    <ProjectFormDialog
      defaultValues={{ description, name, imageUrl }}
      errorMessage={
        isError ? "Sorry. We couldn't update your project. :(" : undefined
      }
      onSubmit={onSubmit}
    />
  );
};

export default UpdateProjectDialog;
