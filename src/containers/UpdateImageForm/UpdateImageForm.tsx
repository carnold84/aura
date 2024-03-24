import useUpdateImage from "../../hooks/useUpdateImage";
import { Image } from "../../types";
import ImageForm, { ImageFormValues } from "../ImageForm/ImageForm";

interface UpdateImageFormProps {
  image: Image;
}

const UpdateImageForm = ({ image }: UpdateImageFormProps) => {
  const { updateImage, isError, isLoading } = useUpdateImage();
  const onSubmit = (data: ImageFormValues) => {
    updateImage({ ...data, id: image.id });
  };

  if (isLoading) {
    return <p>Updating...</p>;
  }

  const { description, name, url } = image;

  return (
    <ImageForm
      defaultValues={{ description, name, url }}
      errorMessage={
        isError ? "Sorry. We couldn't update your image. :(" : undefined
      }
      onSubmit={onSubmit}
    />
  );
};

export default UpdateImageForm;
