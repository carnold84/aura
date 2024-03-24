import { SubmitHandler, useForm } from "react-hook-form";

import { Image } from "../../types";

export type ImageFormValues = Omit<
  Image,
  "createdAt" | "id" | "projects" | "srcUrl" | "updatedAt" | "userId"
>;

interface ImageFormProps {
  defaultValues?: ImageFormValues;
  errorMessage?: string;
  onSubmit: (data: ImageFormValues) => void;
}

const ImageForm = ({
  defaultValues,
  errorMessage,
  onSubmit: onSubmitProp,
}: ImageFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({ defaultValues });
  const onSubmit: SubmitHandler<ImageFormValues> = (data: ImageFormValues) => {
    onSubmitProp(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <label htmlFor="name">Image Name</label>
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
        <label htmlFor="url">Url</label>
        <input id="url" type="text" {...register("url", { required: true })} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default ImageForm;
