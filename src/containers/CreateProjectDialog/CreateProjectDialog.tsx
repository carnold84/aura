import { Plus } from "iconoir-react";

import TextButton from "../../components/TextButton";
import useCreateProject from "../../hooks/useCreateProject";
import ProjectFormDialog, { ProjectFormValues } from "../ProjectFormDialog";

const CreateProjectDialog = () => {
  const { createProject, isError, isLoading, isSuccess, reset } =
    useCreateProject();
  const onSubmit = async (data: ProjectFormValues) => {
    await createProject(data);
  };

  return (
    <ProjectFormDialog
      errorMessage={
        isError ? "Sorry. We couldn't create your project. :(" : undefined
      }
      isLoading={isLoading}
      onOpenChange={(open) => {
        if (open === false) {
          reset();
        }
      }}
      onSubmit={onSubmit}
      submitBtnLabel="Create"
      successMessage={
        isSuccess ? "Project was successfully created." : undefined
      }
      title="Create Project"
    >
      <TextButton iconLeft={<Plus className="h-5 w-5" />}>Create</TextButton>
    </ProjectFormDialog>
  );
};

export default CreateProjectDialog;
