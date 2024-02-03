import { SubmitHandler, useForm } from "react-hook-form";

import { CreateImage } from "../../../../../api/types";
import useCreateImage from "../../../../../hooks/useCreateImage";

const ImagesForm = () => {
  const { createImage, isError, isSaving } = useCreateImage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateImage>();
  const onSubmit: SubmitHandler<CreateImage> = (data: CreateImage) => {
    createImage(data);
  };

  if (isSaving) {
    return <p>Creating...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && <p>Could not create project</p>}
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          type="text"
          value={
            "https://cdn.dribbble.com/userupload/12464741/file/original-a2c0b32ef331ea9e2a0df25893c5a4d8.png?resize=1024x768"
          }
          {...register("url", { required: true })}
        />
        {errors.url && <span>This field is required</span>}
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default ImagesForm;
