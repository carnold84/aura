import { SubmitHandler, useForm } from "react-hook-form";

import { CreateProject } from "../../../../../api/types";
import useCreateProject from "../../../../../hooks/useCreateProject";

const ProjectsForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateProject>();
  const onSubmit: SubmitHandler<CreateProject> = (data: CreateProject) => {
    createProject(data);
  };
  const { createProject, isError, isSaving } = useCreateProject({
    onSuccess: () => reset(),
  });

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

export default ProjectsForm;
