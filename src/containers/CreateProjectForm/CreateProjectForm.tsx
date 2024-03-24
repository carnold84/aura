import useCreateProject from "../../hooks/useCreateProject";
import ProjectForm from "../ProjectForm";
import { ProjectFormValues } from "../ProjectForm/ProjectForm";

const CreateProjectForm = () => {
  const { createProject, isError, isLoading } = useCreateProject();
  const onSubmit = (data: ProjectFormValues) => {
    createProject(data);
  };

  if (isLoading) {
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
