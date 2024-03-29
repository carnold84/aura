import Button from "../../components/Button";
import useCreateProject from "../../hooks/useCreateProject";
import ProjectFormDialog, { ProjectFormValues } from "../ProjectFormDialog";

const CreateProjectDialog = () => {
  const { createProject, isError, isLoading } = useCreateProject();
  const onSubmit = (data: ProjectFormValues) => {
    createProject(data);
  };

  return (
    <ProjectFormDialog
      errorMessage={
        isError ? "Sorry. We couldn't create your project. :(" : undefined
      }
      isLoading={isLoading}
      onSubmit={onSubmit}
      submitBtnLabel="Create"
      title="Create Project"
    >
      <Button variant="contained">Create</Button>
    </ProjectFormDialog>
  );
};

export default CreateProjectDialog;
