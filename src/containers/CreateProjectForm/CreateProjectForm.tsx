import useCreateProject from "../../hooks/useCreateProject";
import ProjectForm from "../ProjectForm";
import { ProjectFormValues } from "../ProjectForm/ProjectForm";

const CreateProjectForm = () => {
  const { createProject, isError, isSaving } = useCreateProject();
  const onSubmit = (data: ProjectFormValues) => {
    createProject(data);
  };

  if (isSaving) {
    return <p>Creating...</p>;
  }

  return (
    <ProjectForm
      errorMessage={
        isError ? "Sorry. We couldn't create your project. :(" : undefined
      }
      onSubmit={onSubmit}
    />
  );
};

export default CreateProjectForm;
