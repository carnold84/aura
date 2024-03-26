import useCreateProject from "../../hooks/useCreateProject";
import ProjectFormDialog, { ProjectFormValues } from "../ProjectFormDialog";

const CreateProjectDialog = () => {
  const { createProject, isError, isLoading } = useCreateProject();
  const onSubmit = (data: ProjectFormValues) => {
    createProject(data);
  };

  if (isLoading) {
    return <p>Creating...</p>;
  }

  return (
    <ProjectFormDialog
      errorMessage={
        isError ? "Sorry. We couldn't create your project. :(" : undefined
      }
      onSubmit={onSubmit}
    />
  );
};

export default CreateProjectDialog;
