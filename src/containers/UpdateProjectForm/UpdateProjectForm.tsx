import useUpdateProject from "../../hooks/useUpdateProject";
import { Project } from "../../types";
import ProjectForm from "../ProjectForm";
import { ProjectFormValues } from "../ProjectForm/ProjectForm";

interface UpdateProjectFormProps {
  project: Project;
}

const UpdateProjectForm = ({ project }: UpdateProjectFormProps) => {
  const { updateProject, isError, isLoading } = useUpdateProject();
  const onSubmit = (data: ProjectFormValues) => {
    updateProject({ ...data, id: project.id });
  };

  if (isLoading) {
    return <p>Updating...</p>;
  }

  const { description, name, imageUrl } = project;

  return (
    <ProjectForm
      defaultValues={{ description, name, imageUrl }}
      errorMessage={
        isError ? "Sorry. We couldn't update your project. :(" : undefined
      }
      onSubmit={onSubmit}
    />
  );
};

export default UpdateProjectForm;
