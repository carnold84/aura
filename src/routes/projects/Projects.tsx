import { Link } from "react-router-dom";

import AutoForm from "../../components/AutoForm";
import { AutoFormSchema } from "../../components/AutoForm/AutoForm";
import useCreateProject from "../../hooks/useCreateProject";
import useProjects from "../../hooks/useProjects";

const Projects = () => {
  return (
    <div>
      <h1>Projects</h1>
      <ProjectsForm />
      <ProjectsList />
    </div>
  );
};

const projectsFormSchema: AutoFormSchema = {
  fields: [
    {
      label: "Project Name",
      name: "name",
      required: "Project Name is required",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "text",
    },
  ],
};

const ProjectsForm = () => {
  const { createProject, isError, isSaving } = useCreateProject();

  if (isSaving) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  return (
    <AutoForm
      onSubmit={(data) => {
        console.log(data);
        createProject(data);
      }}
      schema={projectsFormSchema}
    />
  );
};

const ProjectsList = () => {
  const { data, isError, isLoading } = useProjects();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  if (data?.length === 0) {
    return <p>You don't have any projects.</p>;
  }

  return (
    <ul>
      {data?.map(({ id, name }) => {
        return (
          <li key={id}>
            <Link to={id}>{name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Projects;
