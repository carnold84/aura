import Button from "../../components/Button";
import useCreateImage from "../../hooks/useCreateImage";
import ImageFormDialog, { ImageFormValues } from "../ImageFormDialog";

const CreateImageDialog = () => {
  const { createImage, isError, isLoading, isSuccess, reset } =
    useCreateImage();
  const onSubmit = async (data: ImageFormValues) => {
    await createImage(data);
  };

  return (
    <ImageFormDialog
      errorMessage={
        isError ? "Sorry. We couldn't create your image. :(" : undefined
      }
      isLoading={isLoading}
      onOpenChange={(open) => {
        if (open === false) {
          reset();
        }
      }}
      onSubmit={onSubmit}
      submitBtnLabel="Create"
      successMessage={isSuccess ? "Image was successfully created." : undefined}
      title="Create Image"
    >
      <Button variant="contained">Create</Button>
    </ImageFormDialog>
  );
};

export default CreateImageDialog;
