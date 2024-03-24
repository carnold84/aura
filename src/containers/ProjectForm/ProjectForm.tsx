import { SubmitHandler, useForm } from "react-hook-form";

import { Project } from "../../types";

export type ProjectFormValues = Omit<
  Project,
  "createdAt" | "id" | "images" | "updatedAt" | "userId"
>;

interface ProjectFormProps {
  defaultValues?: ProjectFormValues;
  errorMessage?: string;
  onSubmit: (data: ProjectFormValues) => void;
}

const ProjectForm = ({
  defaultValues,
  errorMessage,
  onSubmit: onSubmitProp,
}: ProjectFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({ defaultValues });
  const onSubmit: SubmitHandler<ProjectFormValues> = (
    data: ProjectFormValues,
  ) => {
    onSubmitProp(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && <p>{errorMessage}</p>}
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

export default ProjectForm;
