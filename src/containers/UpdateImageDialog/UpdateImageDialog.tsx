import PrimaryButton from "../../components/PrimaryButton";
import useUpdateImage from "../../hooks/useUpdateImage";
import { Image } from "../../types";
import ImageFormDialog, { ImageFormValues } from "../ImageFormDialog";

interface UpdateImageDialogProps {
  image: Image;
}

const UpdateImageDialog = ({ image }: UpdateImageDialogProps) => {
  const { updateImage, isError, isLoading, isSuccess, reset } =
    useUpdateImage();
  const onSubmit = async (data: ImageFormValues) => {
    await updateImage({ ...data, id: image.id });
  };

  const { description, name, url } = image;

  return (
    <ImageFormDialog
      defaultValues={{ description, name, url }}
      errorMessage={
        isError ? "Sorry. We couldn't update your image. :(" : undefined
      }
      isLoading={isLoading}
      onOpenChange={(open) => {
        if (open === false) {
          reset();
        }
      }}
      onSubmit={onSubmit}
      submitBtnLabel="Update"
      successMessage={
        isSuccess ? `${image.name} was successfully updated.` : undefined
      }
      title={`Update ${image.name}`}
    >
      <PrimaryButton>Edit</PrimaryButton>
    </ImageFormDialog>
  );
};

export default UpdateImageDialog;
