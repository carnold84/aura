import { Project } from "../../api/types";
import useUpdateProject from "../../hooks/useUpdateProject";
import ProjectForm from "../ProjectForm";
import { ProjectFormValues } from "../ProjectForm/ProjectForm";

interface UpdateProjectFormProps {
  project: Project;
}

const UpdateProjectForm = ({ project }: UpdateProjectFormProps) => {
  const { updateProject, isError, isUpdating } = useUpdateProject();
  const onSubmit = (data: ProjectFormValues) => {
    updateProject({ id: project.id, project: data });
  };

  if (isUpdating) {
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
