import useCreateImage from "../../hooks/useCreateImage";
import ImageForm, { ImageFormValues } from "../ImageForm/ImageForm";

const CreateImageForm = () => {
  const { createImage, isError, isLoading } = useCreateImage();
  const onSubmit = (data: ImageFormValues) => {
    createImage(data);
  };

  if (isLoading) {
    return <p>Creating...</p>;
  }

  return (
    <ImageForm
      defaultValues={{
        description: "",
        name: "",
        url: "https://cdn.dribbble.com/userupload/12464741/file/original-a2c0b32ef331ea9e2a0df25893c5a4d8.png?resize=1024x768",
      }}
      errorMessage={
        isError ? "Sorry. We couldn't create your image. :(" : undefined
      }
      onSubmit={onSubmit}
    />
  );
};

export default CreateImageForm;
