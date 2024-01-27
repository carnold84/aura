import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { CreateProject } from "../../api/types";
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

const ProjectsForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateProject>();
  const onSubmit: SubmitHandler<CreateProject> = (data: CreateProject) => {
    createProject(data);
  };
  const { createProject, isError, isSaving } = useCreateProject();

  if (isSaving) {
    return <p>Creating...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && <p>Could not create project</p>}
      <div>
        <label htmlFor="name">Project Name</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: true })}
        />
        {errors["name"] ? <p>Name is required</p> : null}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input id="description" type="text" {...register("description")} />
      </div>
      <div>
        <label htmlFor="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" {...register("imageUrl")} />
      </div>
      <button type="submit">Create</button>
    </form>
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
