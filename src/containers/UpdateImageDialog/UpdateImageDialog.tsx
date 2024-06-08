import useUpdateImage from "../../hooks/useUpdateImage";
import { Image } from "../../types";
import ImageFormDialog, { ImageFormValues } from "../ImageFormDialog";

interface UpdateImageDialogProps {
  image: Image;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateImageDialog = ({
  image,
  isOpen,
  onOpenChange,
}: UpdateImageDialogProps) => {
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
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (open === false) {
          reset();
        }
        onOpenChange && onOpenChange(open);
      }}
      onSubmit={onSubmit}
      submitBtnLabel="Update"
      successMessage={
        isSuccess ? `${image.name} was successfully updated.` : undefined
      }
      title={`Update ${image.name}`}
    />
  );
};

export default UpdateImageDialog;
